# 🧪 GUIDE DE TEST MANUEL COMPLET - FuturistCards

## 🚀 Serveurs à démarrer
- **Backend**: http://localhost:5001 ✅ (Opérationnel)
- **Frontend**: http://localhost:3010 ✅ (Opérationnel)
- **Browser Preview**: http://127.0.0.1:50780 ✅ (Disponible)

## 📋 CHECKLIST DE TESTS COMPLETS

### 1. 🏠 PAGE D'ACCUEIL
- [ ] Ouvrir http://localhost:3010
- [ ] Vérifier que la page se charge correctement
- [ ] Tester le bouton de toggle thème (🌙/☀️)
- [ ] Tester le sélecteur de langue (🇫🇷/🇺🇸/🇮🇱)
- [ ] Vérifier que les animations fonctionnent
- [ ] Tester les liens de navigation dans la navbar
- [ ] Vérifier le contenu de la page d'accueil

### 2. 🔐 AUTHENTIFICATION
#### Page de Connexion (/login)
- [ ] Naviguer vers /login
- [ ] Vérifier le formulaire de connexion
- [ ] Tester avec des champs vides (validation)
- [ ] Se connecter avec: `testbiz@futuristcards.com` / `TestPass123!`
- [ ] Vérifier la redirection après connexion
- [ ] Tester le lien vers la page d'inscription

#### Page d'Inscription (/register)
- [ ] Naviguer vers /register
- [ ] Vérifier le formulaire d'inscription
- [ ] Tester la validation des champs
- [ ] Créer un nouveau compte
- [ ] Vérifier la redirection après inscription
- [ ] Tester le lien vers la page de connexion

### 3. 📱 NAVIGATION ET PAGES
#### Navbar
- [ ] Vérifier tous les liens de navigation
- [ ] Tester le menu mobile (réduire la fenêtre)
- [ ] Vérifier que les liens changent selon l'état de connexion
- [ ] Tester le bouton de déconnexion

#### Pages principales
- [ ] **/cards** - Page des cartes
- [ ] **/about** - Page À propos
- [ ] **/my-cards** - Mes cartes (connecté)
- [ ] **/create-card** - Créer une carte (business)
- [ ] **/favorites** - Favoris (connecté)
- [ ] **/profile** - Profil (connecté)
- [ ] **/admin** - Admin (admin uniquement)

### 4. 🃏 FONCTIONNALITÉS DES CARTES
#### Page des cartes (/cards)
- [ ] Vérifier l'affichage des cartes
- [ ] Tester la barre de recherche
- [ ] Tester les filtres par catégorie
- [ ] Cliquer sur "Voir détails" d'une carte
- [ ] Tester le bouton "Like" (❤️)
- [ ] Tester le bouton "Favoris"

#### Création de carte (/create-card)
- [ ] Vérifier l'accès (business uniquement)
- [ ] Remplir tous les champs du formulaire
- [ ] Tester la validation
- [ ] Créer une nouvelle carte
- [ ] Vérifier la redirection

#### Mes cartes (/my-cards)
- [ ] Voir ses propres cartes
- [ ] Tester le bouton "Modifier"
- [ ] Tester le bouton "Supprimer"
- [ ] Vérifier les statistiques

### 5. 🎨 THÈME ET LANGUES
#### Mode sombre/clair
- [ ] Tester le toggle sur toutes les pages
- [ ] Vérifier la persistance après rechargement
- [ ] Vérifier que tous les éléments changent de couleur

#### Langues (FR/EN/HE)
- [ ] Changer en français
- [ ] Changer en anglais
- [ ] Changer en hébreu (vérifier RTL)
- [ ] Vérifier que tous les textes sont traduits
- [ ] Vérifier la persistance

### 6. 📱 RESPONSIVE ET MOBILE
- [ ] Réduire la fenêtre (mobile)
- [ ] Tester le menu hamburger
- [ ] Vérifier que tout s'affiche correctement
- [ ] Tester les interactions tactiles

### 7. 🔍 RECHERCHE ET FILTRES
- [ ] Utiliser la barre de recherche globale
- [ ] Tester différents mots-clés
- [ ] Vérifier les résultats
- [ ] Tester les filtres par catégorie

### 8. ❤️ SYSTÈME DE FAVORIS ET LIKES
- [ ] Liker plusieurs cartes
- [ ] Ajouter aux favoris
- [ ] Aller sur /favorites
- [ ] Retirer des favoris
- [ ] Vérifier la persistance

### 9. 👤 GESTION DU PROFIL
- [ ] Aller sur /profile
- [ ] Vérifier les informations affichées
- [ ] Tester les boutons d'édition
- [ ] Modifier le profil
- [ ] Changer le mot de passe

### 10. 🔒 PAGES PROTÉGÉES
- [ ] Tenter d'accéder aux pages protégées sans connexion
- [ ] Vérifier les redirections
- [ ] Tester les permissions par rôle

### 11. 📊 ANALYTICS ET ADMIN
- [ ] Se connecter en tant qu'admin
- [ ] Aller sur /admin
- [ ] Vérifier le dashboard
- [ ] Tester les fonctions d'administration

### 12. 🚪 DÉCONNEXION
- [ ] Cliquer sur "Déconnexion"
- [ ] Vérifier la redirection
- [ ] Vérifier que l'état est réinitialisé
- [ ] Tenter d'accéder aux pages protégées

## 🎯 COMPTES DE TEST DISPONIBLES

### Utilisateur Business
- **Email**: `testbiz@futuristcards.com`
- **Mot de passe**: `TestPass123!`
- **Rôle**: Business (peut créer des cartes)

### Créer d'autres comptes
- Utiliser la page d'inscription
- Tester différents rôles (user, business)

## ✅ VALIDATION FINALE

### Critères de réussite
- [ ] Toutes les pages se chargent sans erreur
- [ ] Tous les boutons fonctionnent
- [ ] L'authentification fonctionne parfaitement
- [ ] Le thème persiste et fonctionne partout
- [ ] Les langues fonctionnent avec RTL
- [ ] Le responsive fonctionne
- [ ] Aucune erreur console
- [ ] Toutes les fonctionnalités CRUD marchent
- [ ] La navigation est fluide
- [ ] Le contenu est complet et cohérent

## 🐛 ERREURS À SIGNALER
- Noter toute erreur ou dysfonctionnement
- Vérifier la console du navigateur
- Tester sur différents navigateurs si possible

---

**🎉 Une fois tous les tests passés, l'application sera 100% validée !**
