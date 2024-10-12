import { Router } from "express";
import { login, logout, refresh } from "../controllers/auth";

const router = Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
