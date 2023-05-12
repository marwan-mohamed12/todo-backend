const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const todoRouter = express.Router();
todoRouter.use(bodyParser.json());

// Create a Todo
todoRouter.post("/", async (req, res) => {
    const { name, isChecked, userId } = req.body;
    const todo = await prisma.Todo.create({
        data: {
            name,
            isChecked,
            user: { connect: { id: userId } },
        },
    });
    res.json(todo);
});

// Get all Todos
todoRouter.get("/", async (req, res) => {
    const { userId } = req.body;
    const todo = await prisma.Todo.findMany({
        where: {
            userId,
        },
    });
    res.json(todo);
});

// Get a single Todos
todoRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await prisma.Todo.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    res.json(todo);
});

// Update a Todos
todoRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, isChecked } = req.body;
    const todo = await prisma.Todo.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name,
            isChecked,
        },
    });
    res.json(todo);
});

// Clear Todo
todoRouter.delete("/clear", async (req, res) => {
    const todo = await prisma.Todo.deleteMany();
    res.json(todo);
});

// Delete a Todos
todoRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await prisma.Todo.delete({
        where: {
            id: parseInt(id),
        },
    });
    res.json(todo);
});

module.exports = todoRouter;
