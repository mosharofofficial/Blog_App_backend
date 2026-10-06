import { NextFunction, Request, RequestHandler, Response } from "express"


export const controllerWrapper = (controller: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await controller(req, res, next);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error." })
        }
    }
}