#!/usr/bin/env python3
"""
🧙‍♂️ Défi #20 : Is iT yOu hARrY?
CNN pour la reconnaissance de personnages Harry Potter

Workshop Poudlard RP 2025 - Maison Géminiard 🦅
Points : 30 pts
"""

import os
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from PIL import Image
import cv2
from tqdm import tqdm

# TensorFlow & Keras
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score

# Configuration
IMG_SIZE = 224
BATCH_SIZE = 32
EPOCHS = 50
LEARNING_RATE = 0.001

CHARACTERS = [
    'harry_potter',
    'hermione_granger',
    'ron_weasley',
    'albus_dumbledore',
    'severus_snape',
    'lord_voldemort',
    'draco_malfoy',
    'rubeus_hagrid',
    'minerva_mcgonagall',
    'sirius_black',
    'dobby',
    'luna_lovegood'
]

NUM_CLASSES = len(CHARACTERS)

def create_synthetic_dataset(base_path='dataset', images_per_class=150):
    """Crée un dataset synthétique pour l'entraînement."""
    os.makedirs(base_path, exist_ok=True)
    
    # Couleurs caractéristiques pour chaque personnage
    character_colors = {
        'harry_potter': [(139, 0, 0), (255, 215, 0)],
        'hermione_granger': [(165, 42, 42), (255, 228, 196)],
        'ron_weasley': [(255, 69, 0), (255, 140, 0)],
        'albus_dumbledore': [(138, 43, 226), (230, 230, 250)],
        'severus_snape': [(0, 0, 0), (47, 79, 79)],
        'lord_voldemort': [(0, 100, 0), (128, 128, 128)],
        'draco_malfoy': [(0, 128, 0), (192, 192, 192)],
        'rubeus_hagrid': [(139, 69, 19), (160, 82, 45)],
        'minerva_mcgonagall': [(25, 25, 112), (220, 220, 220)],
        'sirius_black': [(0, 0, 0), (105, 105, 105)],
        'dobby': [(245, 222, 179), (210, 180, 140)],
        'luna_lovegood': [(255, 192, 203), (135, 206, 250)]
    }
    
    for character in tqdm(CHARACTERS, desc="Création du dataset"):
        char_path = os.path.join(base_path, character)
        os.makedirs(char_path, exist_ok=True)
        
        colors = character_colors[character]
        
        for i in range(images_per_class):
            img = np.zeros((IMG_SIZE, IMG_SIZE, 3), dtype=np.uint8)
            
            # Pattern de base avec gradient
            for y in range(IMG_SIZE):
                for x in range(IMG_SIZE):
                    ratio = (x + y) / (2 * IMG_SIZE)
                    color = [
                        int(colors[0][c] * (1 - ratio) + colors[1][c] * ratio)
                        for c in range(3)
                    ]
                    noise = np.random.randint(-30, 30, 3)
                    color = np.clip(np.array(color) + noise, 0, 255)
                    img[y, x] = color
            
            # Formes géométriques
            if i % 3 == 0:
                cv2.circle(img, (IMG_SIZE//2, IMG_SIZE//2), 40, colors[0], -1)
            elif i % 3 == 1:
                cv2.rectangle(img, (50, 50), (174, 174), colors[1], -1)
            else:
                pts = np.array([[IMG_SIZE//2, 50], [50, 174], [174, 174]], np.int32)
                cv2.fillPoly(img, [pts], colors[0])
            
            img_path = os.path.join(char_path, f'img_{i:03d}.jpg')
            cv2.imwrite(img_path, cv2.cvtColor(img, cv2.COLOR_RGB2BGR))
    
    print(f"\n✅ Dataset créé : {NUM_CLASSES} classes × {images_per_class} images")

def build_cnn_model():
    """Construit l'architecture CNN."""
    model = models.Sequential([
        # Block 1
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(IMG_SIZE, IMG_SIZE, 3)),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Block 2
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Block 3
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Block 4
        layers.Conv2D(256, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Fully Connected
        layers.Flatten(),
        layers.Dense(512, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.5),
        layers.Dense(256, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.5),
        layers.Dense(NUM_CLASSES, activation='softmax')
    ])
    
    return model

def main():
    """Fonction principale."""
    print("🧙‍♂️ Défi #20 : CNN Harry Potter\n")
    
    # 1. Créer le dataset
    print("📊 Étape 1/6 : Création du dataset...")
    create_synthetic_dataset()
    
    # 2. Préparer les données
    print("\n📊 Étape 2/6 : Préparation des données...")
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        validation_split=0.2
    )
    
    train_gen = train_datagen.flow_from_directory(
        'dataset',
        target_size=(IMG_SIZE, IMG_SIZE),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='training'
    )
    
    val_gen = train_datagen.flow_from_directory(
        'dataset',
        target_size=(IMG_SIZE, IMG_SIZE),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='validation',
        shuffle=False
    )
    
    # 3. Créer le modèle
    print("\n🏗️  Étape 3/6 : Construction du modèle CNN...")
    model = build_cnn_model()
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=LEARNING_RATE),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    model.summary()
    
    # 4. Callbacks
    print("\n⚙️  Étape 4/6 : Configuration des callbacks...")
    callbacks = [
        EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True),
        ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=5, min_lr=1e-7),
        ModelCheckpoint('best_model.h5', monitor='val_accuracy', save_best_only=True)
    ]
    
    # 5. Entraînement
    print("\n🚀 Étape 5/6 : Entraînement du modèle...")
    history = model.fit(
        train_gen,
        epochs=EPOCHS,
        validation_data=val_gen,
        callbacks=callbacks,
        verbose=1
    )
    
    # 6. Évaluation
    print("\n📈 Étape 6/6 : Évaluation...")
    results = model.evaluate(val_gen)
    print(f"\n✅ Loss: {results[0]:.4f}")
    print(f"✅ Accuracy: {results[1]:.4f} ({results[1]*100:.2f}%)")
    
    # Prédictions
    val_gen.reset()
    y_pred = model.predict(val_gen)
    y_pred_classes = np.argmax(y_pred, axis=1)
    y_true = val_gen.classes
    
    # Rapport de classification
    print("\n📋 Rapport de Classification:\n")
    report = classification_report(
        y_true,
        y_pred_classes,
        target_names=[c.replace('_', ' ').title() for c in CHARACTERS]
    )
    print(report)
    
    # Matrice de confusion
    cm = confusion_matrix(y_true, y_pred_classes)
    plt.figure(figsize=(14, 12))
    sns.heatmap(
        cm,
        annot=True,
        fmt='d',
        cmap='YlOrRd',
        xticklabels=[c.replace('_', ' ').title() for c in CHARACTERS],
        yticklabels=[c.replace('_', ' ').title() for c in CHARACTERS]
    )
    plt.title('🎯 Matrice de Confusion', fontsize=16, fontweight='bold')
    plt.xlabel('Prédiction')
    plt.ylabel('Vérité terrain')
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    plt.savefig('confusion_matrix.png', dpi=150)
    print("\n✅ Matrice de confusion sauvegardée : confusion_matrix.png")
    
    # Courbes d'entraînement
    fig, axes = plt.subplots(1, 2, figsize=(16, 6))
    axes[0].plot(history.history['loss'], label='Train Loss')
    axes[0].plot(history.history['val_loss'], label='Val Loss')
    axes[0].set_title('Loss')
    axes[0].legend()
    axes[0].grid(True)
    
    axes[1].plot(history.history['accuracy'], label='Train Accuracy')
    axes[1].plot(history.history['val_accuracy'], label='Val Accuracy')
    axes[1].set_title('Accuracy')
    axes[1].legend()
    axes[1].grid(True)
    
    plt.tight_layout()
    plt.savefig('training_history.png', dpi=150)
    print("✅ Courbes d'entraînement sauvegardées : training_history.png")
    
    # Sauvegarder le modèle
    model.save('harry_potter_cnn_final.h5')
    print("✅ Modèle sauvegardé : harry_potter_cnn_final.h5")
    
    print("\n" + "="*60)
    print("🏆 DÉFI #20 COMPLÉTÉ !")
    print("="*60)
    print(f"✅ {NUM_CLASSES} personnages reconnus")
    print(f"✅ Accuracy: {results[1]*100:.2f}%")
    print(f"✅ {model.count_params():,} paramètres")
    print("="*60)

if __name__ == "__main__":
    # Configuration GPU
    physical_devices = tf.config.list_physical_devices('GPU')
    if physical_devices:
        tf.config.experimental.set_memory_growth(physical_devices[0], True)
    
    main()

