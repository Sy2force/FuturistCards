// Enhanced validation with security checks

const sanitizeString = (str) => {
  return str ? str.trim().replace(/<[^>]*>?/gm, '') : '';
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isStrongPassword = (password) => {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return strongPasswordRegex.test(password);
};

const validateRegistration = (req, res, next) => {
  const { firstName, lastName, name, email, password, role } = req.body;

  // Combine firstName and lastName or use name
  const fullName = name || `${firstName} ${lastName}`.trim();
  
  // Sanitize inputs
  const sanitizedName = sanitizeString(fullName);
  const sanitizedEmail = sanitizeString(email);

  if (!sanitizedName || sanitizedName.length < 2 || sanitizedName.length > 100) {
    return res.status(400).json({ message: 'Le nom doit faire entre 2 et 100 caractères' });
  }

  if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
    return res.status(400).json({ message: 'Format d\'email invalide' });
  }

  if (!password || !isStrongPassword(password)) {
    return res.status(400).json({ 
      message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre' 
    });
  }

  // Validate role if provided
  if (role && !['user', 'business', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Rôle invalide' });
  }

  // Update req.body with sanitized values
  req.body.name = sanitizedName;
  req.body.email = sanitizedEmail.toLowerCase();

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const sanitizedEmail = sanitizeString(email);

  if (!sanitizedEmail || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }

  if (!isValidEmail(sanitizedEmail)) {
    return res.status(400).json({ message: 'Format d\'email invalide' });
  }

  // Update req.body with sanitized email
  req.body.email = sanitizedEmail.toLowerCase();

  next();
};

const validateCard = (req, res, next) => {
  const { title, email, phone, website, address, company, description } = req.body;

  // Sanitize all string inputs
  const sanitizedTitle = sanitizeString(title);
  const sanitizedEmail = sanitizeString(email);
  const sanitizedPhone = sanitizeString(phone);
  const sanitizedWebsite = sanitizeString(website);
  const sanitizedAddress = sanitizeString(address);
  const sanitizedCompany = sanitizeString(company);
  const sanitizedDescription = sanitizeString(description);

  if (!sanitizedTitle || sanitizedTitle.length < 1 || sanitizedTitle.length > 200) {
    return res.status(400).json({ message: 'Le nom doit faire entre 1 et 200 caractères' });
  }

  if (sanitizedEmail && !isValidEmail(sanitizedEmail)) {
    return res.status(400).json({ message: 'Format d\'email invalide' });
  }

  // Validate phone if provided
  if (sanitizedPhone && !/^[\d\s\-\+\(\)\.]{10,20}$/.test(sanitizedPhone)) {
    return res.status(400).json({ message: 'Format de téléphone invalide' });
  }

  // Validate website if provided
  if (sanitizedWebsite && !sanitizedWebsite.match(/^https?:\/\/.+/)) {
    return res.status(400).json({ message: 'L\'URL du site web doit commencer par http:// ou https://' });
  }

  // Length limits for other fields
  if (sanitizedCompany && sanitizedCompany.length > 200) {
    return res.status(400).json({ message: 'Le nom de l\'entreprise ne peut pas dépasser 200 caractères' });
  }

  if (sanitizedAddress && sanitizedAddress.length > 500) {
    return res.status(400).json({ message: 'L\'adresse ne peut pas dépasser 500 caractères' });
  }

  if (sanitizedDescription && sanitizedDescription.length > 1000) {
    return res.status(400).json({ message: 'La description ne peut pas dépasser 1000 caractères' });
  }

  // Update req.body with sanitized values
  req.body.title = sanitizedTitle;
  req.body.email = sanitizedEmail ? sanitizedEmail.toLowerCase() : '';
  req.body.phone = sanitizedPhone || '';
  req.body.website = sanitizedWebsite || '';
  req.body.address = sanitizedAddress || '';
  req.body.company = sanitizedCompany || '';
  req.body.description = sanitizedDescription || '';

  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateCard
};
