const pool = require("../config/database");

const getLivros = async () => {
    const query = `SELECT * FROM livros`;
    const result = await pool.query(query);
    return result.rows;
};

const getLivroById = async (id_livro) => {
    const query = `SELECT * FROM livros WHERE id_livro = $1`;
    const result = await pool.query(query, [id_livro]);
    return result.rows[0];
};

const createLivro = async ({ titulo, ano_publicacao, id_autor }) => {
    const query = `
        INSERT INTO livros (titulo, ano_publicacao, id_autor)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [titulo, ano_publicacao, id_autor];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const updateLivro = async (id_livro, { titulo, ano_publicacao, id_autor }) => {
    const query = `
        UPDATE livros
        SET titulo = $1, ano_publicacao = $2, id_autor = $3
        WHERE id_livro = $4
        RETURNING *;
    `;
    const values = [titulo, ano_publicacao, id_autor, id_livro];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const deleteLivro = async (id_livro) => {
    const query = `
        DELETE FROM livros
        WHERE id_livro = $1
        RETURNING *;
    `;
    const result = await pool.query(query, [id_livro]);
    return result.rows[0];
};

module.exports = { createLivro, getLivros, getLivroById, updateLivro, deleteLivro };