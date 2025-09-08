import Comment from "../models/Comment.js";

// Add Comment 
export async function addComment(req, res) {
    try{
        const {content} = req.body;
        const {postId} = req.params;
        if(!content) return res.status(401).json({message : "Please add content"});

        const newComment = await Comment.create({
            content,
            author: req.user.id,
            post: postId
        });
        res.json(newComment);
    }catch (err){
        res.status(500).json({error: err});
    }
}

// Get Comments for a post
export async function getComments(req, res) {
    try{
        const { postId } = req.params;
        const comments = await Comment.find({post: postId})
        .populate("author", "username email");
        res.json(comments);
    }catch (err){
        res.status(500).json({error: err});
    }
}

// Update Comments 
export async function updateComment(req, res) {
    try{
        const comment = await Comment.findById(req.params.id);
        if(!comment) return res.status(404).json({message: "Not comment found"});

        if(comment.author.toString() !== req.user.id){
            return res.status(404).json({message: "Not allowed"});
        }

        comment.content = req.body.content || comment.content;
        await comment.save();
        res.json(comment);
    }catch (err){
        res.status(500).json({error: err});
    }
}

export async function deleteComment(req, res) {
    try{
        const comment = await Comment.findById(req.params.id);
        if(!comment) return res.status(404).json({message: "Not comment found"});

        if(comment.author.toString() !== req.user.id){
            return res.status(404).json({message: "Not allowed"});
        }

        await comment.deleteOne();
       res.status(200).json({message: "Record Deleted"})
    }catch (err){
        res.status(500).json({error: err});
    }
}
