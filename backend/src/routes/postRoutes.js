import express from 'express';
import { getAllPosts, createPost, deletePost, getPostsByCategory, getPostById, updatePost, getPostsByUser } from '../controllers/postController.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/category/:category', getPostsByCategory);
router.get('/user/:clerk_user_id', getPostsByUser);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
