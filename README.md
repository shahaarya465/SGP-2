# 🌍 Simulation of Future Land Use Patterns Using Deep Learning on Satellite Imagery

This repository contains the implementation of **AIML305 - Project II (SGP-2)**.  
The project focuses on **predicting and simulating future land use patterns** using **Sentinel-1 (SAR)** and **Sentinel-2 (Optical)** satellite imagery with deep learning models.  

---

## 📌 Project Overview
Satellite imagery is a powerful tool for monitoring environmental change, urban growth, agriculture, and deforestation.  
This project aims to **simulate future land use patterns** by learning transformations from **radar (Sentinel-1)** to **optical (Sentinel-2)** imagery, and evaluating generated results using image similarity metrics.

Key objectives:
- Translate **Sentinel-1 radar images → Sentinel-2 optical images**.  
- Evaluate generated images with **PSNR, SSIM, FID, and LPIPS**.  
- Provide insights into how land use patterns can evolve over time.  

---

## 📂 Dataset
- **Source**: [Sentinel-1/2 Image Pairs Dataset (Kaggle)](https://www.kaggle.com/datasets/requiemonk/sentinel12-image-pairs-segregated-by-terrain)  
- Contains paired **Sentinel-1 (SAR)** and **Sentinel-2 (Optical)** images.  
- Images are categorized by terrain type for structured training and evaluation.  

---

## ⚙️ Requirements
Install dependencies before running the notebook:

```bash
pip install torch torchvision torchmetrics scikit-learn matplotlib pillow tqdm kagglehub
```

---

## 🚀 How to Run

Clone this repository:

```bash
git clone https://github.com/your-username/SGP-2.git
cd SGP-2
```

Open the notebook:

```bash
jupyter notebook SGP_2.ipynb
```

Run all cells sequentially:

- Dataset download
- Preprocessing and DataLoader setup
- Model definition and training
- Evaluation and visualization

---

## 📊 Evaluation Metrics

Generated images are compared with ground-truth Sentinel-2 images using:

- **PSNR (Peak Signal-to-Noise Ratio)** – Measures image clarity.
- **SSIM (Structural Similarity Index)** – Measures structural similarity.
- **FID (Fréchet Inception Distance)** – Measures distribution similarity.
- **LPIPS (Learned Perceptual Image Patch Similarity)** – Measures perceptual similarity.

---

## 📷 Results

Visualization of Sentinel-1 input → Generated Sentinel-2 output → Ground Truth Sentinel-2.

Metric results reported for different terrains.

*(Add example plots and metric tables here once experiments are completed.)*

---

## 👥 Contributors

- Aarya Shah (23AIML064)
- Vansh Mehta (23AIML074)