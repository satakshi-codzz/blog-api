import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router;
