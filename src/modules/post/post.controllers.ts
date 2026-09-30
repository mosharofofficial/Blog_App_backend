import { Request, Response } from "express";
import { postService } from "./post.services";





 const createPostController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const post = await postService.createPostService(data);
        return res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({ error: "Error creating post" });
    }
};


const getAllPostsController = async (req: Request, res: Response) => {
    try {
        
        const { search, tags, isFeatured } = req.query;
        const searchStr = typeof search === 'string' ? search : undefined;
        const tagsArray = typeof tags === 'string' ? tags.split(',') : [];
        const isFeaturedBool = isFeatured === 'true' ? true : isFeatured === 'false' ? false : undefined;
        const posts = await postService.getAllPostsService(searchStr, tagsArray, isFeaturedBool);
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching posts" });
    }
};

export const postController = {
    createPostController,
    getAllPostsController
};