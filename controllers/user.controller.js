import Post from "../models/Post.js";
import User from "../models/User.js";


export async function getUserProfile(req,res) {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        const posts = await Post.find({author: user._id}).select("title createdAt");
        res.json({user, posts});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}