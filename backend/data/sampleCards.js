const sampleCards = [
  {
    _id: "1",
    titleKey: "tech_solutions",
    subtitleKey: "tech_solutions", 
    descriptionKey: "tech_solutions",
    title: "Tech Solutions Inc",
    subtitle: "Technology",
    description: "Solutions informatiques innovantes pour entreprises modernes. Développement web, mobile et cloud computing.",
    phoneKey: "tech_solutions_phone",
    emailKey: "tech_solutions_email", 
    webKey: "tech_solutions_web",
    phone: "01 42 86 85 74",
    email: "contact@techsolutions.fr",
    web: "www.techsolutions.fr",
    addressKey: "tech_solutions_address",
    address: {
      city: "Paris",
      country: "France",
      street: "15 Avenue des Champs-Élysées",
      zipCode: "75008"
    },
    category: "technology",
    image: {
      url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
      alt: "Tech Solutions workspace"
    },
    createdAt: "2024-01-15T10:00:00.000Z"
  },
  {
    _id: "2",
    titleKey: "green_garden",
    subtitleKey: "green_garden",
    descriptionKey: "green_garden",
    title: "Green Garden Restaurant",
    subtitle: "Restaurant",
    description: "Restaurant écologique proposant une cuisine bio et locale dans un cadre verdoyant et authentique.",
    phoneKey: "green_garden_phone",
    emailKey: "green_garden_email",
    webKey: "green_garden_web",
    phone: "04 91 55 23 67",
    email: "info@greengarden.fr",
    web: "www.greengarden.fr",
    addressKey: "green_garden_address",
    address: {
      city: "Marseille",
      country: "France",
      street: "8 Rue de la République",
      zipCode: "13001"
    },
    category: "restaurant",
    image: {
      url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
      alt: "Green Garden restaurant"
    },
    createdAt: "2024-01-16T14:30:00.000Z"
  },
  {
    _id: "3",
    titleKey: "medical_center",
    subtitleKey: "medical_center",
    descriptionKey: "medical_center",
    title: "Centre Médical Moderne",
    subtitle: "Santé",
    description: "Centre médical offrant des soins de qualité avec équipements modernes et équipe médicale expérimentée.",
    phoneKey: "medical_center_phone",
    emailKey: "medical_center_email",
    webKey: "medical_center_web",
    phone: "04 72 33 44 55",
    email: "contact@centremedical.fr",
    web: "www.centremedical.fr",
    addressKey: "medical_center_address",
    address: {
      city: "Lyon",
      country: "France",
      street: "25 Avenue de la Santé",
      zipCode: "69003"
    },
    category: "health",
    image: {
      url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
      alt: "Medical center"
    },
    createdAt: "2024-01-17T09:15:00.000Z"
  },
  {
    _id: "4",
    titleKey: "design_studio",
    subtitleKey: "design_studio",
    descriptionKey: "design_studio",
    title: "Studio Design Créatif",
    subtitle: "Design",
    description: "Studio de design spécialisé dans la création graphique, branding et identité visuelle pour entreprises.",
    phoneKey: "design_studio_phone",
    emailKey: "design_studio_email",
    webKey: "design_studio_web",
    phone: "05 56 78 90 12",
    email: "hello@designstudio.fr",
    web: "www.designstudio.fr",
    addressKey: "design_studio_address",
    address: {
      city: "Bordeaux",
      country: "France",
      street: "12 Rue des Artistes",
      zipCode: "33000"
    },
    category: "design",
    image: {
      url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400",
      alt: "Design studio workspace"
    },
    createdAt: "2024-01-18T16:45:00.000Z"
  },
  {
    _id: "5",
    titleKey: "consulting_firm",
    subtitleKey: "consulting_firm",
    descriptionKey: "consulting_firm",
    title: "Cabinet Conseil Stratégique",
    subtitle: "Conseil",
    description: "Cabinet de conseil en stratégie d'entreprise, accompagnement dans la transformation digitale et l'innovation.",
    phoneKey: "consulting_firm_phone",
    emailKey: "consulting_firm_email",
    webKey: "consulting_firm_web",
    phone: "02 40 11 22 33",
    email: "contact@conseilstrat.fr",
    web: "www.conseilstrat.fr",
    addressKey: "consulting_firm_address",
    address: {
      city: "Nantes",
      country: "France",
      street: "18 Boulevard de la Stratégie",
      zipCode: "44000"
    },
    category: "consulting",
    image: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      alt: "Consulting firm office"
    },
    createdAt: "2024-01-19T11:20:00.000Z"
  },
  {
    _id: "6",
    titleKey: "fitness_center",
    subtitleKey: "fitness_center",
    descriptionKey: "fitness_center",
    title: "FitZone Gym & Wellness",
    subtitle: "Fitness",
    description: "Centre de fitness moderne avec équipements haut de gamme, cours collectifs et coaching personnalisé.",
    phoneKey: "fitness_center_phone",
    emailKey: "fitness_center_email",
    webKey: "fitness_center_web",
    phone: "03 20 45 67 89",
    email: "info@fitzone.fr",
    web: "www.fitzone.fr",
    addressKey: "fitness_center_address",
    address: {
      city: "Lille",
      country: "France",
      street: "30 Rue du Sport",
      zipCode: "59000"
    },
    category: "fitness",
    image: {
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      alt: "Fitness center"
    },
    createdAt: "2024-01-20T08:00:00.000Z"
  },
  {
    _id: "7",
    titleKey: "law_firm",
    subtitleKey: "law_firm",
    descriptionKey: "law_firm",
    title: "Cabinet d'Avocats Prestige",
    subtitle: "Juridique",
    description: "Cabinet d'avocats spécialisé en droit des affaires et conseil juridique pour entreprises avec expertise reconnue.",
    phoneKey: "law_firm_phone",
    emailKey: "law_firm_email",
    webKey: "law_firm_web",
    phone: "04 93 12 34 56",
    email: "contact@cabinetprestige.fr",
    web: "www.cabinetprestige.fr",
    addressKey: "law_firm_address",
    address: {
      city: "Nice",
      country: "France",
      street: "22 Promenade des Anglais",
      zipCode: "06000"
    },
    category: "legal",
    image: {
      url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400",
      alt: "Law firm office"
    },
    createdAt: "2024-01-21T13:30:00.000Z"
  },
  {
    _id: "8",
    titleKey: "beauty_salon",
    subtitleKey: "beauty_salon",
    descriptionKey: "beauty_salon",
    title: "Salon de Beauté Élégance",
    subtitle: "Beauté",
    description: "Institut de beauté proposant soins du visage, coiffure et services esthétiques haut de gamme dans un cadre élégant.",
    phoneKey: "beauty_salon_phone",
    emailKey: "beauty_salon_email",
    webKey: "beauty_salon_web",
    phone: "02 99 87 65 43",
    email: "contact@elegance-beaute.fr",
    web: "www.elegance-beaute.fr",
    addressKey: "beauty_salon_address",
    address: {
      city: "Rennes",
      country: "France",
      street: "14 Rue de la Beauté",
      zipCode: "35000"
    },
    category: "beauty",
    image: {
      url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
      alt: "Beauty salon"
    },
    createdAt: "2024-01-22T15:45:00.000Z"
  },
  {
    _id: "9",
    titleKey: "real_estate",
    subtitleKey: "real_estate",
    descriptionKey: "real_estate",
    title: "Immobilier Premium",
    subtitle: "Immobilier",
    description: "Agence immobilière spécialisée dans les biens de prestige et l'investissement immobilier avec service personnalisé.",
    phoneKey: "real_estate_phone",
    emailKey: "real_estate_email",
    webKey: "real_estate_web",
    phone: "04 67 89 01 23",
    email: "contact@immopremium.fr",
    web: "www.immopremium.fr",
    addressKey: "real_estate_address",
    address: {
      city: "Montpellier",
      country: "France",
      street: "35 Avenue de l'Immobilier",
      zipCode: "34000"
    },
    category: "real_estate",
    image: {
      url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
      alt: "Real estate office"
    },
    createdAt: "2024-01-23T10:15:00.000Z"
  },
  {
    _id: "10",
    titleKey: "photography_studio",
    subtitleKey: "photography_studio",
    descriptionKey: "photography_studio",
    title: "Studio Photo Artistique",
    subtitle: "Photographie",
    description: "Studio de photographie spécialisé dans les portraits, événements et photographie commerciale avec équipement professionnel.",
    phoneKey: "photography_studio_phone",
    emailKey: "photography_studio_email",
    webKey: "photography_studio_web",
    phone: "03 88 45 67 89",
    email: "contact@studioartistique.fr",
    web: "www.studioartistique.fr",
    addressKey: "photography_studio_address",
    address: {
      city: "Strasbourg",
      country: "France",
      street: "28 Rue de la Photo",
      zipCode: "67000"
    },
    category: "photography",
    image: {
      url: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
      alt: "Photography studio"
    },
    createdAt: "2024-01-24T14:20:00.000Z"
  },
  {
    _id: "11",
    titleKey: "bakery_shop",
    subtitleKey: "bakery_shop",
    descriptionKey: "bakery_shop",
    title: "Boulangerie Artisanale",
    subtitle: "Boulangerie",
    description: "Boulangerie artisanale proposant pains traditionnels, viennoiseries et pâtisseries maison avec savoir-faire authentique.",
    phoneKey: "bakery_shop_phone",
    emailKey: "bakery_shop_email",
    webKey: "bakery_shop_web",
    phone: "05 61 23 45 67",
    email: "contact@boulangerie-artisanale.fr",
    web: "www.boulangerie-artisanale.fr",
    addressKey: "bakery_shop_address",
    address: {
      city: "Toulouse",
      country: "France",
      street: "16 Place du Pain",
      zipCode: "31000"
    },
    category: "food",
    image: {
      url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
      alt: "Artisan bakery"
    },
    createdAt: "2024-01-25T07:30:00.000Z"
  },
  {
    _id: "12",
    titleKey: "auto_garage",
    subtitleKey: "auto_garage",
    descriptionKey: "auto_garage",
    title: "Garage Automobile Expert",
    subtitle: "Automobile",
    description: "Garage automobile spécialisé dans la réparation, l'entretien et le diagnostic pour toutes marques de véhicules avec expertise technique.",
    phoneKey: "auto_garage_phone",
    emailKey: "auto_garage_email",
    webKey: "auto_garage_web",
    phone: "04 76 89 12 34",
    email: "contact@garage-expert.fr",
    web: "www.garage-expert.fr",
    addressKey: "auto_garage_address",
    address: {
      city: "Grenoble",
      country: "France",
      street: "42 Avenue des Mécaniciens",
      zipCode: "38000"
    },
    category: "automotive",
    image: {
      url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400",
      alt: "Auto garage"
    },
    createdAt: "2024-01-26T12:00:00.000Z"
  }
];

module.exports = { sampleCards };
