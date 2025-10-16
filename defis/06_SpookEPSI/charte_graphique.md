# Charte Graphique - EPSI Poudlard

## 📋 Table des matières
- [Couleurs](#couleurs)
- [Typographie](#typographie)
- [Boutons](#boutons)
- [Pictogrammes et Icônes](#pictogrammes-et-icônes)
- [Logos](#logos)
- [Animations](#animations)
- [Components](#components)

---

## 🎨 Couleurs

### Palette Principale

#### Couleurs des Maisons de Poudlard

**Gryffondor (Rouge et Or)**
- `#740001` - Rouge profond (Primaire)
- `#D3A625` - Or (Secondaire)
- `#8B0000` - Rouge sombre (Hover)

**Serpentard (Vert et Argent)**
- `#1A472A` - Vert émeraude (Primaire)
- `#5D5D5D` - Argent (Secondaire)
- `#0E3818` - Vert sombre (Hover)

**Poufsouffle (Jaune et Noir)**
- `#ECB939` - Jaune (Primaire)
- `#000000` - Noir (Secondaire)
- `#D4A029` - Jaune foncé (Hover)

**Serdaigle (Bleu et Bronze)**
- `#0E1A40` - Bleu nuit (Primaire)
- `#946B2D` - Bronze (Secondaire)
- `#060D24` - Bleu très sombre (Hover)

### Palette Neutre

**Tons de Gris**
- `#1C1C1C` - Noir profond (Fond principal)
- `#2D2D2D` - Gris très foncé (Cartes)
- `#3F3F3F` - Gris foncé (Sections)
- `#F5F5F5` - Blanc cassé (Texte clair)
- `#FFFFFF` - Blanc pur (Titres)

**Couleurs d'accentuation**
- `#FFD700` - Or lumineux (CTA, Badges)
- `#8B4513` - Marron (Éléments décoratifs)
- `#4A0E4E` - Violet magique (Liens actifs)

### États des couleurs

**Success / Validé**
- `#2ECC71` - Vert succès

**Warning / Attention**
- `#F39C12` - Orange alerte

**Error / Erreur**
- `#E74C3C` - Rouge erreur

**Info**
- `#3498DB` - Bleu information

---

## ✍️ Typographie

### Polices Principales

**Titres & Headings**
- Police : `Cinzel Decorative` (Google Fonts)
- Fallback : `Georgia, serif`
- Poids : 400 (Regular), 700 (Bold), 900 (Black)
- Utilisation : H1, H2, H3

**Corps de texte**
- Police : `EB Garamond` (Google Fonts)
- Fallback : `Times New Roman, serif`
- Poids : 400 (Regular), 500 (Medium), 600 (SemiBold)
- Utilisation : Paragraphes, listes

**Texte UI / Navigation**
- Police : `Montserrat` (Google Fonts)
- Fallback : `Arial, sans-serif`
- Poids : 300 (Light), 400 (Regular), 600 (SemiBold), 700 (Bold)
- Utilisation : Menus, boutons, formulaires

**Texte magique / Citations**
- Police : `Uncial Antiqua` (Google Fonts)
- Fallback : `Brush Script MT, cursive`
- Poids : 400 (Regular)
- Utilisation : Citations magiques, slogans

### Tailles de police

**Desktop**
- H1 : 48px (3rem)
- H2 : 36px (2.25rem)
- H3 : 28px (1.75rem)
- H4 : 22px (1.375rem)
- Body : 16px (1rem)
- Small : 14px (0.875rem)

**Mobile**
- H1 : 32px (2rem)
- H2 : 26px (1.625rem)
- H3 : 22px (1.375rem)
- H4 : 18px (1.125rem)
- Body : 16px (1rem)
- Small : 14px (0.875rem)

### Interligne
- Titres : 1.2
- Corps de texte : 1.7
- Menus : 1.5

---

## 🔘 Boutons

### Types de boutons

#### Bouton Primaire (CTA)
```css
/* État Normal */
background: linear-gradient(135deg, #740001 0%, #D3A625 100%);
color: #FFFFFF;
padding: 14px 32px;
border-radius: 8px;
font-family: 'Montserrat', sans-serif;
font-weight: 600;
font-size: 16px;
border: none;
box-shadow: 0 4px 15px rgba(211, 166, 37, 0.3);
transition: all 0.3s ease;

/* État Hover */
background: linear-gradient(135deg, #8B0000 0%, #ECB939 100%);
transform: translateY(-2px);
box-shadow: 0 6px 20px rgba(211, 166, 37, 0.5);

/* État Active */
transform: translateY(0px);
box-shadow: 0 2px 10px rgba(211, 166, 37, 0.4);

/* État Disabled */
background: #3F3F3F;
color: #5D5D5D;
cursor: not-allowed;
box-shadow: none;
```

#### Bouton Secondaire
```css
/* État Normal */
background: transparent;
color: #D3A625;
padding: 14px 32px;
border-radius: 8px;
border: 2px solid #D3A625;
font-family: 'Montserrat', sans-serif;
font-weight: 600;
font-size: 16px;
transition: all 0.3s ease;

/* État Hover */
background: #D3A625;
color: #1C1C1C;
border-color: #ECB939;
transform: translateY(-2px);

/* État Active */
transform: translateY(0px);
background: #B8941F;
```

#### Bouton Icône
```css
/* État Normal */
background: #2D2D2D;
color: #F5F5F5;
width: 44px;
height: 44px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
border: none;
transition: all 0.3s ease;

/* État Hover */
background: #D3A625;
color: #1C1C1C;
transform: scale(1.1);
```

---

## 🎯 Pictogrammes et Icônes

### Style des icônes
- **Bibliothèque** : Lucide Icons / Heroicons
- **Style** : Outline pour navigation, Solid pour actions
- **Taille** : 24px (normal), 32px (grande), 16px (petite)
- **Couleur** : Hérite du texte parent
- **Stroke width** : 2px

### Icônes personnalisées Poudlard
- **Baguette magique** : `/assets/icons/wand.svg`
- **Chapeau de sorcier** : `/assets/icons/sorting-hat.svg`
- **Hibou** : `/assets/icons/owl.svg`
- **Éclair (Harry)** : `/assets/icons/lightning.svg`
- **Parchemin** : `/assets/icons/scroll.svg`
- **Chaudron** : `/assets/icons/cauldron.svg`
- **Écusson Poudlard** : `/assets/icons/hogwarts-crest.svg`

---

## 🏆 Logos

### Logo Principal EPSI Poudlard

**Variations**
1. **Logo Full Color** : Fond sombre
   - Fichier : `logo-epsi-poudlard-color.svg`
   - Utilisation : Header, Hero section

2. **Logo Monochrome Or** : Sur fond sombre
   - Fichier : `logo-epsi-poudlard-gold.svg`
   - Utilisation : Footer, documents

3. **Logo Blanc** : Sur fond coloré
   - Fichier : `logo-epsi-poudlard-white.svg`
   - Utilisation : Overlay, boutons

4. **Favicon** : 32x32px, 64x64px
   - Fichier : `favicon-epsi-poudlard.ico`
   - Motif : Éclair stylisé avec lettres EPSI

### Espace de sécurité
- Minimum 20px autour du logo
- Proportion : 1:1 (carré) ou 16:9 (horizontal)

### Taille minimale
- Print : 30mm
- Digital : 120px de largeur

---

## ✨ Animations

### Animation d'apparition (Fade In Up)
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
```

### Animation magique (Sparkle)
```css
@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.sparkle {
  animation: sparkle 1.5s infinite;
}
```

### Animation de lueur (Glow Pulse)
```css
@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(211, 166, 37, 0.5);
  }
  50% {
    box-shadow: 0 0 40px rgba(211, 166, 37, 0.8);
  }
}

.glow-pulse {
  animation: glowPulse 2s ease-in-out infinite;
}
```

### Transition de la baguette magique
```css
@keyframes wandSwipe {
  0% {
    transform: translateX(-100%) rotate(-15deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%) rotate(15deg);
    opacity: 0;
  }
}

.wand-swipe {
  animation: wandSwipe 1.2s ease-in-out;
}
```

### Loader Patronus
- **Animation** : Rotation avec trail de lumière dorée
- **Durée** : 1.5s
- **Easing** : cubic-bezier(0.68, -0.55, 0.265, 1.55)
- Référence : Défi #9 - Patronus EPSI

---

## 📦 Components

### 1. Header / Navigation

**Desktop**
```
- Hauteur : 80px
- Background : rgba(28, 28, 28, 0.95) avec backdrop-filter: blur(10px)
- Position : Sticky top: 0
- Z-index : 1000
- Shadow : 0 2px 20px rgba(0, 0, 0, 0.3)
```

**Mobile**
```
- Hauteur : 60px
- Menu burger : 32x32px
- Menu overlay : Full screen avec blur background
```

### 2. Hero Section

**Desktop**
```
- Hauteur : 100vh
- Background : Gradient overlay sur image Poudlard
- Padding : 120px 80px
- Texte aligné : center ou left selon version
```

**Mobile**
```
- Hauteur : 80vh
- Padding : 60px 20px
```

### 3. Card Component

```css
.card {
  background: linear-gradient(145deg, #2D2D2D, #1C1C1C);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(211, 166, 37, 0.2);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  border-color: rgba(211, 166, 37, 0.6);
  box-shadow: 0 12px 40px rgba(211, 166, 37, 0.2);
}
```

### 4. Input / Form

```css
.input {
  background: #1C1C1C;
  border: 2px solid #3F3F3F;
  border-radius: 8px;
  padding: 12px 16px;
  color: #F5F5F5;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  transition: all 0.3s ease;
}

.input:focus {
  border-color: #D3A625;
  outline: none;
  box-shadow: 0 0 0 3px rgba(211, 166, 37, 0.1);
}
```

### 5. Badge / Tag

```css
.badge {
  background: linear-gradient(135deg, #740001, #D3A625);
  color: #FFFFFF;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
}
```

### 6. Footer

```
- Background : #0E1A40 (Bleu Serdaigle)
- Padding : 60px 40px 30px
- Couleur texte : #F5F5F5
- Liens : #D3A625 avec hover effect
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
- xs : 0px - 575px (Mobile)
- sm : 576px - 767px (Large Mobile)
- md : 768px - 991px (Tablet)
- lg : 992px - 1199px (Desktop)
- xl : 1200px - 1399px (Large Desktop)
- xxl : 1400px+ (Extra Large Desktop)
```

---

## 🌙 Dark Mode (Par défaut)

Le site est conçu en Dark Mode par défaut, reflétant l'ambiance mystique de Poudlard la nuit.

**Principes**
- Contrastes élevés pour la lisibilité
- Utilisation de dégradés subtils
- Touches dorées pour guider l'œil
- Ombres profondes pour la profondeur

---

## 📐 Grille et Espacement

### Grid System
- Container max-width : 1320px
- Gutter : 24px
- Colonnes : 12

### Spacing Scale (rem)
```
- xs : 0.25rem (4px)
- sm : 0.5rem (8px)
- md : 1rem (16px)
- lg : 1.5rem (24px)
- xl : 2rem (32px)
- 2xl : 3rem (48px)
- 3xl : 4rem (64px)
- 4xl : 6rem (96px)
```

---

## 🎭 Accessibilité

### Contraste
- Ratio minimum : 4.5:1 (texte normal)
- Ratio minimum : 3:1 (texte large / UI)
- Tous les boutons respectent WCAG AA

### Focus States
- Outline visible : 2px solid #D3A625
- Offset : 2px

### Alt Text
- Toutes les images décoratives : alt=""
- Images informatives : alt descriptif

---

## 🚀 Export Figma / Développeur

### Nomenclature des assets
```
- Images : img-[section]-[description]-[variant].png
- Icônes : icon-[nom]-[size].svg
- Logos : logo-[variant]-[size].svg
```

### Format de livraison
- **Figma** : Fichier avec components réutilisables
- **Assets** : Dossier ZIP avec PNG (1x, 2x, 3x) et SVG
- **CSS Variables** : Fichier `variables.css` prêt à l'emploi
- **Documentation** : Ce fichier Markdown

---

*Charte créée pour le Défi #6 SpookEPSI - EPSI Poudlard 2025*

