const pool = require("../config/database");
const db = require("../config/database");

const getAutores = async (filtroNome) => {
    let query = `SELECT * FROM autores`;
    let params = [];

    if (filtroNome) {
        query += " WHERE LOWER(nome) LIKE $1";
        params.push(`%${filtroNome.toLowerCase()}%`);
    }

    const result = await pool.query(query, params);
    return result.rows;
    
};

const getAutorById = async (id_autor) => {
    const query = `SELECT * FROM autores WHERE id_autor = $1`;
    const result = await pool.query(query, [id_autor]);
    return result.rows[0];
};

const createAutor = async ({ nome, nacionalidade }) => {
    const query = `
        INSERT INTO autores (nome, nacionalidade)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const values = [nome, nacionalidade];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const updateAutor = async (id_autor, { nome, nacionalidade }) => {
    const query = `
        UPDATE autores
        SET nome = $1, nacionalidade = $2
        WHERE id_autor = $3
        RETURNING *;
    `;
    const values = [nome, nacionalidade, id_autor];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const deleteAutor = async (id_autor) => {
    const query = `
        DELETE FROM autores
        WHERE id_autor = $1
        RETURNING *;
    `;
    const result = await pool.query(query, [id_autor]);
    return result.rows[0];
};

const getAutoresComLivros = async () => {
    const query = `
        SELECT autores.*, livros.*
        FROM autores
        LEFT JOIN livros ON autores.id_autor = livros.id_autor
    `;
    const result = await pool.query(query);
    return result.rows;
};

module.exports = { 
    getAutores, 
    getAutorById, 
    createAutor, 
    updateAutor, 
    deleteAutor, 
    getAutoresComLivros 
};