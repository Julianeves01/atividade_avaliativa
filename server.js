require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const autorRoutes = require("./src/routes/autorRoutes");
const livroRoutes = require("./src/routes/livroRoutes");
const reportRoutes = require("./src/routes/reportRoutes")

app.use(cors());
app.use(express.json()); // Middleware para processar JSON

// Rotas
app.use("/api/autor", autorRoutes);
app.use("/api/livros", livroRoutes);
app.use("/api", reportRoutes); 
app.use("/autores", autorRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🎀 Servidor rodando na porta ${PORT}`);
});