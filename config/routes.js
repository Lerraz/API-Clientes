const express = require('express');
const { is } = require('express/lib/request');
const routes = express.Router()
const bodyParser = require('body-parser')
const database = require('../config/db.json');
const jwt = require('jsonwebtoken');
const { append } = require('express/lib/response');
const SECRET = 'apiteste'
let db = database

function verifyJWT(req, res, next){
    if(req.headers.authorization == undefined) return res.status(401).json({ 'Message': 'Usuário não está autorizado, faça login novamente'})

    const token = req.headers.authorization.split(' ')[1]
    if (token == 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjAsImlhdCI6MTY0NjY1MjI4NywiZXhwIjoxNjQ2NjUyNTg3fQ.2XVMn5mvcMLqjAz_eFCs7ttsbAddqu0lwPUw10OBpP8')
    return res.status(403).json({ 'Message': 'Usuário não tem permissão para acessar o recurso'})
    jwt.verify(token, SECRET, (err, decoded) => {
        if(err) return res.status(401).json({ 'Message': 'Usuário não está autorizado, faça login novamente'})
    
        req.userId = decoded.userId
        next()
    })
}

routes.use(bodyParser.json())

routes.post('/login', (req, res) => {
    if (req.body.usuario === 'admin' && req.body.senha === '123') {
        const token = jwt.sign({userId:1}, SECRET, {expiresIn: 3000 })
        return res.json({auth : true, token});
    }
    if (req.body.usuario === 'user' && req.body.senha === 'abc') {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjAsImlhdCI6MTY0NjY1MjI4NywiZXhwIjoxNjQ2NjUyNTg3fQ.2XVMn5mvcMLqjAz_eFCs7ttsbAddqu0lwPUw10OBpP8'
        return res.json({auth : true, token});
    }
    res.status(401).json({ "Message" : "Usuário não tem permissão para acessar o recurso" })
})

routes.get('/clientes/listar', verifyJWT, (req, res) => {

    if (Object.values(req.body) != '')
        return res.status(400).json([{ 'Message': 'O Body da Request precisa estar vazio' }])

    if (Object.entries(req.query).length == 0) {
        return res.json(db)
    }

    //Verificar se há filtros inexistentes
    ArrayError = []
    for (let i = 0; i < Object.entries(req.query).length; i++) {
        if (Object.keys(req.query)[i] != 'nome' &&
            Object.keys(req.query)[i] != 'idade' &&
            Object.keys(req.query)[i] != 'cpf' &&
            Object.keys(req.query)[i] != 'data_nasc' &&
            Object.keys(req.query)[i] != 'cep' &&
            Object.keys(req.query)[i] != 'endereco' &&
            Object.keys(req.query)[i] != 'numero' &&
            Object.keys(req.query)[i] != 'bairro' &&
            Object.keys(req.query)[i] != 'cidade' &&
            Object.keys(req.query)[i] != 'estado' &&
            Object.keys(req.query)[i] != 'telefone_fixo' &&
            Object.keys(req.query)[i] != 'celular') {
            ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' não é válido` })
        }
    }
    if (Object.entries(ArrayError).length != 0)
        return res.status(400).json(ArrayError)

    //Validação de parametro em branco
    for (let i = 0; i < Object.entries(req.query).length; i++) {
        if (Object.keys(req.query)[i] == 'nome') {
            if (Object.values(req.query)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.query)[i] == 'idade') {
            if (Object.values(req.query)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.query)[i] == 'cpf') {
            if (Object.values(req.query)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.query)[i] == 'data_nasc') {
            if (Object.values(req.query)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.query)[i] == 'cep') {
            if (Object.values(req.query)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.query)[i] == 'endereco') {
            if (Object.values(req.query)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.query)[i] == 'numero') {
            if (Object.values(req.query)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está vazio` })
            }
        }
        if (Object.keys(req.query)[i] == 'bairro') {
            if (Object.values(req.query)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.query)[i] == 'cidade') {
            if (Object.values(req.query)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.query)[i] == 'estado') {
            if (Object.values(req.query)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.query)[i] == 'telefone_fixo') {
            if (Object.values(req.query)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.query)[i] == 'celular') {
            if (Object.values(req.query)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está vazio` })
            }
        }
    }
    if (Object.entries(ArrayError).length != 0)
        return res.status(400).json(ArrayError)

    //Validação de tipagem
    for (let i = 0; i < Object.entries(req.query).length; i++) {
        if (Object.keys(req.query)[i] == 'nome') {
            if (isNaN(Object.values(req.query)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.query)[i] == 'idade') {
            if (isNaN(Object.values(req.query)[i]) !== false) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.query)[i] == 'cpf') {
            var rx = /^([0-9]{2}[\.][0-9]{3}[\.][0-9]{3}[\/][0-9]{4}[-][0-9]{2})|([0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[-][0-9]{2})$/
            rx = rx.test(Object.values(req.query)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.query)[i] == 'data_nasc') {
            var rx = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g;
            rx = rx.test(Object.values(req.query)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.query)[i] == 'cep') {
            var rx = /^([\d]{2})([\d]{3})-([\d]{3})/
            rx = rx.test(Object.values(req.query)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.query)[i] == 'endereco') {
            if (isNaN(Object.values(req.query)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.query)[i] == 'numero') {
            if (isNaN(Object.values(req.query)[i]) !== false) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está com formato inválido` })
            }
        }
        if (Object.keys(req.query)[i] == 'bairro') {
            if (isNaN(Object.values(req.query)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.query)[i] == 'cidade') {
            if (isNaN(Object.values(req.query)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.query)[i] == 'estado') {
            if (isNaN(Object.values(req.query)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.query)[i] == 'telefone_fixo') {
            var rx = /^\([1-9]{2}\) [9]{0,1}[0-9]{1}[0-9]{3}\-[0-9]{4}$/
            rx = rx.test(Object.values(req.query)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.query)[i] == 'celular') {
            var rx = /^\([1-9]{2}\) [9]{0,1}[6-9]{1}[0-9]{3}\-[0-9]{4}$/
            rx = rx.test(Object.values(req.query)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.query)[i]}' está com formato inválido` })
            }
        }
    }
    if (Object.entries(ArrayError).length != 0)
        return res.status(400).json(ArrayError)

    //Função que filtra as opções desejadas
    dbFilter = []
    for (let j = 0; j < Object.entries(db).length; j++) {
        let count = 0
        for (let k = 0; k < Object.keys((db)[j]).length; k++) {
            for (let l = 0; l < Object.entries(req.query).length; l++) {
                if (Object.keys(db[j])[k] == Object.keys(req.query)[l]) {
                    if (Object.values(db[j])[k] == (Object.values(req.query)[l])) {
                        count++
                    }
                }
            }
        }
        if (count == Object.entries(req.query).length) {
            dbFilter.push(Object.values(db)[j])
        }
    }
    return res.status(200).json(dbFilter)

    //TODO criar função de ordenação

})

routes.post('/clientes/cadastrar', verifyJWT, (req, res) => {
    //const body = req.body

    if (Object.values(req.body) == '')
        return res.status(400).json([{ 'Message': 'O Body da Request está vazio, favor preencher' }])

    if (Object.values(req.query) != '')
        return res.status(400).json([{ 'Message': 'Os Query paramns da Request precisam estar vazios' }])

    ArrayError = []
    //campos não aceitos
    for (let i = 0; i < (Object.keys(req.body).length); i++) {
        if (Object.keys(req.body)[i] != 'nome' &&
            Object.keys(req.body)[i] != 'cpf' &&
            Object.keys(req.body)[i] != 'data_nasc' &&
            Object.keys(req.body)[i] != 'cep' &&
            Object.keys(req.body)[i] != 'endereco' &&
            Object.keys(req.body)[i] != 'numero' &&
            Object.keys(req.body)[i] != 'bairro' &&
            Object.keys(req.body)[i] != 'cidade' &&
            Object.keys(req.body)[i] != 'estado' &&
            Object.keys(req.body)[i] != 'telefone_fixo' &&
            Object.keys(req.body)[i] != 'celular') {
            ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' não é válido` })
        }
    }
    if (Object.entries(ArrayError).length != 0)
        return res.status(400).json(ArrayError)

    //Validação de campo vazio
    for (let i = 0; i < Object.entries(req.body).length; i++) {
        if (Object.keys(req.body)[i] == 'nome') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'cpf') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'data_nasc') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'cep') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'endereco') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'numero') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }
        if (Object.keys(req.body)[i] == 'bairro') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'cidade') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'estado') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'telefone_fixo') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'celular') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }
    }
    if (Object.entries(ArrayError).length != 0)
        return res.status(400).json(ArrayError)

    //Validação de tipagem
    for (let i = 0; i < Object.entries(req.body).length; i++) {
        if (Object.keys(req.body)[i] == 'nome') {
            if (isNaN(Object.values(req.body)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'cpf') {
            var rx = /^([0-9]{2}[\.][0-9]{3}[\.][0-9]{3}[\/][0-9]{4}[-][0-9]{2})|([0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[-][0-9]{2})$/
            rx = rx.test(Object.values(req.body)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'data_nasc') {
            var rx = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g;
            rx = rx.test(Object.values(req.body)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'cep') {
            var rx = /^([\d]{2})([\d]{3})-([\d]{3})/
            rx = rx.test(Object.values(req.body)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'endereco') {
            if (isNaN(Object.values(req.body)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'numero') {
            if (typeof (Object.values(req.body)[i]) !== 'number') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }
        if (Object.keys(req.body)[i] == 'bairro') {
            if (isNaN(Object.values(req.body)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'cidade') {
            if (isNaN(Object.values(req.body)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'estado') {
            if (isNaN(Object.values(req.body)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'telefone_fixo') {
            var rx = /^\([1-9]{2}\) [9]{0,1}[0-9]{1}[0-9]{3}\-[0-9]{4}$/
            rx = rx.test(Object.values(req.body)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'celular') {
            var rx = /^\([1-9]{2}\) [9]{0,1}[6-9]{1}[0-9]{3}\-[0-9]{4}$/
            rx = rx.test(Object.values(req.body)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }
    }
    if (Object.entries(ArrayError).length != 0)
        return res.status(400).json(ArrayError)

    //Validar campos obrigatórios
    let Vnome = 0, Vcpf = 0, Vdata = 0, Vcep = 0, Vend = 0, Vnum = 0, Vbairro = 0, Vcid = 0, Vest = 0, Vcel = 0
    for (let i = 0; i < (Object.keys(req.body).length); i++) {
        if (Object.keys(req.body)[i] == 'nome') Vnome++
        if (Object.keys(req.body)[i] == 'cpf') Vcpf++
        if (Object.keys(req.body)[i] == 'data_nasc') Vdata++
        if (Object.keys(req.body)[i] == 'cep') Vcep++
        if (Object.keys(req.body)[i] == 'endereco') Vend++
        if (Object.keys(req.body)[i] == 'numero') Vnum++
        if (Object.keys(req.body)[i] == 'bairro') Vbairro++
        if (Object.keys(req.body)[i] == 'cidade') Vcid++
        if (Object.keys(req.body)[i] == 'estado') Vest++
        if (Object.keys(req.body)[i] == 'celular') Vcel++
    }
    if (Vnome < 1) ArrayError.push({ 'Message': `O campo 'nome' é obrigatório` })
    if (Vcpf < 1) ArrayError.push({ 'Message': `O campo 'cpf' é obrigatório` })
    if (Vdata < 1) ArrayError.push({ 'Message': `O campo 'data_nasc' é obrigatório` })
    if (Vcep < 1) ArrayError.push({ 'Message': `O campo 'cep' é obrigatório` })
    if (Vend < 1) ArrayError.push({ 'Message': `O campo 'endereco' é obrigatório` })
    if (Vnum < 1) ArrayError.push({ 'Message': `O campo 'numero' é obrigatório` })
    if (Vbairro < 1) ArrayError.push({ 'Message': `O campo 'bairro' é obrigatório` })
    if (Vcid < 1) ArrayError.push({ 'Message': `O campo 'cidade' é obrigatório` })
    if (Vest < 1) ArrayError.push({ 'Message': `O campo 'estado' é obrigatório` })
    if (Vcel < 1) ArrayError.push({ 'Message': `O campo 'celular' é obrigatório` })

    if (Object.entries(ArrayError).length != 0)
        return res.status(400).json(ArrayError)

    //tratativa para salvar os dados
    var meuObj = new Object();
    meuObj.id = ((db)[db.length-1].id) + 1
    for (let i = 0; i < (Object.keys(req.body).length); i++) {
        if (Object.keys(req.body)[i] == 'nome') meuObj.nome = (`${Object.values(req.body)[i]}`)
    }

    for (let i = 0; i < (Object.keys(req.body).length); i++) {
        if (Object.keys(req.body)[i] == 'data_nasc') {
            var dataAtual = new Date();
            var anoAtual = dataAtual.getFullYear();
            var anoNascParts = Object.values(req.body)[i].split('/');
            var diaNasc = anoNascParts[0];
            var mesNasc = anoNascParts[1];
            var anoNasc = anoNascParts[2];
            var idade = anoAtual - anoNasc;
            var mesAtual = dataAtual.getMonth() + 1;
            if (mesAtual < mesNasc) {
                idade--;
            } else {
                if (mesAtual == mesNasc) {
                    if (new Date().getDate() < diaNasc) {
                        idade--;
                    }
                }
            }
            meuObj.idade = idade;
        }
    }
    for (let i = 0; i < (Object.keys(req.body).length); i++) {
        if (Object.keys(req.body)[i] == 'cpf') meuObj.cpf = (`${Object.values(req.body)[i]}`)
    }

    for (let i = 0; i < (Object.keys(req.body).length); i++) {
        if (Object.keys(req.body)[i] == 'data_nasc') meuObj.data_nasc = (`${Object.values(req.body)[i]}`)
    }

    for (let i = 0; i < (Object.keys(req.body).length); i++) {
        if (Object.keys(req.body)[i] == 'cep') meuObj.cep = (`${Object.values(req.body)[i]}`)
    }

    for (let i = 0; i < (Object.keys(req.body).length); i++) {
        if (Object.keys(req.body)[i] == 'endereco') meuObj.endereco = (`${Object.values(req.body)[i]}`)
    }

    for (let i = 0; i < (Object.keys(req.body).length); i++) {
        if (Object.keys(req.body)[i] == 'numero') meuObj.numero = (`${Object.values(req.body)[i]}`)
    }

    for (let i = 0; i < (Object.keys(req.body).length); i++) {
        if (Object.keys(req.body)[i] == 'bairro') meuObj.bairro = (`${Object.values(req.body)[i]}`)
    }

    for (let i = 0; i < (Object.keys(req.body).length); i++) {
        if (Object.keys(req.body)[i] == 'cidade') meuObj.cidade = (`${Object.values(req.body)[i]}`)
    }

    for (let i = 0; i < (Object.keys(req.body).length); i++) {
        if (Object.keys(req.body)[i] == 'estado') meuObj.estado = (`${Object.values(req.body)[i]}`)
    }

    for (let i = 0; i < (Object.keys(req.body).length); i++) {
        if (Object.keys(req.body)[i] == 'telefone_fixo') meuObj.telefone_fixo = (`${Object.values(req.body)[i]}`)
    }

    for (let i = 0; i < (Object.keys(req.body).length); i++) {
        if (Object.keys(req.body)[i] == 'celular') meuObj.celular = (`${Object.values(req.body)[i]}`)
    }

    db.push(meuObj)
    return res.status(201).json(meuObj)
})

routes.put('/clientes/atualizar/:id', verifyJWT, (req, res) => {
    const body = req.body
    const id = parseInt(req.params.id)

    let countDB = db.filter(item => {
        if (item.id == id)
            return 1
    })

    if (countDB < 1)
        return res.status(404).json({ 'Message': 'O campo \'id\' não foi encontrado' })

    if (Object.values(req.body) == '')
        return res.status(400).json([{ 'Message': 'O Body da Request está vazio, favor preencher' }])

    if (Object.values(req.query) != '')
        return res.status(400).json([{ 'Message': 'Os Query paramns da Request precisam estar vazios' }])

    ArrayError = []
    //campos não aceitos
    for (let i = 0; i < (Object.keys(req.body).length); i++) {
        if (Object.keys(req.body)[i] != 'nome' &&
            Object.keys(req.body)[i] != 'cpf' &&
            Object.keys(req.body)[i] != 'data_nasc' &&
            Object.keys(req.body)[i] != 'cep' &&
            Object.keys(req.body)[i] != 'endereco' &&
            Object.keys(req.body)[i] != 'numero' &&
            Object.keys(req.body)[i] != 'bairro' &&
            Object.keys(req.body)[i] != 'cidade' &&
            Object.keys(req.body)[i] != 'estado' &&
            Object.keys(req.body)[i] != 'telefone_fixo' &&
            Object.keys(req.body)[i] != 'celular') {
            ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' não é válido` })
        }
    }
    if (Object.entries(ArrayError).length != 0)
        return res.status(400).json(ArrayError)

    //Validação de campo vazio
    for (let i = 0; i < Object.entries(req.body).length; i++) {
        if (Object.keys(req.body)[i] == 'nome') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'cpf') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'data_nasc') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'cep') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'endereco') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'numero') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }
        if (Object.keys(req.body)[i] == 'bairro') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'cidade') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'estado') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'telefone_fixo') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }

        if (Object.keys(req.body)[i] == 'celular') {
            if (Object.values(req.body)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está vazio` })
            }
        }
    }
    if (Object.entries(ArrayError).length != 0)
        return res.status(400).json(ArrayError)

    //Validação de tipagem
    for (let i = 0; i < Object.entries(req.body).length; i++) {
        if (Object.keys(req.body)[i] == 'nome') {
            if (isNaN(Object.values(req.body)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'cpf') {
            var rx = /^([0-9]{2}[\.][0-9]{3}[\.][0-9]{3}[\/][0-9]{4}[-][0-9]{2})|([0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[-][0-9]{2})$/
            rx = rx.test(Object.values(req.body)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'data_nasc') {
            var rx = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g;
            rx = rx.test(Object.values(req.body)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'cep') {
            var rx = /^([\d]{2})([\d]{3})-([\d]{3})/
            rx = rx.test(Object.values(req.body)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'endereco') {
            if (isNaN(Object.values(req.body)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'numero') {
            if (typeof (Object.values(req.body)[i]) !== 'number') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }
        if (Object.keys(req.body)[i] == 'bairro') {
            if (isNaN(Object.values(req.body)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'cidade') {
            if (isNaN(Object.values(req.body)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'estado') {
            if (isNaN(Object.values(req.body)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'telefone_fixo') {
            var rx = /^\([1-9]{2}\) [9]{0,1}[0-9]{1}[0-9]{3}\-[0-9]{4}$/
            rx = rx.test(Object.values(req.body)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(req.body)[i] == 'celular') {
            var rx = /^\([1-9]{2}\) [9]{0,1}[6-9]{1}[0-9]{3}\-[0-9]{4}$/
            rx = rx.test(Object.values(req.body)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(req.body)[i]}' está com formato inválido` })
            }
        }
    }
    if (Object.entries(ArrayError).length != 0)
        return res.status(400).json(ArrayError)

    //tratativa para salvar os dados
    let newDB = db.filter(item => {
        if (item.id != id) {
            return item
        }
        if (item.id == id) {
            for (let i = 0; i < (Object.keys(req.body).length); i++) {
                if (Object.keys(req.body)[i] == 'nome') item.nome = (`${Object.values(req.body)[i]}`)
            }

            for (let i = 0; i < (Object.keys(req.body).length); i++) {
                if (Object.keys(req.body)[i] == 'data_nasc') {
                    var dataAtual = new Date();
                    var anoAtual = dataAtual.getFullYear();
                    var anoNascParts = Object.values(req.body)[i].split('/');
                    var diaNasc = anoNascParts[0];
                    var mesNasc = anoNascParts[1];
                    var anoNasc = anoNascParts[2];
                    var idade = anoAtual - anoNasc;
                    var mesAtual = dataAtual.getMonth() + 1;
                    if (mesAtual < mesNasc) {
                        idade--;
                    } else {
                        if (mesAtual == mesNasc) {
                            if (new Date().getDate() < diaNasc) {
                                idade--;
                            }
                        }
                    }
                    item.idade = idade;
                }
            }
            for (let i = 0; i < (Object.keys(req.body).length); i++) {
                if (Object.keys(req.body)[i] == 'cpf') item.cpf = (`${Object.values(req.body)[i]}`)
            }

            for (let i = 0; i < (Object.keys(req.body).length); i++) {
                if (Object.keys(req.body)[i] == 'data_nasc') item.data_nasc = (`${Object.values(req.body)[i]}`)
            }

            for (let i = 0; i < (Object.keys(req.body).length); i++) {
                if (Object.keys(req.body)[i] == 'cep') item.cep = (`${Object.values(req.body)[i]}`)
            }

            for (let i = 0; i < (Object.keys(req.body).length); i++) {
                if (Object.keys(req.body)[i] == 'endereco') item.endereco = (`${Object.values(req.body)[i]}`)
            }

            for (let i = 0; i < (Object.keys(req.body).length); i++) {
                if (Object.keys(req.body)[i] == 'numero') item.numero = (`${Object.values(req.body)[i]}`)
            }

            for (let i = 0; i < (Object.keys(req.body).length); i++) {
                if (Object.keys(req.body)[i] == 'bairro') item.bairro = (`${Object.values(req.body)[i]}`)
            }

            for (let i = 0; i < (Object.keys(req.body).length); i++) {
                if (Object.keys(req.body)[i] == 'cidade') item.cidade = (`${Object.values(req.body)[i]}`)
            }

            for (let i = 0; i < (Object.keys(req.body).length); i++) {
                if (Object.keys(req.body)[i] == 'estado') item.estado = (`${Object.values(req.body)[i]}`)
            }

            for (let i = 0; i < (Object.keys(req.body).length); i++) {
                if (Object.keys(req.body)[i] == 'telefone_fixo') item.telefone_fixo = (`${Object.values(req.body)[i]}`)
            }

            for (let i = 0; i < (Object.keys(req.body).length); i++) {
                if (Object.keys(req.body)[i] == 'celular') item.celular = (`${Object.values(req.body)[i]}`)
            }
            return item
        }
    })
    db = newDB
    let putDB = db.filter(item => {
        if (item.id == id)
            return item
        })
    return res.status(400).json(Object(putDB[0]))
})

routes.delete('/clientes/deletar/:id', verifyJWT, (req, res) => {
    const id = parseInt(req.params.id)

    if (Object.values(req.body) != '')
        return res.status(400).json({ 'Message': 'O Body da Request precisa estar vazio' })

    if (Object.values(req.query) != '')
        return res.status(400).json({ 'Message': 'Os Query paramns da Request precisam estar vazios' })

    let countDB = db.filter(item => {
        if (item.id == id)
            return 1
    })

    if (countDB < 1)
        return res.status(404).json({ 'Message': 'O campo \'id\' não foi encontrado' })

    let newDB = db.filter(item => {
        if (item.id != id)
            return item
    })
    db = newDB
    return res.status(204).json()
})

module.exports = routes