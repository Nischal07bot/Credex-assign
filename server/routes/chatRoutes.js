import {Router} from 'express';
import * as ChatController from '../controllers/chatController.js';
import {body} from 'express-validator';
const router=Router();
router.post('/chat',[body('message').notEmpty().withMessage("message is required")],ChatController.chat);
export default router;

