import express from "express";
import { postRouter } from "./modules/post/post.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";

const app: express.Application = express();


app.use(cors({
    origin: process.env.NODE_ENV === "development" ? "*" : process.env.APP_URL,
    credentials: true,
}));
app.use(express.json());
app.all('/api/auth/{*any}', toNodeHandler(auth));

// Define your routes here

app.get("/", (req, res) => {
    res.send("Welcome to the Blog API!");
});

app.use("/posts", postRouter);


export default app;