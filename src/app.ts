import express from "express";

const app: express.Application = express();


app.use(express.json());
// Define your routes here


app.get("/", (req, res) => {
    res.send("Welcome to the Blog API!");
});

export default app;