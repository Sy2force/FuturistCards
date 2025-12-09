// Dictionnaire de traductions françaises pour remplacer les clés t()
export const translations = {
  // Navigation
  home: 'Accueil',
  cards: 'Cartes',
  myCards: 'Mes Cartes',
  favorites: 'Favoris',
  profile: 'Profil',
  admin: 'Admin',
  login: 'Connexion',
  register: 'Inscription',
  logout: 'Déconnexion',
  about: 'À propos',
  search: 'Rechercher',
  
  // Actions
  create: 'Créer',
  edit: 'Modifier',
  delete: 'Supprimer',
  save: 'Enregistrer',
  cancel: 'Annuler',
  back: 'Retour',
  next: 'Suivant',
  previous: 'Précédent',
  submit: 'Soumettre',
  confirm: 'Confirmer',
  
  // Formulaires
  title: 'Titre',
  subtitle: 'Sous-titre',
  name: 'Nom',
  email: 'Email',
  password: 'Mot de passe',
  confirmPassword: 'Confirmer le mot de passe',
  phone: 'Téléphone',
  website: 'Site web',
  address: 'Adresse',
  company: 'Entreprise',
  position: 'Poste',
  description: 'Description',
  category: 'Catégorie',
  image: 'Image',
  
  // Placeholders
  enterTitle: 'Entrez le titre',
  enterSubtitle: 'Entrez le sous-titre',
  enterName: 'Entrez votre nom',
  enterEmail: 'Entrez votre email',
  enterPassword: 'Entrez votre mot de passe',
  enterPhone: 'Entrez votre téléphone',
  enterWebsite: 'Entrez votre site web',
  enterAddress: 'Entrez votre adresse',
  enterCompany: 'Entrez votre entreprise',
  enterPosition: 'Entrez votre poste',
  enterDescription: 'Entrez la description',
  searchPlaceholder: 'Rechercher des cartes...',
  
  // Catégories
  technology: 'Technologie',
  business: 'Business',
  creative: 'Créatif',
  healthcare: 'Santé',
  education: 'Éducation',
  finance: 'Finance',
  marketing: 'Marketing',
  consulting: 'Conseil',
  retail: 'Commerce',
  other: 'Autre',
  
  // Messages
  welcome: 'Bienvenue',
  loading: 'Chargement...',
  error: 'Erreur',
  success: 'Succès',
  noResults: 'Aucun résultat',
  noCards: 'Aucune carte trouvée',
  cardCreated: 'Carte créée avec succès',
  cardUpdated: 'Carte mise à jour avec succès',
  cardDeleted: 'Carte supprimée avec succès',
  
  // Validation
  required: 'Requis',
  optional: 'Optionnel',
  invalidEmail: 'Email invalide',
  invalidPhone: 'Numéro de téléphone invalide',
  invalidWebsite: 'URL de site web invalide',
  passwordTooShort: 'Mot de passe trop court',
  passwordsNotMatch: 'Les mots de passe ne correspondent pas',
  
  // Pages
  createCard: 'Créer une carte',
  editCard: 'Modifier la carte',
  cardDetails: 'Détails de la carte',
  myProfile: 'Mon profil',
  adminPanel: 'Panneau d\'administration',
  
  // Actions sur cartes
  preview: 'Aperçu',
  addToFavorites: 'Ajouter aux favoris',
  removeFromFavorites: 'Retirer des favoris',
  viewCard: 'Voir la carte',
  deleteCard: 'Supprimer la carte',
  
  // Upload
  upload: 'Télécharger',
  uploadImage: 'Télécharger une image',
  removeImage: 'Supprimer l\'image',
  selectImage: 'Sélectionner une image',
  
  // Thème
  theme: 'Thème',
  darkMode: 'Mode sombre',
  lightMode: 'Mode clair',
  
  // Statistiques
  totalCards: 'Total des cartes',
  totalUsers: 'Total des utilisateurs',
  totalViews: 'Total des vues',
  
  // Footer
  allRightsReserved: 'Tous droits réservés',
  privacyPolicy: 'Politique de confidentialité',
  termsOfService: 'Conditions d\'utilisation',
  
  // Admin Panel
  adminPanelDescription: 'Gérer les utilisateurs, les rôles et les paramètres',
  manageUsersRolesSettings: 'Gérer les utilisateurs, les rôles et les paramètres',
  addUser: 'Ajouter un utilisateur',
  loadingUsers: 'Chargement des utilisateurs...',
  errorLoadingUsers: 'Erreur lors du chargement des utilisateurs',
  noUsersFound: 'Aucun utilisateur trouvé',
  activeUsers: 'Utilisateurs actifs',
  user: 'Utilisateur',
  role: 'Rôle',
  status: 'Statut',
  actions: 'Actions',
  createdAt: 'Créé le',
  lastLogin: 'Dernière connexion',
  active: 'Actif',
  inactive: 'Inactif',
  administrator: 'Administrateur',
  moderator: 'Modérateur',
  member: 'Membre',
  view: 'Voir',
  
  // Divers
  or: 'ou',
  and: 'et',
  yes: 'Oui',
  no: 'Non',
  close: 'Fermer',
  open: 'Ouvrir',
  show: 'Afficher',
  hide: 'Masquer'
};

// Fonction helper pour récupérer une traduction
export const t = (key) => {
  return translations[key] || key;
};
