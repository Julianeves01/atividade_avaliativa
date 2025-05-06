const express = require("express");
const router = express.Router();
const { generatePdfReportForAutores } = require("../controllers/autorController");
const apiKeyMiddleware = require("../middleware/apiKey");

// Rota para gerar o relatório de autores em PDF
router.get("/relatorio/autores", apiKeyMiddleware, generatePdfReportForAutores);

module.exports = router;