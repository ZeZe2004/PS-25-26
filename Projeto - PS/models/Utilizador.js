const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const utilizadorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    perfil: { 
        type: String, 
        enum: ['Técnico', 'Responsável', 'Administrador'], 
        required: true 
    }
});

// Encriptar a password antes de guardar na base de dados (Versão atualizada sem o next)
utilizadorSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar a password no momento do login
utilizadorSchema.methods.compararPassword = async function(passwordCandidata) {
    return await bcrypt.compare(passwordCandidata, this.password);
};

module.exports = mongoose.model('Utilizador', utilizadorSchema);