import express from 'express';
import { postController } from './post.controllers';
import { authMiddleware } from '../../middlewares/authMiddleware';



const router = express.Router();

router.post('/create-post', authMiddleware("ADMIN", "USER"),postController.createPostController);
router.get('/all-posts', postController.getAllPostsController);
export const postRouter = router;
router.get('/:id', postController.getPostByIdController);