import { Router } from "express";
import { authMiddleware } from "../middleware";

const router = Router();

router.post("/signup", async (req, res) => {
    console.log("Sign Up Handler")
})

router.post("/signin", async (req, res) => {
    console.log("Sign In Handler")
})

router.get("/user", authMiddleware, async (req, res) => {
    console.log("User Info")
})

export const userRouter = router;