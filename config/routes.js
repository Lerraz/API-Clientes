const express = require('express');
const { is } = require('express/lib/request');
const { append } = require('express/lib/response');
const routes = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const SECRET = 'apiteste'
const database = require('../config/db.json');
const fn = require('./functions');
let db = database

routes.post('/login', (req, res) => {
    if (req.body.usuario === 'admin' && req.body.senha === '123') {
        const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: 300 })
        return res.json({ auth: true, token });
    }
    if (req.body.usuario === 'user' && req.body.senha === 'abc') {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjAsImlhdCI6MTY0NjY1MjI4NywiZXhwIjoxNjQ2NjUyNTg3fQ.2XVMn5mvcMLqjAz_eFCs7ttsbAddqu0lwPUw10OBpP8'
        return res.json({ auth: true, token });
    }
    res.status(401).json({ "Message": "Usuário não tem permissão para acessar o recurso" })
})

routes.get('/clientes/listar', fn.verifyJWT, (req, res) => {

    if (Object.entries(fn.PreValidação(req, false)) != '')
        return res.status(400).json(fn.PreValidação(req, false))

    if (Object.entries(req.query).length == 0)
        return res.status(200).json(db)

    if (Object.entries(fn.CampoInexistente(req.query)).length != 0)
        return res.status(400).json(fn.CampoInexistente(req.query))

    if (Object.entries(fn.ParametroBranco(req.query)).length != 0)
        return res.status(400).json(fn.ParametroBranco(req.query))

    if (Object.entries(fn.TipagemInvalida(req.query)).length != 0)
        return res.status(400).json(fn.TipagemInvalida(req.query))

    return res.status(200).json(fn.FiltraDados(req.query, db))
})

routes.post('/clientes/cadastrar', fn.verifyJWT, (req, res) => {

    if (Object.entries(fn.PreValidação(req, true, false)) != '')
        return res.status(400).json(fn.PreValidação(req, true, false))

    if (Object.entries(fn.CampoInexistente(req.body)).length != 0)
        return res.status(400).json(fn.CampoInexistente(req.body))

    if (Object.entries(fn.ParametroBranco(req.body)).length != 0)
        return res.status(400).json(fn.ParametroBranco(req.body))

    if (Object.entries(fn.CamposObrigatorios(req.body)).length != 0)
        return res.status(400).json(fn.CamposObrigatorios(req.body))

    if (Object.entries(fn.TipagemInvalida(req.body)).length != 0)
        return res.status(400).json(fn.TipagemInvalida(req.body))

    retorno = fn.CadastrarDados(req.body, db)
    db.push(retorno)
    return res.status(201).json(retorno)
})

routes.put('/clientes/atualizar/:id', fn.verifyJWT, (req, res) => {

    if (Object.entries(fn.PreValidação(req, true, false)) != '')
        return res.status(400).json(fn.PreValidação(req, true, false))

    if (fn.VerificaID(db, parseInt(req.params.id)) < 1)
        return res.status(404).json({ 'Message': 'O campo \'id\' não foi encontrado' })

    if (Object.entries(fn.CampoInexistente(req.body)).length != 0)
        return res.status(400).json(fn.CampoInexistente(req.body))

    if (Object.entries(fn.ParametroBranco(req.body)).length != 0)
        return res.status(400).json(fn.ParametroBranco(req.body))

    if (Object.entries(fn.TipagemInvalida(req.body)).length != 0)
        return res.status(400).json(fn.TipagemInvalida(req.body))

    db = fn.AtualizaDados(req.body, db, parseInt(req.params.id))
    return res.status(200).json(fn.ImprimeDadosAtualizado(db, parseInt(req.params.id)))
})

routes.delete('/clientes/deletar/:id', fn.verifyJWT, (req, res) => {

    if (Object.entries(fn.PreValidação(req, false, false)) != '')
        return res.status(400).json(fn.PreValidação(req, false, false))

    if (fn.VerificaID(db, parseInt(req.params.id)) < 1)
        return res.status(404).json({ 'Message': 'O campo \'id\' não foi encontrado' })

    db = fn.DeletaDados(db, parseInt(req.params.id))
    return res.status(204).json()
})

module.exports = routes