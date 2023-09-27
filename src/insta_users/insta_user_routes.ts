import { Router } from 'express';
import instausercontroller  from './insta_user_controller';

const router = Router();

const controller = new instausercontroller.InstaUserController();


// router.get('/:username',controller.getUsers)

router.get('/:username',controller.getUsers);

export default { router };