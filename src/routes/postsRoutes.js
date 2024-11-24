import express from "express";
import multer from "multer";
import { listarPosts, salvarNovoPost, uploadImagem } from "../controllers/postsController.js";

const upload = multer({dest: "./uploads"});

const routes = (app) => {
    app.use(express.json());
    app.get("/posts", listarPosts);
    app.post("/posts", salvarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);
};

export default routes;