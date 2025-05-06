const express = require("express");
const router = express.Router();
const controller = require("../controllers/autorController");
const apiKey = require("../middleware/apiKey");

router.use(apiKey); // Middleware para verificar a chave da API

router.get("/", controller.getAllAutors);
router.get("/:id", controller.getAutor);
router.post("/", controller.createAutor);
router.put("/:id", controller.updateAutor); 
router.delete("/:id", controller.deleteAutor); 
router.get("/relatorio/pdf", controller.generatePdfReport);


module.exports = router;