# 🛰️ Deforestation Detection using Satellite Image Translation

This repository contains the implementation of **AIML305 - Project II (SGP-2)**. The project is a full-stack web application that uses a deep learning model to translate Sentinel-1 (SAR) radar imagery into Sentinel-2 optical imagery to detect and analyze deforestation over time.

---

## 🌟 Features

- **SAR to Optical Translation**: Utilizes a Generative Adversarial Network (GAN) to convert radar satellite images into clear, optical-style images.
- **Interactive Web Interface**: A user-friendly frontend built with React to upload "past" and "recent" satellite images.
- **Deforestation Analysis**: Calculates the change in a vegetation index (NDVI approximation) between two time periods to quantify vegetation loss.
- **Dynamic Results**: Displays the generated optical images, NDVI values, and a final deforestation status ("Significant," "Moderate," or "No change").
- **Full-Stack Architecture**: A robust Python backend powered by FastAPI serves the PyTorch model, and a modern frontend built with Vite and React provides the user interface.

---

## 🏛️ Project Architecture

The application is composed of three main components:

1.  **Frontend**: A responsive web dashboard built with **React** and styled with **Tailwind CSS**. It allows users to upload two images, send them to the backend for processing, and displays the returned analysis in a clear, organized format.
2.  **Backend**: A powerful API built with **FastAPI** (Python). It handles image processing, loads the pretrained PyTorch model, performs the image-to-image translation, calculates vegetation changes, and serves the results to the frontend.
3.  **Machine Learning Model**: A **Pix2Pix GAN** trained in the `SGP_2.ipynb` notebook. This model is the core of the application, responsible for translating the input radar imagery into optical imagery.

---

## 🚀 How to Run the Full Application

To get the web application running locally, you need to start both the backend server and the frontend development server.

### **1. Clone the Repository**

```bash
git clone https://github.com/shahaarya465/SGP-2.git
cd SGP-2
```

### **2. Set Up and Run the Backend**

The backend serves the machine learning model.

```bash
# Navigate to the backend directory
cd backend

# Create and activate a Python virtual environment
python -m venv venv
# On Windows: venv\Scripts\activate
# On macOS/Linux: source venv/bin/activate

# Install the required Python libraries
pip install -r requirements.txt

# IMPORTANT: Download the pretrained 'generator.pth' model from the Releases page
# and place it inside this 'backend' folder.

# Run the FastAPI server
uvicorn main:app --reload --port 8000
```
Your backend is now running at `http://12.0.0.1:8000`.

### **3. Set Up and Run the Frontend**

Open a **new terminal** for this step.

```bash
# Navigate to the frontend directory from the root folder
cd frontend

# Install the required npm packages
npm install

# Run the React development server
npm run dev
```
Your frontend is now running, typically at `http://localhost:5173`. Open this URL in your browser to use the application.

---

## 📂 Dataset

- **Source**: [Sentinel-1/2 Image Pairs Dataset (Kaggle)](https://www.kaggle.com/datasets/requiemonk/sentinel12-image-pairs-segregated-by-terrain)
- Contains paired **Sentinel-1 (SAR)** and **Sentinel-2 (Optical)** images used to train the GAN model.

---

## 📦 Pretrained Models

We provide pretrained models for inference. Download them from the [Releases](https://github.com/shahaarya465/SGP-2/releases).

- **`generator.pth`**: The trained Generator network, required for the backend to run.
- **`discriminator.pth`**: The trained Discriminator network, used during the model's training phase.

---

## 📊 Evaluation Metrics

The original model's performance was evaluated by comparing generated images with ground-truth Sentinel-2 images using:

-   **PSNR** (Peak Signal-to-Noise Ratio)
-   **SSIM** (Structural Similarity Index)
-   **FID** (Fréchet Inception Distance)
-   **LPIPS** (Learned Perceptual Image Patch Similarity)

---

## 👥 Contributors

-   Aarya Shah (23AIML064)
-   Vansh Mehta (23AIML074)
