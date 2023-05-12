const express = require("express");
const bodyParser = require("body-parser");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userRouter = express.Router();
userRouter.use(bodyParser.json());

// Create a new user
userRouter.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const user = await prisma.User.create({
        data: {
            name,
            email,
            password,
        },
    });
    res.json(user);
});

// Get all users
userRouter.get("/", async (req, res) => {
    const users = await prisma.User.findMany({});
    res.json(users);
});

// Get a single user
userRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await prisma.User.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    res.json(user);
});

module.exports = userRouter;
