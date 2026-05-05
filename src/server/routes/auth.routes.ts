import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/auth.controller.ts';
import { protect } from '../middleware/auth.middleware.ts';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUserProfile);

export default router;
