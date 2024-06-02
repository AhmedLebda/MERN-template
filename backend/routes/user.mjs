import { Router } from "express";
import userController from "../controllers/userControllers.mjs";
import { requireAuth } from "../middlewares/auth/authMiddleware.mjs";

const router = Router();

router.post("/login", userController.login_post);

router.post("/signup", userController.signup_post);

//! Protected Routes
router.use(requireAuth);

router.get("/logout", userController.logout_get);

export default router;
