import jwt from "jsonwebtoken";

export default function auth(req, res, next){
    try{
        const token = req.header("Authorization")?.split(" ")[1];
        if(!token) return res.status(401).json({message: "Token not found"});
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch(err){
        res.status(500).json({error, err});
    }
}