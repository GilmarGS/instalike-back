import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

const posts = [
    {
        id: 1, descricao: "Foto teste", imagem: "https://placecats.com/millie/300/150"},
    {
        id: 2, descricao: "Paisagem incrível", imagem: "https://source.unsplash.com/random/300x200"
    },
];

async function getTodosPosts() {
    const db = conexao.db("imersao-instalikes");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
};

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando ...");
});

app.get("/posts", async (req, res) => {
    const posts = await getTodosPosts()
    res.status(200).json(posts);
});

function bucarPostPorId(id){
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
};

app.get("/posts/:id", (req, res) => {
    const index = bucarPostPorId(req.params.id);
    res.status(200).json(posts[index]);
});