import express from 'express';
import { userRegisterController } from '../../controllers/registerController';

const router = express.Router();

router.post('/register', userRegisterController);

export default router;