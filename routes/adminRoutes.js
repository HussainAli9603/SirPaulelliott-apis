import express from 'express';
import { body } from 'express-validator';
import validateRequest from '../middlewares/validateRequest.js';
import { addAdmin } from '../controllers/adminController.js';

const router = express.Router();

// Add a New Admin
router.post('/add-admin', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], validateRequest, addAdmin);

export default router;
