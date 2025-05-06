const express = require("express");
const router = express.Router();
const Controller = require("../controllers/livroController");

// Rotas de livros
router.get("/", Controller.getAllLivros); 
router.get("/:id", Controller.getLivro); 
router.post("/", Controller.createLivro);
router.put("/:id", Controller.updateLivro); 
router.delete("/:id", Controller.deleteLivro); 

module.exports = router;