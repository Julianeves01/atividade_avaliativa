const express = require("express");
const router = express.Router();
const { generatePdfReportForAutores } = require("../controllers/autorController");
const apiKeyMiddleware = require("../middleware/apiKey"); 

// Rota para gerar o relatório de autor em PDF com validação de API Key
router.get("/relatorio/autores", apiKeyMiddleware, generatePdfReportForAutores);

module.exports = router;
