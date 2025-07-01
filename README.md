<h1 align="center">
<img src="https://img.icons8.com/color/96/000000/electric-scooter.png" width="48" alt="Jolt Logo"/>
<br>
Jolt Web
</h1>
<p align="center">
<strong>La mobilité douce, connectée et communautaire.</strong><br>
La version Web de l’application mobile <a href="https://github.com/MitryDim/Jolt-Mobile">Jolt-Mobile</a>, pour faciliter vos trajets en milieu urbain et rural.
</p>
<p align="center">
<a href="./LICENSE">
<img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License" />
</a>
<img src="https://img.shields.io/badge/platform-Web-blue" alt="Web Platform" />
<img src="https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white" alt="React 19" />
<img src="https://img.shields.io/badge/Vite-6-646CFF?logo=Vite&logoColor=white" alt="Vite 6" />
<img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
</p>
<h3 align="center">
    <a href="#-fonctionnalités-principales">Fonctionnalités</a>
    <span> · </span>
    <a href="#️-configuration">Configuration</a>
    <span> · </span>
    <a href="#-contribution">Contribuer</a>
</h3>

---

## ✨ Présentation

**Jolt Web** offre une expérience complète pour les adeptes de la mobilité douce :

- **Planifiez vos trajets** à vélo, trottinette ou tout autre moyen de transport léger.
- **Enregistrez et retrouvez vos itinéraires** favoris en quelques clics.
- **Découvrez les parcours de la communauté** et inspirez-vous des trajets partagés.
- **Gérez facilement votre matériel** : véhicules, historique d’entretien, et bien plus encore.

Profitez d’une plateforme moderne, intuitive et pensée pour simplifier vos déplacements au quotidien !

C’est une version Web de notre application mobile [Jolt-Mobile](https://github.com/MitryDim/Jolt-Mobile).

---

## 🎬 Démonstration vidéo

<div align="center">

|                                         Version Membre                                          |                                         Version Admin                                          |                                         Version Professionnel                                          |
| :---------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: |
| [![Version Membre](https://img.youtube.com/vi/8v3CKQ9QaXA/0.jpg)](https://youtu.be/8v3CKQ9QaXA) | [![Version Admin](https://img.youtube.com/vi/WIugD-oQqgY/0.jpg)](https://youtu.be/WIugD-oQqgY) | [![Version Professionnel](https://img.youtube.com/vi/Bag2bf0KPl4/0.jpg)](https://youtu.be/Bag2bf0KPl4) |

</div>

</div>

---

## 📦 Fonctionnalités principales

Voici ce que vous pouvez faire avec Jolt Web :

<div align="center">

<table>
    <tr>
        <td align="center" valign="top" width="220">
            <img src="https://img.icons8.com/fluency/48/000000/add-user-group-man-man.png" alt="Inscription et Connexion"/><br>
            <b>S’inscrire & Se connecter</b><br>
            Créez un compte, confirmez votre e-mail et connectez-vous en toute sécurité.
        </td>
        <td align="center" valign="top" width="220">
            <img src="https://img.icons8.com/fluency/48/000000/route.png" alt="Créer et gérer des trajets"/><br>
            <b>Créer & Gérer des trajets</b><br>
            Planifiez, modifiez ou supprimez vos itinéraires, exportez-les au format GPX.
        </td>
        <td align="center" valign="top" width="220">
            <img src="https://img.icons8.com/fluency/48/000000/share.png" alt="Découvrir et partager"/><br>
            <b>Découvrir & Partager</b><br>
            Consultez les trajets de la communauté et copiez-les comme modèles.
        </td>
    </tr>
    <tr>
        <td align="center" valign="top" width="220">
            <img src="https://img.icons8.com/fluency/48/000000/scooter.png" alt="Gérer votre matériel"/><br>
            <b>Gérer votre matériel</b><br>
            Visualisez vos véhicules et l’historique des maintenances, factures incluses.
        </td>
        <td align="center" valign="top" width="220">
            <img src="https://img.icons8.com/fluency/48/000000/admin-settings-male.png" alt="Espace administrateur"/><br>
            <b>Espace administrateur</b><br>
            Gérez utilisateurs, trajets et véhicules depuis un espace dédié.
        </td>
        <td align="center" valign="top" width="220">
            <img src="https://img.icons8.com/fluency/48/000000/maintenance.png" alt="Espace professionnel"/><br>
            <b>Espace professionnel</b><br>
            Ajoutez des maintenances sur les véhicules des clients.
        </td>
    </tr>
</table>

</div>

---

## 📝 Prérequis

Avant d’utiliser ou de contribuer à Jolt Web, assurez-vous d’avoir :

- **Node.js** (version 18 ou supérieure)
- **npm** (ou **yarn**)
- Un accès à l’API [Jolt-API](https://github.com/Valt1-0/Jolt-API)
- Une clé API OpenRouteService (optionnelle, pour la planification d’itinéraires)

Installez Node.js et npm depuis [nodejs.org](https://nodejs.org/).
Clonez ce dépôt et suivez la section [Configuration](#-configuration) pour démarrer rapidement.

---

## 🚀 Installation

1. **Clonez le dépôt** :

   ```bash
   git clone https://github.com/Valt1-0/Jolt-Web.git
   cd Jolt-Web
   ```

2. **Installez les dépendances** :

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configurez l’environnement** :
   Suivez la section [Configuration](#️-configuration) pour créer le fichier `.env`.

4. **Lancez le projet en développement** :
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

L’application sera accessible sur [http://localhost:8000](http://localhost:8000) par défaut.

---

## 🧪 Tests

Jolt Web utilise **Cypress** pour les tests end-to-end (E2E) afin de garantir la qualité et la stabilité de l’application.

### Lancer les tests

Pour exécuter la suite de tests Cypress :

```bash
npm run cypress
# ou
yarn cypress
```

Ou lancez l’interface graphique de Cypress :

```bash
npx cypress open
```

### Structure des tests

- Les fichiers de test Cypress se trouvent dans le dossier `cypress/e2e`.
- Tests actuellement présents :
  - `auth.cy.js` : Tests d’authentification (inscription, connexion, déconnexion).
- Les tests couvrent les parcours utilisateurs principaux et les fonctionnalités critiques.

### Outils utilisés

- **Cypress** – Tests E2E interactifs et robustes pour applications web

### Bonnes pratiques

- Écrivez des tests pour chaque nouvelle fonctionnalité ou correction de bug.
- Simulez les interactions utilisateur réelles (clics, saisies, navigation).
- Vérifiez l’affichage, les redirections et les messages d’erreur.

Consultez les fichiers du dossier `cypress/e2e` pour des exemples de scénarios de test.

---

## ⚙️ Comment ça fonctionne ?

Jolt Web repose sur une interface moderne construite avec :

- **React** – Moteur de l’interface interactive
- **Vite** – Chargement ultra-rapide du site
- **Tailwind CSS** – Design et styles
- **Leaflet** & **React Leaflet** – Cartes interactives
- **Framer Motion** – Animations fluides
- **gpx-builder** – Export des itinéraires au format GPX
- **React Router** – Navigation entre les pages

Le site communique avec **[Jolt-API](https://github.com/Valt1-0/Jolt-API)** : un ensemble de micro-services regroupés derrière une passerelle (gateway) centralisant les informations (trajets, utilisateurs, véhicules, etc.).

---

## ⚙️ Configuration

Avant de lancer l’application, créez un fichier `.env` à la racine du projet :

```env
VITE_API_GATEWAY_URL=http://<adresse-ip-ou-domaine>:<port>
```

Ajoutez également votre clé API OpenRouteService si vous souhaitez activer la planification d’itinéraires :

```env
VITE_ORS_KEY=your_openrouteservice_api_key
```

Assurez-vous que l’API Jolt-API soit accessible depuis votre application.

---

## 🗂 Structure du projet

- `src/components` : composants réutilisables
- `src/pages` : pages principales de l’application
- `src/context` : contextes React
- `src/hooks` : hooks personnalisés
- `src/utils` : fonctions utilitaires
- `src/services` : services pour les appels API

---

## 🤝 Contribution

1. Forkez le dépôt
2. Créez une branche pour votre fonctionnalité ou correction
3. Commitez vos modifications
4. Poussez sur votre fork
5. Ouvrez une pull request

Merci de respecter la structure du projet et les conventions de nommage.

---

## 👨‍💻 Auteurs

Jolt Team

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE) pour plus d’informations.
