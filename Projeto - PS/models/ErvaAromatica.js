const mongoose = require('mongoose');

const ervaAromaticaSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true }, // Ex: Manjericão
    especie: { type: String, required: true }, // Ex: Ocimum basilicum
    descricao: { type: String },
    dataRegisto: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ErvaAromatica', ervaAromaticaSchema);