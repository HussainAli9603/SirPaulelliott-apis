import express from 'express';
import { body } from 'express-validator';
import validateRequest from '../middlewares/validateRequest.js';
import { signUp, verifyEmail } from '../controllers/userController.js';

const router = express.Router();

// User Sign-Up
router.post('/signup', [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('country').notEmpty().withMessage('Country is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], validateRequest, signUp);

// Email Verification
router.get('/verify/:token', verifyEmail);

export default router;
