import express from 'express';
import { 
  getAllUsers, 
  getUserById, 
  updateUser, 
  changeUserRole, 
  deleteUser 
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/requireRole.js';

const router = express.Router();

// Routes protégées
router.get('/', protect, requireRole('admin'), getAllUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.patch('/:id/role', protect, requireRole('admin'), changeUserRole);
router.delete('/:id', protect, requireRole('admin'), deleteUser);

export default router;
