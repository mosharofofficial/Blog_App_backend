import express from 'express';
import { statsController } from './stats.controller';

const router = express.Router();


router.get("/", statsController.getStatsController);


export const statsRouter = router;