const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const usersController = require('../controllers/usersController');

// User registration (admin only)
router.post('/register', auth('admin'), usersController.createUser);

// User login
router.post('/login', usersController.loginUser);

// Get all users (admin only)
router.get('/', auth('admin'), usersController.getAllUsers);

// Get user by id (admin only)
router.get('/:id', auth('admin'), usersController.getUserById);

// Update user (admin only)
router.put('/:id', auth('admin'), usersController.updateUser);

// Delete user (admin only)
router.delete('/:id', auth('admin'), usersController.deleteUser);

module.exports = router;
