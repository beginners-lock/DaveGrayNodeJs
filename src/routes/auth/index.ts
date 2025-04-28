import express from 'express';
import registerController from '../../controllers/registerController';
import signinController from '../../controllers/signinController';

const router = express.Router();

router.post('/register', registerController);

router.post('/signin', signinController);

export default router;