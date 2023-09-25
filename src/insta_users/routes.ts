import { Router } from 'express';
import controller  from './controller';

const router = Router();

router.get('/',controller.getUsers)

export default { router };