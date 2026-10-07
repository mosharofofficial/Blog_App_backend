import { Request, Response } from "express";
import { postService } from "./post.services";
import { controllerWrapper } from "../../helpers/controllerWrapper";





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


        const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 5;
        
        const sortBy = req.query.sortBy ? req.query.sortBy as string : undefined;
        const sortOrder = req.query.sortOrder ? req.query.sortOrder as string : undefined;
        
        const posts = await postService.getAllPostsService(searchStr, tagsArray, isFeaturedBool, page, limit, sortBy, sortOrder);
        
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching posts" });
    }
};

const getPostByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Post ID is required" });
        }
        const post = await postService.getPostByIdService(id as string);
        return res.status(200).json(post);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error fetching post" });
    }
};

const getUserOwnedPostsController = controllerWrapper(async(req: Request, res: Response)=>{
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 5;
    const userId = req.user?.id;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }
    const posts = await postService.getUserOwnedPostsService(userId, page, limit);
    return res.status(200).json(posts);
})

export const postController = {
    createPostController,
    getAllPostsController,
    getPostByIdController,
    getUserOwnedPostsController
};