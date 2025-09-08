import { Router } from "express";
import { createCategory, listCategories } from "../controllers/category.controller.js";
import { requireRole } from "../middleware/roles.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/", auth, requireRole("admin"), createCategory);
router.get("/", listCategories);

export default router;
