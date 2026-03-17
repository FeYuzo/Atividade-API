import  {Router, Request, Response} from "express";
import { Filme } from "../models/filme";

const router = Router();

let filmes: Filme[] = [
    {id: 1, titulo: "Velozes e Furiosos", concluida: false},
    {id: 2, titulo: "Interestelar", concluida: false}
];

router.get("/", (req: Request, res: Response) =>{
    res.json(filmes);
});

router.get("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const filme = filmes.find(t => t.id == id);

    if(!filme) {
        return res.status(404).json({erro: "Filme não encontrado"});
    }

    res.json(filme);
});

router.post("/", (req: Request, res: Response) => {
    const {titulo} = req.body;

    const novoFilme: Filme = {
        id: filmes.length + 1,
        titulo: titulo,
        concluida: false
    }

    filmes.push(novoFilme);
    res.status(201).json(novoFilme);
});

router.put("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const filme = filmes.find(t => t.id == id);

    if(!filme) {
        return res.status(404).json({erro : "Filme não encontrado"});
    }

    const {titulo, concluido} = req.body;

    filme.titulo = titulo ?? filme.titulo,
    filme.concluida = concluido ?? filme.concluida

    res.json(filme);
});

router.delete("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    filmes = filmes.filter(t => t.id !== id);

    res.json({
        mensagem: "Filme Removido"
    });
});

export default router;