require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Utilizador = require('./models/Utilizador');
const ErvaAromatica = require('./models/ErvaAromatica');

const app = express();
app.use(express.json()); // Permite receber JSON no body dos pedidos

// Ligar à Base de Dados MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Ligado ao MongoDB!'))
    .catch(err => console.error('Erro ao ligar ao MongoDB:', err));

// ==========================================
// ROTAS DE AUTENTICAÇÃO
// ==========================================

// Registar Utilizador
app.post('/api/auth/registar', async (req, res) => {
    try {
        const { nome, email, password, perfil } = req.body;
        const novoUtilizador = new Utilizador({ nome, email, password, perfil });
        await novoUtilizador.save();
        res.status(201).json({ mensagem: 'Utilizador criado com sucesso!' });
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
});

// Login e Geração de JWT
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const utilizador = await Utilizador.findOne({ email });
        if (!utilizador) return res.status(401).json({ erro: 'Credenciais inválidas' });

        const passwordCorreta = await utilizador.compararPassword(password);
        if (!passwordCorreta) return res.status(401).json({ erro: 'Credenciais inválidas' });

        const token = jwt.sign(
            { id: utilizador._id, perfil: utilizador.perfil },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ mensagem: 'Login com sucesso', token });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
});

// ==========================================
// ROTAS: ERVAS AROMÁTICAS (CRUD)
// ==========================================

// 1. CREATE - Registar nova erva
app.post('/api/ervas', async (req, res) => {
    try {
        const novaErva = new ErvaAromatica(req.body);
        await novaErva.save();
        res.status(201).json({ mensagem: 'Erva aromática registada com sucesso!', erva: novaErva });
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
});

// 2. READ - Listar todas as ervas
app.get('/api/ervas', async (req, res) => {
    try {
        const ervas = await ErvaAromatica.find();
        res.status(200).json(ervas);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
});

// 3. READ - Obter uma erva específica por ID
app.get('/api/ervas/:id', async (req, res) => {
    try {
        const erva = await ErvaAromatica.findById(req.params.id);
        if (!erva) return res.status(404).json({ erro: 'Erva não encontrada.' });
        res.status(200).json(erva);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
});

// 4. UPDATE - Atualizar dados de uma erva
app.put('/api/ervas/:id', async (req, res) => {
    try {
        const ervaAtualizada = await ErvaAromatica.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ervaAtualizada) return res.status(404).json({ erro: 'Erva não encontrada.' });
        res.status(200).json({ mensagem: 'Erva atualizada!', erva: ervaAtualizada });
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
});

// 5. DELETE - Apagar uma erva
app.delete('/api/ervas/:id', async (req, res) => {
    try {
        const ervaApagada = await ErvaAromatica.findByIdAndDelete(req.params.id);
        if (!ervaApagada) return res.status(404).json({ erro: 'Erva não encontrada.' });
        res.status(200).json({ mensagem: 'Erva apagada com sucesso!' });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});