import { Router } from "express";
import {addComment, getComments, updateComment, deleteComment} from "../controllers/comment.controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/:postId", auth, addComment);
router.get("/:postId", getComments);
router.put("/:id", auth, updateComment);
router.delete("/:id", auth, deleteComment);

export default router;