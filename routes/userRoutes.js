import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
  loginUser
} from '../services/userService.js';

const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'User Management System' }));

router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);
router.post('/users', createUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.get('/search', searchUsers);
router.post('/login', loginUser);

export default router;
