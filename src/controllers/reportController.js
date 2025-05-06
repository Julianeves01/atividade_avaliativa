const PDFDocument = require("pdfkit");

/**
 * Função para gerar um relatório PDF.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {Array} data - Dados a serem incluídos no relatório.
 * @param {String} title - Título do relatório.
 */
const generatePdfReport = (res, data, title) => {
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    doc.fontSize(16).text(title, { align: "center" });
    doc.moveDown();

    data.forEach((item) => {
        doc.fontSize(12).text(`Nome: ${item.nome}`);
        doc.text(`Nacionalidade: ${item.nacionalidade}`);
        doc.moveDown();
    });

    doc.end();
};

module.exports = { generatePdfReport };