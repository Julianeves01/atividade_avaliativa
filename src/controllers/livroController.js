const livroModel = require("../models/livroModel");
const autorModel = require("../models/autorModel");

const createLivro = async (req, res) => {
    try {
        console.log("Dados recebidos:", req.body); // Log dos dados recebidos
        const { titulo, ano_publicacao, id_autor } = req.body;

        if (!titulo) {
            return res.status(400).json({ error: "O campo 'titulo' é obrigatório." });
        }
        if (!ano_publicacao) {
            return res.status(400).json({ error: "O campo 'ano_publicacao' é obrigatório." });
        }
        if (!id_autor) {
            return res.status(400).json({ error: "O campo 'id_autor' é obrigatório." });
        }

        // Verificar se o autor existe
        const autorExiste = await autorModel.getAutorById(id_autor);
        if (!autorExiste) {
            return res.status(404).json({ error: "Autor não encontrado." });
        }

        const novoLivro = await livroModel.createLivro({ titulo, ano_publicacao, id_autor });
        console.log("Livro criado:", novoLivro); // Log do livro criado

        res.status(201).json({
            message: "Livro criado com sucesso!",
            livro: novoLivro
        });
    } catch (error) {
        console.error("Erro ao criar livro:", error); // Log do erro
        res.status(500).json({ error: "Erro ao criar livro." });
    }
};

const getAllLivros = async (req, res) => {
    try {
        const livros = await livroModel.getLivros();
        res.status(200).json(livros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar livros." });
    }
};

const getLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const livro = await livroModel.getLivroById(id);

        if (!livro) {
            return res.status(404).json({ message: "Livro não encontrado." });
        }

        res.status(200).json(livro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar livro." });
    }
};

const updateLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, ano_publicacao, id_autor } = req.body;

        if (!titulo || !ano_publicacao || !id_autor) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const livroAtualizado = await livroModel.updateLivro(id, { titulo, ano_publicacao, id_autor });

        if (!livroAtualizado) {
            return res.status(404).json({ message: "Livro não encontrado." });
        }

        res.status(200).json({
            message: "Livro atualizado com sucesso!",
            livro: livroAtualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar livro." });
    }
};

const deleteLivro = async (req, res) => {
    try {
        const { id } = req.params;

        const livroExcluido = await livroModel.deleteLivro(id);

        if (!livroExcluido) {
            return res.status(404).json({ message: "Livro não encontrado." });
        }

        res.status(200).json({
            message: "Livro excluído com sucesso!",
            livro: livroExcluido
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao excluir livro." });
    }
};

module.exports = { createLivro, getAllLivros, getLivro, updateLivro, deleteLivro };