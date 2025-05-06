const express = require("express");
const router = express.Router();
const livroController = require("../controllers/livroController");
const apiKey = require("../middleware/apiKey");

router.use(apiKey); // Middleware para verificar a chave da API

// Rotas de livros
router.get("/", livroController.getAllLivros); 
router.get("/:id", livroController.getLivro); 
router.post("/", livroController.createLivro); 
router.put("/:id", livroController.updateLivro); 
router.delete("/:id", livroController.deleteLivro); 

module.exports = router;