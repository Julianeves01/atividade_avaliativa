const express = require("express");
const router = express.Router();
const livroController = require("../controllers/livroController");
const apiKey = require("../middleware/apiKey");

router.use(apiKey); // Middleware para verificar a chave da API

// Rotas de livros
router.get("/", livroController.getAlllivros); 
router.get("/:id", livroController.getlivro); 
router.post("/", livroController.createlivro); 
router.put("/:id", livroController.updatelivro); 
router.delete("/:id", livroController.deletelivro); 

module.exports = router;