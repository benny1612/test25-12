import express from "express";

import {addNewUser, BuyTickets, UserPurchaseSummary} from "../controllers/usersC.js";
import { FirstuserValdiet, userValdiet } from "../middlewares/Middleware.js";

const router = express.Router();
router.post("/register",FirstuserValdiet,addNewUser);
router.post("/tickets/buy",userValdiet,BuyTickets);
router.get("/:username/summary",UserPurchaseSummary);

export default router;