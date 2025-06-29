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
<a href="#-fonctionnalités">Fonctionnalités</a>
<span> · </span>
<a href="#-installation">Installation</a>
<span> · </span>
<a href="#-configuration">Configuration</a>
<span> · </span>
<a href="#-contribution">Contribution</a>
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

## 🛠 Technologies utilisées

- React avec Vite
- Tailwind CSS
- Framer Motion
- GPX Builder
- Leaflet avec React-Leaflet
- React Router

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
