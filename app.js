const express = require("express");
const bodyParser = require("body-parser");

const todoRouter = require("./Routes/todoRouter");
const userRouter = require("./Routes/userRouter");

const app = express();
app.use(bodyParser.json());

app.use("/todos", todoRouter);
app.use("/users", userRouter);

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
