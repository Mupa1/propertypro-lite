import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/users/signup/', UserController.signUp);
router.post('/users/signin/', UserController.signIn);

export default router;
