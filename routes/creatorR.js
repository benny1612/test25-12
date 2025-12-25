import express from "express";



import { userValdiet } from "../middlewares/Middleware.js";
import { CreateEvent } from "../controllers/creatorC.js";

const router = express.Router();
router.post("/events",userValdiet,CreateEvent);






export default router;
