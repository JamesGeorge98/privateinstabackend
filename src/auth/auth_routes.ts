import { Router } from 'express';
import  SignUpController  from './controllers/sign_up_controller'

const router = Router();

const signUpController = new SignUpController.SignUpController();

router.get('/:username',signUpController.isUserNameAvaliable);
router.post('/signup',signUpController.signUpUser);

export default { router };