import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", authController.userSignup);
router.post("/login", authController.userLogin);
router.get("/current-user", authMiddleware, authController.activeUser);

export default router;