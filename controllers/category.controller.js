import Category from "../models/Category.js";


// Create Category for admin role only 
export async function createCategory(req, res) {
    try{
        const {name, description} = req.body;
        if(!name || !description){
            return res.status(400).json({message: "All Fields Required"});
        }

        const existing = await Category.findOne({name});
        if(existing) res.status(400).json({message: "Category with the name already exists"});

        const newCategory = await Category.create({name, description});
        res.status(200).json({newCategory});
    } catch(err){
        res.status(500).json({error: err});
    }
}

// Get all categories 

export async function listCategories(req, res) {
    try{
        const categories = await Category.find();
        res.json({categories});
    }catch(err){
        res.status(500).json({error: err});
    }
}