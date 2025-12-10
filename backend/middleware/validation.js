// validation simple des données

const validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ message: 'Le nom doit faire au moins 2 caractères' });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Email invalide' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Le mot de passe doit faire au moins 6 caractères' });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }

  next();
};

const validateCard = (req, res, next) => {
  const { title, email } = req.body;

  if (!title || title.trim().length < 1) {
    return res.status(400).json({ message: 'Le nom est requis' });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Email valide requis' });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateCard
};
