const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const minibarController = require('../controllers/minibarController');

// Get all minibar products
router.get('/', auth(['admin', 'recepcionista', 'suporte']), minibarController.getAllProdutos);

// Get product by id
router.get('/:id', auth(['admin', 'recepcionista', 'suporte']), minibarController.getProdutoById);

// Create new product
router.post('/', auth('admin'), minibarController.createProduto);

// Update product
router.put('/:id', auth('admin'), minibarController.updateProduto);

// Delete product
router.delete('/:id', auth('admin'), minibarController.deleteProduto);

// Record consumption for a room
router.post('/consume/:roomId/:productId', auth(['admin', 'recepcionista']), minibarController.consumeProduct);

// Replenish stock for a product
router.post('/restock/:productId', auth(['admin', 'recepcionista']), minibarController.restockProduct);

module.exports = router;
