import express from 'express';



const router = express.Router();

router.post('/create-post', (req, res) => {
  // Handle creating a new post
  res.send('Post created');
});

export const postRouter = router;