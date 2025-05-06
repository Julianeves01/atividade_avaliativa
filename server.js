require("dotenv").config();
const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const autorRoutes = require("./src/routes/autorRoutes");
const livroRoutes = require("./src/routes/livroRoutes");

app.use(cors());
app.use(express.json()); // Middleware para processar JSON

// Rotas
app.use("/api/autor", autorRoutes);
app.use("/api/livro", livroRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🎀 Servidor rodando em http://localhost:${PORT}`);
});