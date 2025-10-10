# 🧾 Cahier des Charges – Projet Omega School Website

## 🔰 Projet : Omega School Website

**Équipe :** Omega – OpenDev Mada  
**Date de lancement :** Octobre 2025  
**Objectif :** Créer un site web complet et professionnel pour une **école fictive**, incluant la présentation, la gestion des cours, des professeurs, des étudiants et de l’administration.

---

## 1. 🎯 Objectif général

Le projet **Omega School Website** vise à concevoir un **site web moderne, fluide et fonctionnel**, représentant une école fictive.  
L’objectif principal est de **simuler un vrai projet professionnel**, alliant **développement technique**, **coordination d’équipe**, et **discipline de travail**.

Le site devra permettre de :
- Présenter l’école et ses valeurs.
- Gérer les cours, professeurs et étudiants.
- Offrir une interface d’administration simple pour le staff.
- Être **hébergé et déployé en ligne**.

---

## 2. 👥 Équipe Omega

| Rôle | Nom | Missions principales |
| ---- | ---- | -------------------- |
| 👑 **Chef de projet / Organisateur** | **Safidy** | Vision du projet, planification, communication, suivi, documentation |
| 🎨 **Front-End Developer** | **Antonio** | Interface, design responsive, intégration du contenu |
| ⚙️ **Back-End Developer** | **Nomena Fitahiana** | API, base de données, gestion utilisateur |
| ☁️ **Hébergeur / DevOps** | **Stephane Chan** | Déploiement, hébergement, maintenance, monitoring |

---

## 3. 🧩 Stack technique

- **Frontend :** React.js  
- **Backend :** Java (Spring Boot ou autre framework adapté)  
- **Base de données :** MySQL ou PostgreSQL  
- **Déploiement :** Vercel (ou autre hébergeur selon compatibilité du backend)  
- **Versioning :** GitHub (lien fourni par Safidy)  

---

## 4. 🧱 Fonctionnalités principales

### A. Partie publique (site principal)

- Page d’accueil : présentation de l’école, photos, valeurs, slogan.  
- Page des cours : liste des cours disponibles avec description.  
- Page des professeurs : affichage du profil des enseignants (nom, matière, bio courte).  
- Page d’inscription / contact : formulaire de contact ou de candidature.  
- Page des actualités : affichage de posts ou d’événements récents.  

### B. Partie utilisateur (étudiant / professeur)

- Connexion et inscription.  
- Accès à un **espace personnel** :  
  - Étudiants : voir leurs cours inscrits, professeurs, notes (simulées).  
  - Professeurs : voir leurs cours, étudiants inscrits.  

### C. Partie administration (admin dashboard)

- Gestion des cours : création, modification, suppression.  
- Gestion des professeurs et étudiants.  
- Gestion des comptes utilisateurs et rôles.  
- Statistiques globales : nombre de cours, étudiants, professeurs, etc.

---

## 5. 🎨 Design & UX/UI

### Thème visuel

- **Ambiance :** moderne, sérieuse, institutionnelle mais accueillante.  
- **Palette de couleurs recommandée :**
  - Couleur principale : `#1E40AF` (bleu foncé académique)  
  - Secondaire : `#10B981` (vert éducation / réussite)  
  - Accent : `#FACC15` (jaune clair pour les détails)  
  - Fond clair : `#F8FAFC`  
  - Texte : `#0F172A`  

### Style général

- **Design responsive** (desktop, tablette, mobile).  
- **Header** fixe avec logo + menu clair.  
- **Footer** avec liens et crédits OpenDev Mada.  
- Utilisation d’**icônes** éducatives (Lucide ou Heroicons).  
- Boutons arrondis, animations légères (hover, transitions).  

### Pages principales

1. **Accueil**
   - Présentation générale, photo de couverture, bouton “Découvrir les cours”.  
2. **Cours**
   - Liste des cours avec titre, description, prof et bouton “Détails”.  
3. **Professeurs**
   - Grille de profils (photo, nom, matière).  
4. **Contact / Inscription**
   - Formulaire + section infos école (adresse, email).  
5. **Dashboard Admin**
   - Accès sécurisé, gestion CRUD (cours, utilisateurs, etc.).  

---

## 6. ⚙️ Backend & API

### Structure API REST (exemple simplifié)

| Méthode | Route | Description |
| -------- | ------ | ----------- |
| POST | /auth/register | Créer un compte |
| POST | /auth/login | Connexion |
| GET | /courses | Lister tous les cours |
| POST | /courses | Créer un nouveau cours |
| PUT | /courses/:id | Modifier un cours |
| DELETE | /courses/:id | Supprimer un cours |
| GET | /teachers | Lister les professeurs |
| GET | /students | Lister les étudiants |
| GET | /dashboard/stats | Récupérer les statistiques générales |

**Sécurité :**
- Authentification JWT.  
- Rôles : Admin / Professeur / Étudiant.  
- Hashage des mots de passe avec BCrypt.  

---

## 7. 🧠 Architecture générale

### Frontend :
- Pages React avec composants modulaires.  
- State global via Context API ou Redux Toolkit.  
- Appels API via Axios / Fetch.  

### Backend :
- Architecture REST en Java.  
- Services, contrôleurs et repositories séparés.  
- Connexion à la base via JPA / Hibernate.  

---

## 8. 📅 Planning prévisionnel

| Étape | Durée estimée | Responsable |
| ----- | -------------- | ------------ |
| Phase 1 – Maquettes & Design | 1 semaine | Antonio / Safidy |
| Phase 2 – Backend API & BDD | 2 semaines | Nomena |
| Phase 3 – Intégration Front | 2 semaines | Antonio |
| Phase 4 – Dashboard & Auth | 1 semaine | Nomena / Antonio |
| Phase 5 – Déploiement | 3 à 5 jours | Stephane |
| Phase 6 – Tests & Livraison | 1 semaine | Tous |

---

## 9. 📁 Livrables attendus

- Code source GitHub (frontend + backend).  
- Documentation API.  
- Maquette visuelle (Figma ou simple preview).  
- Version déployée en ligne (Vercel ou alternative).  
- Guide d’installation rapide.  

---

## 10. 🧩 Bonus (si temps disponible)

- Mode sombre.  
- Système de notifications internes.  
- Messagerie simple étudiant ↔ professeur.  
- Tableau de bord avec statistiques animées.  
- Section “Blog / Actus” dynamique.  

---

## 11. ✅ Résumé rapide

| Élément | Description |
| -------- | ------------ |
| Nom du projet | **Omega School Website** |
| Type | Site web éducatif complet |
| Objectif | Présenter et gérer les activités d’une école fictive |
| Frontend | React.js |
| Backend | Java (Spring Boot) |
| BDD | MySQL / PostgreSQL |
| Déploiement | Vercel / Autre |
| Versioning | GitHub |
| Style | Moderne, professionnel, bleu/vert éducatif |
| Chef de projet | Safidy |

---
