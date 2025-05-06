const PDFDocument = require("pdfkit");

/**
 * Função para gerar um relatório PDF.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {Array} data - Dados a serem incluídos no relatório.
 * @param {String} title - Título do relatório.
 */
const generatePdfReport = (res, data, title) => {
    try {
        const doc = new PDFDocument();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `inline; filename=${title.replace(/\s+/g, "_").toLowerCase()}.pdf`);

        doc.pipe(res);

        // Cabeçalho do relatório
        doc.fontSize(18).text(title, { align: "center" });
        doc.moveDown();

        // dados e gerar o conteúdo do relatório
        data.forEach((item, index) => {
            doc
                .fontSize(12)
                .text(`${index + 1}. Livro: ${item.titulo || "Não informado"}`)
                .text(`   Ano de Publicação: ${item.ano_publicacao || "Não informado"}`)
                .text(`   Autor: ${item.autor_nome || "Não informado"}`)
                .text(`   Nacionalidade do Autor: ${item.nacionalidade || "Não informada"}`)
                .moveDown();
        });

        doc.end();

        doc.on('error', (err) => {
            console.error("Erro ao gerar PDF:", err);
            if (!res.headersSent) {
                res.status(500).send("Erro ao gerar o PDF.");
            }
        });
    } catch (error) {
        console.error("Erro ao gerar relatório PDF:", error);
        res.status(500).json({ message: "Erro ao gerar relatório PDF." });
    }
};

module.exports = { generatePdfReport };