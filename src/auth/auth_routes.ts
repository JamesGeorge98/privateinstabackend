import { Router } from 'express';
import  SignUpController  from './controllers/sign_up_controller'
import  SignInController  from './controllers/sign_in_controller'
import { Validator } from '../utils/validations'; // Adjust the import path as needed
import  { uploadFile }  from '../utils/multer';


const router = Router();

router.get('/:username',SignUpController.SignUpController.isUserNameAvaliable);
router.post('/signup',Validator.signUpValidation,SignUpController.SignUpController.signUpUser);
router.post('/signin',Validator.signInValidation,SignInController.SignInController.signInUser);
router.post('/uploadProfileImage', uploadFile.single('image'),SignUpController.SignUpController.uploadProfileImage);

export default { router };