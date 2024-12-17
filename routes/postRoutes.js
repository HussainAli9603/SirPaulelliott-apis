import express from 'express';
import { body } from 'express-validator';
import validateRequest from '../middlewares/validateRequest.js';
import {
  createPost,
  editPost,
  deletePost,
  addComment
} from '../controllers/postController.js';

const router = express.Router();

// Create a Post
router.post('/', [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
], validateRequest, createPost);

// Edit a Post
router.put('/:id', [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
], validateRequest, editPost);

// Delete a Post
router.delete('/:id', deletePost);

// Add a Comment
router.post('/:id/comments', [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('comment').notEmpty().withMessage('Comment is required'),
], validateRequest, addComment);

export default router;
