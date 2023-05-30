const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));


let associados = [
  { cpf: '1555126811', nome: 'Lucas', email: 'Lucasreidelas@hotmail.com' },
  { cpf: '5415524022', nome: 'Cristian', email: 'cristian@hotmail.com' },
  { cpf: '4875148544', nome: 'Gustavo', email: 'Gustavo@hotmail.com' }
];

// Rota para obter todos os associados
app.get('/associados', (req, res) => {
  res.json(associados);
});

// Rota para obter um associado por CPF
app.get('/associados/:cpf', (req, res) => {
  const cpf = req.params.cpf;
  const associado = associados.find(a => a.cpf === cpf);

  if (!associado) {
    res.status(404).json({ error: 'Associado não encontrado.' });
  } else {
    res.json(associado);
  }
});

// Rota para criar um novo associado
app.post('/associados', (req, res) => {
  const { cpf, nome, email } = req.body;

  if (!cpf || !nome || !email) {
    res.status(400).json({ error: 'CPF, nome e email são campos obrigatórios.' });
  } else if (associados.find(a => a.cpf === cpf)) {
    res.status(409).json({ error: 'Associado com o mesmo CPF já existe.' });
  } else {
    const novoAssociado = { cpf, nome, email };
    associados.push(novoAssociado);
    res.status(201).json(novoAssociado);
  }
});

// Rota para atualizar um associado existente por CPF
app.put('/associados/:cpf', (req, res) => {
  const cpf = req.params.cpf;
  const { nome, email } = req.body;

  const associado = associados.find(a => a.cpf === cpf);

  if (!associado) {
    res.status(404).json({ error: 'Associado não encontrado.' });
  } else if (!nome || !email) {
    res.status(400).json({ error: 'Nome e email são campos obrigatórios.' });
  } else {
    associado.nome = nome;
    associado.email = email;
    res.json(associado);
  }
});

// Rota para excluir um associado existente por CPF
app.delete('/associados/:cpf', (req, res) => {
  const cpf = req.params.cpf;
  const index = associados.findIndex(a => a.cpf === cpf);

  if (index === -1) {
    res.status(404).json({ error: 'Associado não encontrado.' });
  } else {
    const associadoRemovido = associados.splice(index, 1)[0];
    res.json(associadoRemovido);
  }
});

// Rota para buscar um associado por email
app.get('/associados/buscar/:email', (req, res) => {
  const email = req.params.email;
  const associado = associados.find(a => a.email === email);

  if (!associado) {
    res.status(404).json({ error: 'Associado não encontrado.' });
  } else {
    res.json(associado);
  }
});

// Inicie o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
