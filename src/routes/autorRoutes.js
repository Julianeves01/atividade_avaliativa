const express = require("express");
const router = express.Router();
const { generatePdfReportForAutores } = require("../controllers/autorController"); 
const controller = require("../controllers/autorController");
const apiKey = require("../middleware/apiKey");
const upload = require("../config/upload"); // Middleware para upload de arquivos


router.use(apiKey); // Middleware para verificar a chave da API

router.get("/", controller.getAllAutores);
router.get("/:id", controller.getAutor);
router.post("/", controller.createAutor);
router.post("/upload", upload.single("photo"), (req, res) => {
    res.json({ message: "Arquivo enviado com sucesso!", file: req.file });
});
router.put("/:id", controller.updateAutor);
router.delete("/:id", controller.deleteAutor);
router.get("/relatorio/pdf", generatePdfReportForAutores); 
module.exports = router;