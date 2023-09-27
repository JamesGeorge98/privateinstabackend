import { Router } from 'express';
import  SignUpController  from './controllers/sign_up_controller'
import  SignInController  from './controllers/sign_in_controller'

const router = Router();

const signUpController = new SignUpController.SignUpController();
const signInController = new SignInController.SignInController;

router.get('/:username',signUpController.isUserNameAvaliable);
router.post('/signup',signUpController.signUpUser);
router.post('/signin',signInController.signInUser);

export default { router };