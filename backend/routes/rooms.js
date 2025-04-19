const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roomsController = require('../controllers/roomsController');

// Get all rooms
router.get('/', auth(['admin', 'recepcionista', 'suporte']), roomsController.getAllRooms);

// Get room by id
router.get('/:id', auth(['admin', 'recepcionista', 'suporte']), roomsController.getRoomById);

// Create new room
router.post('/', auth('admin'), roomsController.createRoom);

// Update room
router.put('/:id', auth('admin'), roomsController.updateRoom);

// Delete room
router.delete('/:id', auth('admin'), roomsController.deleteRoom);

module.exports = router;
