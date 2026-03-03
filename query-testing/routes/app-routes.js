import express from "express";
import { CreateUser } from "../controller/Auth-Controller.js";


const router = express.Router();
router.post("/post", CreateUser);

export default router;
