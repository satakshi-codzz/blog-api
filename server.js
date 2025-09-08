import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import postRoutes from "./routes/post.routes.js";
import "dotenv/config";

const app = express();
app.use(express.json());

const { PORT, MONGO_URI } = process.env;

app.get("/", (req, res) => {
    res.send("The blog server is running");
});

app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/posts", postRoutes);
app.use("/uploads", express.static("uploads"));

mongoose.connect(MONGO_URI)
    .then(() => console.log("Mongodb is connected successfully"))
    .catch((err) => console.log("Error", err));

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
