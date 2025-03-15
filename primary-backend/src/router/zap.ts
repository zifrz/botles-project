import { Router } from "express";
import { authMiddleware } from "../middleware";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
    console.log("Create Zap")
})

router.get("/", authMiddleware, async (req, res) => {
    console.log("Zaps Handler")
})

router.get("/:zapId", authMiddleware, async (req, res) => {
    console.log("Get specific Zap")
})

export const zapRouter = router;