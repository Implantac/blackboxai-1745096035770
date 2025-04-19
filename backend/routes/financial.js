const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const financialController = require('../controllers/financialController');

// Get all transactions
router.get('/transactions', auth(['admin', 'recepcionista', 'suporte']), financialController.getAllTransacoes);

// Get transaction by id
router.get('/transactions/:id', auth(['admin', 'recepcionista', 'suporte']), financialController.getTransacaoById);

// Create new transaction
router.post('/transactions', auth(['admin', 'recepcionista']), financialController.createTransacao);

// Update transaction
router.put('/transactions/:id', auth(['admin', 'recepcionista']), financialController.updateTransacao);

// Delete transaction
router.delete('/transactions/:id', auth(['admin']), financialController.deleteTransacao);

// Get cash flow summary
router.get('/cashflow', auth(['admin', 'recepcionista', 'suporte']), financialController.getCashFlow);

// TEF payment processing (stub)
router.post('/tef/payment', auth(['admin', 'recepcionista']), financialController.processTefPayment);

module.exports = router;
