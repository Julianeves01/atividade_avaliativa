CREATE DATABASE biblioteca;
\c biblioteca;

CREATE TABLE autores (
    id_autor SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    nacionalidade VARCHAR(100)
);

CREATE TABLE livros (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    ano_publicacao INT NOT NULL,
    id_autor INT,
    FOREIGN KEY (id_autor) REFERENCES autores(id_autor)
);

INSERT INTO autores (nome, nacionalidade) VALUES
('Ilana Casoy', 'Brasileira'),
('Jeneva Rose', 'Americana'),
(' Roy Wenzl', 'Americano');

INSERT INTO livros (titulo, ano_publicacao, id_autor) VALUES
('Casos De Família - Arquivos Richthofen E Arquivos Nardoni', 2016, 1),
('Casamento Perfeito ', 2024, 2),
('BTK Profile: Máscara da Maldade', 2019, 3);