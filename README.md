# 🚵‍♂️ VTT Passion - Site Web Personnel

Un site web moderne dédié à ma passion pour le VTT (cross-country et XCE), construit avec **Tailwind CSS** et **DaisyUI**.

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Structure du projet](#structure-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Utilisation](#utilisation)
- [Développement](#développement)

## 🎯 Aperçu

Ce site présente mon parcours en VTT, mes terrains favoris, une galerie photo de mes compétitions, et permet aux visiteurs de me contacter après avoir réussi un quiz sur le VTT.

**🌐 Fonctionnalités principales :**
- Design responsive avec thème clair/sombre
- Galerie photo interactive 
- Quiz interactif pour débloquer le formulaire de contact
- Carte interactive des parcours favoris
- Calculatrice intégrée
- Animations fluides

## 🛠️ Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles personnalisés
- **JavaScript (Vanilla)** - Interactivité
- **Tailwind CSS 3.4.17** - Framework CSS utilitaire
- **DaisyUI 4.12.24** - Composants UI élégants
- **Leaflet.js** - Cartes interactives
- **Font Awesome** - Icônes
- **Google Fonts (Raleway)** - Typographie

## 🚀 Installation

### Prérequis
- **Node.js** (version 16+)
- **npm** ou **yarn**

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone <url-du-repo>
cd mountain-biking-webpage
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Construire le CSS**
```bash
npm run build
```

4. **Ouvrir le site**
```bash
# Ouvrir src/index.html dans votre navigateur
# ou utiliser un serveur local comme Live Server
```

## 📁 Structure du projet

```
mountain-biking-webpage/
├── src/
│   ├── index.html              # Page principale
│   ├── A1_3_A2_2_A3_3.html    # Page de contact (après quiz)
│   ├── css/
│   │   ├── input.css           # CSS source (Tailwind + custom)
│   │   └── output.css          # CSS compilé (généré)
│   ├── js/
│   │   ├── script.js           # Logic principale
│   │   ├── animations.js       # Animations et effets
│   │   └── questionnaire.js    # Questions du quiz
│   └── images/
│       ├── forest-path.jpg     # Image de fond hero
│       ├── image1.jpg          # Photos VTT
│       ├── image2.jpg
│       ├── image3.jpg
│       └── image4.jpg
├── tailwind.config.js          # Configuration Tailwind
├── package.json                # Dépendances et scripts
└── README.md                   # Ce fichier
```

## ✨ Fonctionnalités

### 🏠 Page d'accueil
- **Hero section** avec image de fond
- **Navigation fixe** responsive
- **Thème switcher** (clair/sombre)

### 📸 Galerie
- Affichage en grille responsive
- **Modal viewer** pour agrandir les images
- Descriptions des moments marquants

### ℹ️ À propos
- **Accordéon interactif** avec mon parcours
- Pourquoi le VTT, terrains préférés, souvenirs

### 🗺️ Carte des parcours
- **Carte Leaflet** interactive
- Marqueurs personnalisés pour chaque spot
- Popups avec détails (difficulté, distance)

### 🧮 Calculatrice
- Interface style calculatrice
- Opérations basiques (+, -, ×, ÷, %)
- Design thématique VTT

### 🎯 Quiz interactif
- **3 questions** sur le VTT
- Validation en temps réel
- **Système de "hack"** :
  - Simple clic → Redirection vers page contact
  - Double clic → Brute force simulation
- Déblocage du formulaire de contact

### 📧 Contact
- Formulaire avec validation
- Champs requis et formats
- Messages de succès/erreur

## 🎮 Utilisation

### Développement en temps réel
```bash
npm run dev
# Surveille les changements dans input.css
```

### Build de production
```bash
npm run build
# Compile et minifie le CSS final
```

### Workflow recommandé
1. Modifier `src/css/input.css` pour les styles personnalisés
2. Lancer `npm run dev` pour le développement
3. Utiliser `npm run build` avant de déployer

## 🎨 Personnalisation

### Couleurs du thème
Les couleurs VTT sont définies dans `src/css/input.css` :
```css
:root {
    --forest-green: #2d5016;
    --moss-green: #4a7c59;
    --trail-orange: #d2691e;
    --dirt-yellow: #daa520;
    --stone-gray: #696969;
    --leaf-green: #90ee90;
}
```

### Images
Remplacer les images dans `src/images/` :
- `image1.jpg` à `image4.jpg` - Photos de galerie
- Mettre à jour les chemins dans `index.html` si nécessaire

### Quiz
Modifier les questions dans `src/js/questionnaire.js` :
```javascript
window.questionnaire = [
    {
        qId: 1,
        qLabel: "Votre question ?",
        reponses: [
            { rid: 1, rlabel: "Réponse A" },
            { rid: 2, rlabel: "Réponse B" }
        ],
        bonneReponse: 1
    }
];
```

## 🐛 Résolution de problèmes

### Le CSS ne se compile pas
```bash
# Vérifier l'installation
npm install

# Forcer la recompilation
npm run build
```

### Les images ne s'affichent pas
- Vérifier que les fichiers existent dans `src/images/`
- Contrôler les chemins relatifs dans le HTML

### Le quiz ne fonctionne pas
- Ouvrir la console développeur (F12)
- Vérifier que `questionnaire.js` est bien chargé

## 🤝 Contribution

Ce projet est personnel, mais les suggestions sont les bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push (`git push origin feature/amelioration`)
5. Créer une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**📞 Contact :** [selyan_vtt_](https://www.instagram.com/selyan_vtt_/)  
**🚴‍♂️ Strava :** [Profil Strava](https://www.strava.com/athletes/65996435)

*Fait avec ❤️ et beaucoup de ☕ pour partager ma passion du VTT !*
