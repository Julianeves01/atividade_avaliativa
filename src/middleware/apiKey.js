
const validApiKey = "JJavo2vIImk18VtDyoDm50pItAVO0Z";

module.exports = (req, res, next) => {
    const apiKey = req.header("x-api-key");
    console.log("API Key recebida:", apiKey); 
    if (apiKey === validApiKey) {
        next(); // Chave válida, prossiga
    } else {
        res.status(401).json({ error: "API Key inválida" }); 
    }
};