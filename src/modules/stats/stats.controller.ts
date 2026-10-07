import { Request, Response } from "express";
import { controllerWrapper } from "../../helpers/controllerWrapper";
import { statsService } from "./stats.service";



const getStatsController = controllerWrapper(async (req:Request, res: Response)=>{
    const stats = await statsService.getStatsService();
    return res.status(200).json(stats);
})



export const statsController = {
    getStatsController
}