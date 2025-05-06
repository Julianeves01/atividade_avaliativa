const PDFDocument = require("pdfkit");

/**
 * Função para gerar um relatório PDF.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {Array} data - Dados a serem incluídos no relatório.
 * @param {String} title - Título do relatório.
 */
const generatePdfReport = (res, data, title) => {
    const doc = new PDFDocument();

    // Configuração do cabeçalho da resposta
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    // Título do relatório
    doc.rect(50, 50, 500, 30) 
        .fill("#D3D3D3") 
        .stroke();
    doc.fillColor("#FF69B4") 
        .fontSize(16)
        .text(title, 55, 55, { align: "center" }); 
    doc.moveDown(2);

    // Dados do relatório
    data.forEach((item) => {
        doc.fillColor("black")
            .fontSize(12)
            .text(`Nome: ${item.nome}`);
        doc.text(`Nacionalidade: ${item.nacionalidade}`);
        doc.moveDown();
    });

    // Finalização do documento
    doc.end();
};

module.exports = { generatePdfReport };