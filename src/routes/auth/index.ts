import express from 'express';
import registerController from '../../controllers/registerController';
import signinController from '../../controllers/signinController';
import refreshAccessTokenController from '../../controllers/refreshAccessToken';

const router = express.Router();

router.post('/register', registerController);

router.post('/signin', signinController);

router.get('/refreshtoken', refreshAccessTokenController);

export default router;