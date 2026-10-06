import express from 'express';
import { commentController } from './comments.controllers';

const router = express.Router();



router.post('/create-comment', commentController.createCommentController);
router.get('/:id', commentController.getCommentByIdController);
router.get('/author/:authorId', commentController.getCommentsByAuthorIdController);
router.patch('/:id', commentController.updateCommentController);

export const commentsRouter = router;