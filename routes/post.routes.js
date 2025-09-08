import { Router } from "express";
import multer from "multer";
import { createPost, getPosts, getPost, updatePosts, deletePost } from "../controllers/post.controller.js";
import auth from "../middleware/auth.js";

const router = Router();
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({storage});

router.post("/", auth, upload.single("image"), createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/:id", auth, upload.single("image"), updatePosts);
router.delete("/:id", auth, deletePost);

export default router;
