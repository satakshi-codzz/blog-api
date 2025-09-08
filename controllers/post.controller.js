import Post from "../models/Post.js";

// Create Post 
export async function createPost(req, res) {
    try {
        const { title, content, categories } = req.body;
        const image = req.file ? req.file.filename : null;

        const post = await Post.create({
            title,
            content,
            categories,
            image,
            author: req.user.id
        });
        res.status(200).json({ post });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get all posts 
export async function getPosts(req, res) {
    try{
        const posts = await Post.find()
        .populate("author", "username email")
        .populate("categories", "name");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// Get Single Post by Id 
export async function getPost(req, res) {
    try{
        const post = await Post.findById(req.params.id)
        .populate("author", "username email")
        .populate("categories", "name");

        if(!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// Update Post  
export async function updatePosts(req, res) {
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({ message: "Post not found" });

        // only author can edit 
        if(post.author.toString() !== req.user.id){
           return res.status(404).json({ message: "Not allowed" });  
        }

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        post.categories = req.body.categories || post.categories;
        if(req.file) post.image = req.file.filename;

        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// Delete Post 
export async function deletePost (req, res) {
    try{
        const post = await Post.findById(req.params.id);
        if(!Post) return res.status(404).json({message: "Post Not Found"});

        if(post.author.toString() !== req.user.id){
            return res.status(404).json({message: "Not allowed"});
        }

        await post.deleteOne();
        res.json({message: "Post Deleted"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}