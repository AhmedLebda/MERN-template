import { Router } from "express";
import userController from "../controllers/userControllers.mjs";

const router = Router();

router.post("/login", userController.user_login);

router.post("/signup", userController.user_create);

export default router;
