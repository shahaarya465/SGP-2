from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import torch
from torchvision import transforms
from PIL import Image
import io
import base64
import numpy as np

# --- Import your Generator class from models.py ---
from models import Generator

# --- 1. Load Your Pre-trained Model ---
generator = Generator()
generator.load_state_dict(torch.load("generator.pth", map_location="cpu"))
generator.eval()


# --- 2. Initialize FastAPI App ---
app = FastAPI()

# --- 3. Add CORS Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 4. Define Image Transformations ---
transform_model = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
])

transform_ndvi = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
])


# --- HELPER FUNCTIONS ---

def tensor_to_base64(tensor):
    """Converts a PyTorch tensor to a Base64 encoded string."""
    tensor = (tensor * 0.5) + 0.5
    # The .clamp(0, 1) is added for safety to ensure values are in the valid range.
    image = transforms.ToPILImage()(tensor.squeeze(0).clamp(0, 1))
    
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return img_str

def calculate_ndvi(image_tensor):
    """Calculates the average NDVI from an image tensor."""
    
    # Check if the image is RGB (3 channels)
    if image_tensor.shape[0] != 3:
        # Cannot calculate color-based NDVI on grayscale, return a default value
        return 0.0

    red = image_tensor[0, :, :].clamp(min=1e-6)
    green = image_tensor[1, :, :].clamp(min=1e-6)
    blue = image_tensor[2, :, :].clamp(min=1e-6)
    
    numerator = green - red
    denominator = green + red - blue
    
    denominator[denominator == 0] = 1e-6
    
    ndvi = numerator / denominator
    
    return ndvi.clamp(-1, 1).mean().item()


# --- 5. UPDATED Prediction Endpoint ---
@app.post("/predict")
async def predict(past_image: UploadFile = File(...), recent_image: UploadFile = File(...)):
    # Read the uploaded image bytes
    past_image_bytes = await past_image.read()
    recent_image_bytes = await recent_image.read()

    # --- a. Process Images ---
    past_img_pil = Image.open(io.BytesIO(past_image_bytes)).convert("RGB")
    recent_img_pil = Image.open(io.BytesIO(recent_image_bytes)).convert("RGB")

    # Apply transformations for the model to BOTH images
    past_tensor_model = transform_model(past_img_pil).unsqueeze(0)
    recent_tensor_model = transform_model(recent_img_pil).unsqueeze(0)


    # --- b. Get Prediction from your Model for BOTH images ---
    with torch.no_grad():
        generated_past_tensor = generator(past_tensor_model)
        generated_recent_tensor = generator(recent_tensor_model)

    
    # --- c. Calculate Real NDVI ---
    # Calculate NDVI from both NEWLY GENERATED tensors
    ndvi_past = calculate_ndvi(generated_past_tensor.squeeze(0))
    ndvi_recent = calculate_ndvi(generated_recent_tensor.squeeze(0))
    
    deforestation_change = ndvi_past - ndvi_recent

    # --- d. Determine Deforestation Status ---
    status = "No significant change."
    if deforestation_change > 0.2:
        status = "Significant Deforestation Detected"
    elif deforestation_change > 0.05:
        status = "Moderate Deforestation Detected"
        
    # --- e. Encode Images for Frontend ---
    generated_past_base64 = tensor_to_base64(generated_past_tensor)
    generated_recent_base64 = tensor_to_base64(generated_recent_tensor)


    # --- f. Return the REAL results ---
    return {
        "ndvi_past": ndvi_past,
        "ndvi_recent": ndvi_recent,
        "deforestation_change": deforestation_change,
        "status": status,
        "generated_past": generated_past_base64,
        "generated_recent": generated_recent_base64,
    }