import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Obtenir tous les utilisateurs (admin uniquement)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des utilisateurs'
    });
  }
};

// Obtenir un utilisateur par ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'utilisateur'
    });
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, phone, address } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Vérifier que l'utilisateur modifie son propre profil ou est admin
    if (req.user.id !== user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé'
      });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    await user.save();

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour'
    });
  }
};

// Changer le rôle d'un utilisateur (admin uniquement)
export const changeUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['user', 'business', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Rôle invalide'
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    user.role = role;
    user.isBusiness = role === 'business';
    user.isAdmin = role === 'admin';
    
    await user.save();

    res.json({
      success: true,
      message: 'Rôle mis à jour',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors du changement de rôle'
    });
  }
};

// Supprimer un utilisateur (admin uniquement)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Utilisateur supprimé'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression'
    });
  }
};
