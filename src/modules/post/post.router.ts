import express from 'express';
import { postController } from './post.controllers';
import { authMiddleware } from '../../middlewares/authMiddleware';



const router = express.Router();

router.post('/create-post', authMiddleware("ADMIN", "USER"),postController.createPostController);
router.get('/all-posts', postController.getAllPostsController);
router.get('/:id', postController.getPostByIdController);
router.get('/my-posts', authMiddleware("USER"), postController.getUserOwnedPostsController);


export const postRouter = router;