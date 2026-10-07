import express from 'express';
import { commentController } from './comments.controllers';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = express.Router();



router.post('/create-comment', commentController.createCommentController);
router.get('/:id', commentController.getCommentByIdController);
router.get('/author/:authorId', commentController.getCommentsByAuthorIdController);
router.patch('/:id', commentController.updateCommentController);
router.delete('/:id', commentController.deleteCommentController);
router.patch('/status/:id', authMiddleware("ADMIN", "USER"), commentController.commentStatusUpdateController);
router.delete('/delete/:id', authMiddleware("ADMIN", "USER"), commentController.deleteCommentController);



export const commentsRouter = router;