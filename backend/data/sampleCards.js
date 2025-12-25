const sampleCards = [
  {
    _id: "1",
    titleKey: "tech_solutions",
    subtitleKey: "tech_solutions", 
    descriptionKey: "tech_solutions",
    title: "Tech Solutions Inc",
    subtitle: "Solutions Technologiques Innovantes",
    description: "Entreprise leader en solutions informatiques sur mesure. Nous développons des applications web et mobiles révolutionnaires, offrons des services cloud computing avancés et accompagnons la transformation digitale des entreprises avec une expertise technique reconnue et une approche client personnalisée.",
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
    likes: 0,
    views: 0,
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
    subtitle: "Cuisine Bio & Écologique",
    description: "Restaurant gastronomique éco-responsable spécialisé dans la cuisine bio et locale. Notre chef étoilé crée des plats savoureux avec des ingrédients frais de saison, cultivés par des producteurs locaux. Ambiance chaleureuse dans un cadre verdoyant avec terrasse panoramique et jardin potager bio.",
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
    likes: 0,
    views: 0,
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
    subtitle: "Excellence Médicale & Soins Avancés",
    description: "Centre médical de pointe offrant des soins médicaux d'excellence avec technologies de dernière génération. Notre équipe pluridisciplinaire de médecins spécialisés assure consultations, diagnostics avancés, chirurgie ambulatoire et suivi personnalisé dans un environnement moderne et sécurisé.",
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
    likes: 0,
    views: 0,
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
    subtitle: "Création Graphique & Branding Premium",
    description: "Studio de design créatif reconnu pour son expertise en identité visuelle et communication graphique. Nous concevons des logos mémorables, chartes graphiques complètes, supports print et digitaux innovants. Notre approche artistique unique transforme votre vision en identité visuelle percutante et différenciante.",
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
    likes: 0,
    views: 0,
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
    subtitle: "Stratégie d'Entreprise & Transformation",
    description: "Cabinet de conseil stratégique de référence accompagnant les dirigeants dans leurs défis de croissance et transformation. Expertise en stratégie d'entreprise, innovation digitale, optimisation organisationnelle et conduite du changement. Approche sur-mesure avec consultants seniors expérimentés.",
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
    likes: 0,
    views: 0,
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
    subtitle: "Fitness Premium & Bien-être",
    description: "Centre de fitness haut de gamme avec équipements dernière génération et espace wellness complet. Cours collectifs variés, coaching personnalisé, espace cardio-training, musculation professionnelle, sauna, hammam et espace détente. Programmes sur-mesure avec nutritionniste et coach sportif diplômé.",
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
    likes: 0,
    views: 0,
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
    subtitle: "Excellence Juridique & Conseil d'Affaires",
    description: "Cabinet d'avocats de renom spécialisé en droit des affaires, droit commercial et conseil juridique stratégique. Notre équipe d'avocats expérimentés accompagne entreprises et particuliers dans leurs enjeux juridiques complexes : contentieux, négociations, fusions-acquisitions, propriété intellectuelle et conformité réglementaire.",
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
    likes: 0,
    views: 0,
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
    subtitle: "Institut de Beauté & Spa Luxe",
    description: "Institut de beauté prestigieux offrant une gamme complète de soins esthétiques haut de gamme. Soins du visage anti-âge, coiffure tendance, manucure-pédicure, épilation laser, massages relaxants et soins corporels dans un cadre raffiné. Produits cosmétiques premium et équipe d'esthéticiennes diplômées.",
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
    likes: 0,
    views: 0,
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
    subtitle: "Biens de Prestige & Investissement",
    description: "Agence immobilière de luxe spécialisée dans la vente et location de biens d'exception. Appartements de standing, maisons de maître, propriétés de caractère et investissements locatifs rentables. Service personnalisé avec conseillers experts, estimation gratuite, accompagnement juridique et financier complet.",
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
    likes: 0,
    views: 0,
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
    subtitle: "Photographie Professionnelle & Créative",
    description: "Studio de photographie artistique dirigé par des photographes professionnels passionnés. Spécialisés en portraits d'art, photographie de mariage, événements corporate, shootings mode et photographie commerciale. Équipement haute définition, retouche professionnelle et créativité artistique pour des images d'exception.",
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
    likes: 0,
    views: 0,
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
    subtitle: "Tradition Boulangère & Pâtisserie Fine",
    description: "Boulangerie artisanale familiale perpétuant la tradition boulangère française depuis trois générations. Pains au levain naturel, viennoiseries pur beurre, pâtisseries maison et spécialités régionales. Farines biologiques sélectionnées, cuisson au feu de bois et savoir-faire artisanal authentique pour des produits d'exception.",
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
    likes: 0,
    views: 0,
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
    subtitle: "Mécanique Auto & Diagnostic Avancé",
    description: "Garage automobile professionnel avec 25 ans d'expérience dans la réparation et l'entretien multi-marques. Diagnostic électronique avancé, mécanique générale, carrosserie, peinture et révisions complètes. Équipe de mécaniciens certifiés, pièces d'origine garanties et service de dépannage 24h/24. Expertise reconnue toutes marques.",
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
    likes: 0,
    views: 0,
    image: {
      url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400",
      alt: "Auto garage"
    },
    createdAt: "2024-01-26T12:00:00.000Z"
  },
  {
    _id: "13",
    titleKey: "marketing_agency",
    subtitleKey: "marketing_agency",
    descriptionKey: "marketing_agency",
    title: "Agence Marketing Digital",
    subtitle: "Stratégie Digitale & Communication 360°",
    description: "Agence marketing digital full-service spécialisée dans la croissance des entreprises en ligne. SEO/SEA, réseaux sociaux, content marketing, publicité digitale, email marketing et analytics avancés. Équipe créative et technique pour campagnes performantes, ROI optimisé et présence digitale renforcée.",
    phoneKey: "marketing_agency_phone",
    emailKey: "marketing_agency_email",
    webKey: "marketing_agency_web",
    phone: "01 45 67 89 01",
    email: "contact@marketing-digital.fr",
    web: "www.marketing-digital.fr",
    addressKey: "marketing_agency_address",
    address: {
      city: "Paris",
      country: "France",
      street: "50 Rue du Marketing",
      zipCode: "75009"
    },
    category: "marketing",
    likes: 0,
    views: 0,
    image: {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      alt: "Marketing agency"
    },
    createdAt: "2024-01-27T09:30:00.000Z"
  },
  {
    _id: "14",
    titleKey: "financial_advisor",
    subtitleKey: "financial_advisor",
    descriptionKey: "financial_advisor",
    title: "Conseil Financier Premium",
    subtitle: "Gestion de Patrimoine & Investissement",
    description: "Cabinet de conseil financier indépendant spécialisé dans la gestion de patrimoine et l'optimisation fiscale. Conseils en investissement, assurance-vie, immobilier locatif, retraite et transmission. Approche personnalisée avec conseillers certifiés AMF pour stratégies patrimoniales sur-mesure et performance optimisée.",
    phoneKey: "financial_advisor_phone",
    emailKey: "financial_advisor_email",
    webKey: "financial_advisor_web",
    phone: "04 92 34 56 78",
    email: "contact@conseil-financier.fr",
    web: "www.conseil-financier.fr",
    addressKey: "financial_advisor_address",
    address: {
      city: "Cannes",
      country: "France",
      street: "33 Boulevard de la Finance",
      zipCode: "06400"
    },
    category: "finance",
    likes: 0,
    views: 0,
    image: {
      url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
      alt: "Financial advisor office"
    },
    createdAt: "2024-01-28T11:15:00.000Z"
  },
  {
    _id: "15",
    titleKey: "education_center",
    subtitleKey: "education_center",
    descriptionKey: "education_center",
    title: "Centre de Formation Excellence",
    subtitle: "Formation Professionnelle & Développement",
    description: "Centre de formation professionnelle reconnu proposant des formations certifiantes dans le digital, management, langues et compétences techniques. Formateurs experts, méthodes pédagogiques innovantes, e-learning interactif et accompagnement personnalisé. Financement CPF, alternance et formation continue pour tous niveaux.",
    phoneKey: "education_center_phone",
    emailKey: "education_center_email",
    webKey: "education_center_web",
    phone: "02 51 78 90 12",
    email: "contact@formation-excellence.fr",
    web: "www.formation-excellence.fr",
    addressKey: "education_center_address",
    address: {
      city: "Nantes",
      country: "France",
      street: "27 Avenue de l'Éducation",
      zipCode: "44200"
    },
    category: "education",
    likes: 0,
    views: 0,
    image: {
      url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400",
      alt: "Education center"
    },
    createdAt: "2024-01-29T14:45:00.000Z"
  },
  {
    _id: "16",
    titleKey: "travel_agency",
    subtitleKey: "travel_agency",
    descriptionKey: "travel_agency",
    title: "Agence Voyage Prestige",
    subtitle: "Voyages de Luxe & Expériences Uniques",
    description: "Agence de voyage haut de gamme créant des expériences de voyage sur-mesure et inoubliables. Destinations d'exception, hôtels de luxe, circuits privatisés, safaris exclusifs et croisières premium. Conseillers voyage experts, conciergerie 24h/24 et service personnalisé pour voyages d'affaires et loisirs d'exception.",
    phoneKey: "travel_agency_phone",
    emailKey: "travel_agency_email",
    webKey: "travel_agency_web",
    phone: "04 94 12 34 56",
    email: "contact@voyage-prestige.fr",
    web: "www.voyage-prestige.fr",
    addressKey: "travel_agency_address",
    address: {
      city: "Saint-Tropez",
      country: "France",
      street: "19 Port de Plaisance",
      zipCode: "83990"
    },
    category: "travel",
    likes: 0,
    views: 0,
    image: {
      url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
      alt: "Travel agency"
    },
    createdAt: "2024-01-30T16:20:00.000Z"
  },
  {
    _id: "17",
    titleKey: "architecture_firm",
    subtitleKey: "architecture_firm",
    descriptionKey: "architecture_firm",
    title: "Cabinet Architecture Moderne",
    subtitle: "Architecture Contemporaine & Design",
    description: "Cabinet d'architecture reconnu spécialisé dans l'architecture contemporaine et le design d'espaces innovants. Projets résidentiels haut de gamme, bâtiments commerciaux, rénovations patrimoniales et aménagements intérieurs. Approche durable, technologies BIM et créativité architecturale pour espaces de vie exceptionnels.",
    phoneKey: "architecture_firm_phone",
    emailKey: "architecture_firm_email",
    webKey: "architecture_firm_web",
    phone: "04 78 56 78 90",
    email: "contact@architecture-moderne.fr",
    web: "www.architecture-moderne.fr",
    addressKey: "architecture_firm_address",
    address: {
      city: "Lyon",
      country: "France",
      street: "41 Rue de l'Architecture",
      zipCode: "69002"
    },
    category: "architecture",
    likes: 0,
    views: 0,
    image: {
      url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400",
      alt: "Architecture firm"
    },
    createdAt: "2024-01-31T10:30:00.000Z"
  },
  {
    _id: "18",
    titleKey: "event_planning",
    subtitleKey: "event_planning",
    descriptionKey: "event_planning",
    title: "Organisation Événements Luxe",
    subtitle: "Événementiel Haut de Gamme & Créativité",
    description: "Agence événementielle de prestige créant des événements d'exception sur-mesure. Mariages de rêve, événements corporate, lancements produits, galas et réceptions privées. Créativité artistique, logistique parfaite, prestataires sélectionnés et coordination experte pour moments inoubliables et réussites garanties.",
    phoneKey: "event_planning_phone",
    emailKey: "event_planning_email",
    webKey: "event_planning_web",
    phone: "01 56 78 90 12",
    email: "contact@evenements-luxe.fr",
    web: "www.evenements-luxe.fr",
    addressKey: "event_planning_address",
    address: {
      city: "Paris",
      country: "France",
      street: "38 Avenue des Événements",
      zipCode: "75016"
    },
    category: "events",
    likes: 0,
    views: 0,
    image: {
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400",
      alt: "Event planning"
    },
    createdAt: "2024-02-01T13:15:00.000Z"
  },
  {
    _id: "19",
    titleKey: "veterinary_clinic",
    subtitleKey: "veterinary_clinic",
    descriptionKey: "veterinary_clinic",
    title: "Clinique Vétérinaire Moderne",
    subtitle: "Soins Vétérinaires & Bien-être Animal",
    description: "Clinique vétérinaire moderne équipée des dernières technologies pour soins complets de vos animaux de compagnie. Consultations, chirurgie, radiologie, analyses, urgences 24h/24 et hospitalisation. Équipe de vétérinaires passionnés, approche bienveillante et suivi personnalisé pour santé et bien-être optimal de vos compagnons.",
    phoneKey: "veterinary_clinic_phone",
    emailKey: "veterinary_clinic_email",
    webKey: "veterinary_clinic_web",
    phone: "03 87 45 67 89",
    email: "contact@clinique-veterinaire.fr",
    web: "www.clinique-veterinaire.fr",
    addressKey: "veterinary_clinic_address",
    address: {
      city: "Metz",
      country: "France",
      street: "24 Rue des Animaux",
      zipCode: "57000"
    },
    category: "veterinary",
    likes: 0,
    views: 0,
    image: {
      url: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400",
      alt: "Veterinary clinic"
    },
    createdAt: "2024-02-02T08:45:00.000Z"
  },
  {
    _id: "20",
    titleKey: "security_company",
    subtitleKey: "security_company",
    descriptionKey: "security_company",
    title: "Société Sécurité Professionnelle",
    subtitle: "Sécurité & Surveillance Avancée",
    description: "Société de sécurité professionnelle offrant solutions complètes de protection et surveillance. Gardiennage, télésurveillance, systèmes d'alarme, vidéoprotection, sécurité événementielle et protection rapprochée. Agents certifiés, technologies de pointe et intervention rapide 24h/24 pour sécurité optimale de vos biens et personnes.",
    phoneKey: "security_company_phone",
    emailKey: "security_company_email",
    webKey: "security_company_web",
    phone: "04 42 67 89 01",
    email: "contact@securite-pro.fr",
    web: "www.securite-pro.fr",
    addressKey: "security_company_address",
    address: {
      city: "Aix-en-Provence",
      country: "France",
      street: "52 Boulevard de la Sécurité",
      zipCode: "13100"
    },
    category: "security",
    likes: 0,
    views: 0,
    image: {
      url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
      alt: "Security company"
    },
    createdAt: "2024-02-03T15:30:00.000Z"
  }
];

module.exports = { sampleCards };
