import fs from "fs";
import { criarPost, getTodosPosts } from "../models/postsModel.js";

export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
}

export async function salvarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(201).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"falha na requisição"});
    }
};

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        
        const postCriado = await criarPost(novoPost);
        //const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        //fs.renameSync(req.file.path, imagemAtualizada);
        res.status(201).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"falha na requisição"});
    }
};