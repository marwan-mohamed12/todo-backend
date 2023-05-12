const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const postRouter = express.Router();
postRouter.use(express.json());

// Create a new post
postRouter.post("/", async (req, res) => {
    const { name, isChecked, userId } = req.body;
    const post = await prisma.Todo.create({
        data: {
            name,
            isChecked,
            userId,
        },
    });
    res.json(post);
});

// // Get all posts
// postRouter.get("/", async (req, res) => {
//     const posts = await prisma.Post.findMany();
//     res.json(posts);
// });

// // Get a single post
// postRouter.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     const post = await prisma.Post.findUnique({
//         where: {
//             id: parseInt(id),
//         },
//     });
//     res.json(post);
// });

// // Update a post
// postRouter.put("/:id", async (req, res) => {
//     const { id } = req.params;
//     const { title, content } = req.body;
//     const post = await prisma.Post.update({
//         where: {
//             id: parseInt(id),
//         },
//         data: {
//             title,
//             content,
//         },
//     });
//     res.json(post);
// });

// // Delete a post
// postRouter.delete("/:id", async (req, res) => {
//     const { id } = req.params;
//     const post = await prisma.Post.delete({
//         where: {
//             id: parseInt(id),
//         },
//     });
//     res.json(post);
// });

module.exports = postRouter;
