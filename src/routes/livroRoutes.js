const express = require("express");
const router = express.Router();
const Controller = require("../controllers/livroController");
const upload = require("../config/upload");

// Rotas de livros
router.get("/", Controller.getAllLivros); 
router.get("/:id", Controller.getLivro); 
router.post("/", Controller.createLivro);
router.post("/upload", upload.single("photo"), (req, res) => {
    res.json({ message: "Arquivo enviado com sucesso!", file: req.file });
});

router.put("/:id", Controller.updateLivro); 
router.delete("/:id", Controller.deleteLivro); 

module.exports = router;