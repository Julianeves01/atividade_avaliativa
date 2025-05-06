const PDFDocument = require("pdfkit"); // Importação do PDFKit
const autorModel = require('../models/autorModel');
const { generatePdfReport } = require("./reportController");

const getAllAutores = async (req, res) => {
    try {
        const nome = req.query.nome;
        const lista = await autorModel.getAutores(nome);
        res.json(lista);
    } catch (error) {
        console.error("Erro ao buscar autores:", error);
        res.status(500).json({ message: "Erro ao buscar autores." });
    }
};

const getAutor = async (req, res) => {
    try {
        const item = await autorModel.getAutorById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Autor não encontrado." });
        }
        res.json(item);
    } catch (error) {
        console.error("Erro ao buscar autor:", error);
        res.status(500).json({ message: "Erro ao buscar autor." });
    }
};

const createAutor = async (req, res) => {
    try {
        const { nome, nacionalidade } = req.body;

        if (!nome || !nacionalidade) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const novoAutor = await autorModel.createAutor({ nome, nacionalidade });

        res.status(201).json({
            message: "Autor criado com sucesso!",
            autor: novoAutor
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar autor." });
    }
};

const updateAutor = async (req, res) => {
    try {
        console.log("Corpo da requisição recebido:", req.body); // Log para depuração
        const { id } = req.params;
        const { nome, nacionalidade } = req.body;

        if (!nome || !nacionalidade) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const autorAtualizado = await autorModel.updateAutor(id, { nome, nacionalidade });

        if (!autorAtualizado) {
            return res.status(404).json({ message: "Autor não encontrado." });
        }

        res.status(200).json({
            message: "Autor atualizado com sucesso!",
            autor: autorAtualizado
        });
    } catch (error) {
        console.error("Erro ao atualizar autor:", error);
        res.status(500).json({ error: "Erro ao atualizar autor." });
    }
};

const deleteAutor = async (req, res) => {
    try {
        const { id } = req.params;

        console.log(`Tentando excluir autor com ID: ${id}`); 

        if (!id) {
            return res.status(400).json({ error: "ID do autor é obrigatório." });
        }

        const autorExcluido = await autorModel.deleteAutor(id);

        if (!autorExcluido) {
            console.warn(`Autor com ID ${id} não encontrado para exclusão.`); 
            return res.status(404).json({ message: "Autor não encontrado." });
        }

        console.log(`Autor com ID ${id} excluído com sucesso.`);

        res.status(200).json({
            message: "Autor excluído com sucesso!",
            autor: autorExcluido
        });
    } catch (error) {
        console.error("Erro ao excluir autor:", error); 
        res.status(500).json({ error: "Erro ao excluir autor." });
    }
};

const generatePdfReportForAutores = async (req, res) => {
    try {
        const autores = await autorModel.getAutores();

        const autoresTratados = autores.map((item) => {
            const nome = item.nome || "Não informado";
            const nacionalidade = item.nacionalidade || "Não informada";

            return { nome, nacionalidade };
        });

        generatePdfReport(res, autoresTratados, "Relatório de Autores");
    } catch (error) {
        console.error("Erro ao gerar relatório PDF:", error);
        res.status(500).json({ message: "Erro ao gerar relatório PDF." });
    }
};

module.exports = {
    getAllAutores,
    getAutor,
    createAutor,
    updateAutor,
    deleteAutor,
    generatePdfReportForAutores, 
};