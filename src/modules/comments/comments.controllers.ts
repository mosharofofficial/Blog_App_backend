import { Request, Response } from "express";
import { controllerWrapper } from "../../helpers/controllerWrapper";
import { commentService } from "./comments.services";



const createCommentController = controllerWrapper(async (req:Request, res:Response) =>{
    const comment = await commentService.createCommentService(req.body);
    return res.status(201).json(comment);
})

const getCommentByIdController = controllerWrapper(async (req:Request, res:Response) =>{
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "bad request" });
    }
    const comment = await commentService.getCommentByIdService(id as string);
    return res.status(200).json(comment);
})

const getCommentsByAuthorIdController = controllerWrapper(async (req:Request, res:Response) =>{
    const { authorId } = req.params;
    if (!authorId) {
        return res.status(400).json({ error: "bad request" });
    }
    const comments = await commentService.getCommentsByAuthorIdService(authorId as string);
    return res.status(200).json(comments);
})


const updateCommentController = controllerWrapper(async (req:Request, res:Response) =>{
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "bad request" });
    }
    const updatedComment = await commentService.updateCommentService(id as string, req.body);
    return res.status(200).json(updatedComment);
})

export const commentController = {
    createCommentController,
    getCommentByIdController,
    getCommentsByAuthorIdController,
    updateCommentController
};