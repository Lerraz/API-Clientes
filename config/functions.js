const jwt = require('jsonwebtoken');
const SECRET = 'apiteste'

function verifyJWT(req, res, next) {
    if (req.headers.authorization == undefined) return res.status(401).json({ 'Message': 'Usuário não está autorizado, faça login novamente' })

    const token = req.headers.authorization.split(' ')[1]
    if (token == 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjAsImlhdCI6MTY0NjY1MjI4NywiZXhwIjoxNjQ2NjUyNTg3fQ.2XVMn5mvcMLqjAz_eFCs7ttsbAddqu0lwPUw10OBpP8')
        return res.status(403).json({ 'Message': 'Usuário não tem permissão para acessar o recurso' })
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ 'Message': 'Usuário não está autorizado, faça login novamente' })

        req.userId = decoded.userId
        next()
    })
}
function PreValidação(array_data, BodyValue, QueryValue) {
    ArrayError = []
    if (BodyValue != undefined) {
        if (BodyValue == false) {
            if (Object.values(array_data.body) != '')
                ArrayError.push({ 'Message': 'O Body da Request precisa estar vazio' })
        }
        if (BodyValue == true) {
            if (Object.values(array_data.body) == '')
                ArrayError.push({ 'Message': 'O Body da Request está vazio, favor preencher' })
        }
    }
    if (QueryValue != undefined) {
        if (QueryValue == false) {
            if (Object.values(array_data.query) != '')
                ArrayError.push({ 'Message': 'Os Query paramns da Request precisam estar vazios' })
        }
        if (QueryValue == true) {
            if (Object.values(array_data.query) == '')
                ArrayError.push({ 'Message': 'Os Querys paramans da Request estão vazios, favor preencher' })
        }
    }
    return ArrayError
}
function CampoInexistente(array_data) {
    ArrayError = []
    for (let i = 0; i < Object.entries(array_data).length; i++) {
        if (Object.keys(array_data)[i] != 'nome' &&
            Object.keys(array_data)[i] != 'idade' &&
            Object.keys(array_data)[i] != 'cpf' &&
            Object.keys(array_data)[i] != 'data_nasc' &&
            Object.keys(array_data)[i] != 'cep' &&
            Object.keys(array_data)[i] != 'endereco' &&
            Object.keys(array_data)[i] != 'numero' &&
            Object.keys(array_data)[i] != 'bairro' &&
            Object.keys(array_data)[i] != 'cidade' &&
            Object.keys(array_data)[i] != 'estado' &&
            Object.keys(array_data)[i] != 'telefone_fixo' &&
            Object.keys(array_data)[i] != 'celular') {
            ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' não é válido` })
        }
    }
    return ArrayError
}
function ParametroBranco(array_data) {
    ArrayError = []
    for (let i = 0; i < Object.entries(array_data).length; i++) {
        if (Object.keys(array_data)[i] == 'nome') {
            if (Object.values(array_data)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está vazio` })
            }
        }

        if (Object.keys(array_data)[i] == 'idade') {
            if (Object.values(array_data)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está vazio` })
            }
        }

        if (Object.keys(array_data)[i] == 'cpf') {
            if (Object.values(array_data)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está vazio` })
            }
        }

        if (Object.keys(array_data)[i] == 'data_nasc') {
            if (Object.values(array_data)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está vazio` })
            }
        }

        if (Object.keys(array_data)[i] == 'cep') {
            if (Object.values(array_data)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está vazio` })
            }
        }

        if (Object.keys(array_data)[i] == 'endereco') {
            if (Object.values(array_data)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está vazio` })
            }
        }

        if (Object.keys(array_data)[i] == 'numero') {
            if (Object.values(array_data)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está vazio` })
            }
        }
        if (Object.keys(array_data)[i] == 'bairro') {
            if (Object.values(array_data)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está vazio` })
            }
        }

        if (Object.keys(array_data)[i] == 'cidade') {
            if (Object.values(array_data)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está vazio` })
            }
        }

        if (Object.keys(array_data)[i] == 'estado') {
            if (Object.values(array_data)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está vazio` })
            }
        }

        if (Object.keys(array_data)[i] == 'telefone_fixo') {
            if (Object.values(array_data)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está vazio` })
            }
        }

        if (Object.keys(array_data)[i] == 'celular') {
            if (Object.values(array_data)[i] === '') {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está vazio` })
            }
        }
    }
    return ArrayError
}
function TipagemInvalida(array_data) {
    ArrayError = []
    for (let i = 0; i < Object.entries(array_data).length; i++) {
        if (Object.keys(array_data)[i] == 'nome') {
            if (isNaN(Object.values(array_data)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(array_data)[i] == 'idade') {
            if (isNaN(Object.values(array_data)[i]) !== false) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(array_data)[i] == 'cpf') {
            var rx = /^([0-9]{2}[\.][0-9]{3}[\.][0-9]{3}[\/][0-9]{4}[-][0-9]{2})|([0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[-][0-9]{2})$/
            rx = rx.test(Object.values(array_data)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(array_data)[i] == 'data_nasc') {
            var rx = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g;
            rx = rx.test(Object.values(array_data)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(array_data)[i] == 'cep') {
            var rx = /^([\d]{2})([\d]{3})-([\d]{3})/
            rx = rx.test(Object.values(array_data)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(array_data)[i] == 'endereco') {
            if (isNaN(Object.values(array_data)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(array_data)[i] == 'numero') {
            if (isNaN(Object.values(array_data)[i]) !== false) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está com formato inválido` })
            }
        }
        if (Object.keys(array_data)[i] == 'bairro') {
            if (isNaN(Object.values(array_data)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(array_data)[i] == 'cidade') {
            if (isNaN(Object.values(array_data)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(array_data)[i] == 'estado') {
            if (isNaN(Object.values(array_data)[i]) !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(array_data)[i] == 'telefone_fixo') {
            var rx = /^\([1-9]{2}\) [9]{0,1}[0-9]{1}[0-9]{3}\-[0-9]{4}$/
            rx = rx.test(Object.values(array_data)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está com formato inválido` })
            }
        }

        if (Object.keys(array_data)[i] == 'celular') {
            var rx = /^\([1-9]{2}\) [9]{0,1}[6-9]{1}[0-9]{3}\-[0-9]{4}$/
            rx = rx.test(Object.values(array_data)[i])
            if (rx !== true) {
                ArrayError.push({ 'Message': `O campo '${Object.keys(array_data)[i]}' está com formato inválido` })
            }
        }
    }
    return ArrayError
}
function FiltraDados(array_data, db) {
    dbFilter = []
    for (let j = 0; j < Object.entries(db).length; j++) {
        let count = 0
        for (let k = 0; k < Object.keys((db)[j]).length; k++) {
            for (let l = 0; l < Object.entries(array_data).length; l++) {
                if (Object.keys(db[j])[k] == Object.keys(array_data)[l]) {
                    if (Object.values(db[j])[k] == (Object.values(array_data)[l])) {
                        count++
                    }
                }
            }
        }
        if (count == Object.entries(array_data).length) {
            dbFilter.push(Object.values(db)[j])
        }
    }
    return dbFilter
}
function CamposObrigatorios(array_data) {
    ArrayError = []
    let Vnome = 0, Vcpf = 0, Vdata = 0, Vcep = 0, Vend = 0, Vnum = 0, Vbairro = 0, Vcid = 0, Vest = 0, Vcel = 0
    for (let i = 0; i < (Object.keys(array_data).length); i++) {
        if (Object.keys(array_data)[i] == 'nome') Vnome++
        if (Object.keys(array_data)[i] == 'cpf') Vcpf++
        if (Object.keys(array_data)[i] == 'data_nasc') Vdata++
        if (Object.keys(array_data)[i] == 'cep') Vcep++
        if (Object.keys(array_data)[i] == 'endereco') Vend++
        if (Object.keys(array_data)[i] == 'numero') Vnum++
        if (Object.keys(array_data)[i] == 'bairro') Vbairro++
        if (Object.keys(array_data)[i] == 'cidade') Vcid++
        if (Object.keys(array_data)[i] == 'estado') Vest++
        if (Object.keys(array_data)[i] == 'celular') Vcel++
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

    return ArrayError
}
function CadastrarDados(array_data, db) {
    var meuObj = new Object();
    meuObj.id = ((db)[db.length - 1].id) + 1
    for (let i = 0; i < (Object.keys(array_data).length); i++) {
        if (Object.keys(array_data)[i] == 'nome') meuObj.nome = (`${Object.values(array_data)[i]}`)
    }

    for (let i = 0; i < (Object.keys(array_data).length); i++) {
        if (Object.keys(array_data)[i] == 'data_nasc') {
            var dataAtual = new Date();
            var anoAtual = dataAtual.getFullYear();
            var anoNascParts = Object.values(array_data)[i].split('/');
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
    for (let i = 0; i < (Object.keys(array_data).length); i++) {
        if (Object.keys(array_data)[i] == 'cpf') meuObj.cpf = (`${Object.values(array_data)[i]}`)
    }

    for (let i = 0; i < (Object.keys(array_data).length); i++) {
        if (Object.keys(array_data)[i] == 'data_nasc') meuObj.data_nasc = (`${Object.values(array_data)[i]}`)
    }

    for (let i = 0; i < (Object.keys(array_data).length); i++) {
        if (Object.keys(array_data)[i] == 'cep') meuObj.cep = (`${Object.values(array_data)[i]}`)
    }

    for (let i = 0; i < (Object.keys(array_data).length); i++) {
        if (Object.keys(array_data)[i] == 'endereco') meuObj.endereco = (`${Object.values(array_data)[i]}`)
    }

    for (let i = 0; i < (Object.keys(array_data).length); i++) {
        if (Object.keys(array_data)[i] == 'numero') meuObj.numero = (`${Object.values(array_data)[i]}`)
    }

    for (let i = 0; i < (Object.keys(array_data).length); i++) {
        if (Object.keys(array_data)[i] == 'bairro') meuObj.bairro = (`${Object.values(array_data)[i]}`)
    }

    for (let i = 0; i < (Object.keys(array_data).length); i++) {
        if (Object.keys(array_data)[i] == 'cidade') meuObj.cidade = (`${Object.values(array_data)[i]}`)
    }

    for (let i = 0; i < (Object.keys(array_data).length); i++) {
        if (Object.keys(array_data)[i] == 'estado') meuObj.estado = (`${Object.values(array_data)[i]}`)
    }

    for (let i = 0; i < (Object.keys(array_data).length); i++) {
        if (Object.keys(array_data)[i] == 'telefone_fixo') meuObj.telefone_fixo = (`${Object.values(array_data)[i]}`)
    }

    for (let i = 0; i < (Object.keys(array_data).length); i++) {
        if (Object.keys(array_data)[i] == 'celular') meuObj.celular = (`${Object.values(array_data)[i]}`)
    }
    return meuObj
}
function AtualizaDados(array_data, db, id) {
    let newDB = db.filter(item => {
        if (item.id != id) {
            return item
        }
        if (item.id == id) {
            for (let i = 0; i < (Object.keys(array_data).length); i++) {
                if (Object.keys(array_data)[i] == 'nome') item.nome = (`${Object.values(array_data)[i]}`)
            }

            for (let i = 0; i < (Object.keys(array_data).length); i++) {
                if (Object.keys(array_data)[i] == 'data_nasc') {
                    var dataAtual = new Date();
                    var anoAtual = dataAtual.getFullYear();
                    var anoNascParts = Object.values(array_data)[i].split('/');
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
            for (let i = 0; i < (Object.keys(array_data).length); i++) {
                if (Object.keys(array_data)[i] == 'cpf') item.cpf = (`${Object.values(array_data)[i]}`)
            }

            for (let i = 0; i < (Object.keys(array_data).length); i++) {
                if (Object.keys(array_data)[i] == 'data_nasc') item.data_nasc = (`${Object.values(array_data)[i]}`)
            }

            for (let i = 0; i < (Object.keys(array_data).length); i++) {
                if (Object.keys(array_data)[i] == 'cep') item.cep = (`${Object.values(array_data)[i]}`)
            }

            for (let i = 0; i < (Object.keys(array_data).length); i++) {
                if (Object.keys(array_data)[i] == 'endereco') item.endereco = (`${Object.values(array_data)[i]}`)
            }

            for (let i = 0; i < (Object.keys(array_data).length); i++) {
                if (Object.keys(array_data)[i] == 'numero') item.numero = (`${Object.values(array_data)[i]}`)
            }

            for (let i = 0; i < (Object.keys(array_data).length); i++) {
                if (Object.keys(array_data)[i] == 'bairro') item.bairro = (`${Object.values(array_data)[i]}`)
            }

            for (let i = 0; i < (Object.keys(array_data).length); i++) {
                if (Object.keys(array_data)[i] == 'cidade') item.cidade = (`${Object.values(array_data)[i]}`)
            }

            for (let i = 0; i < (Object.keys(array_data).length); i++) {
                if (Object.keys(array_data)[i] == 'estado') item.estado = (`${Object.values(array_data)[i]}`)
            }

            for (let i = 0; i < (Object.keys(array_data).length); i++) {
                if (Object.keys(array_data)[i] == 'telefone_fixo') item.telefone_fixo = (`${Object.values(array_data)[i]}`)
            }

            for (let i = 0; i < (Object.keys(array_data).length); i++) {
                if (Object.keys(array_data)[i] == 'celular') item.celular = (`${Object.values(array_data)[i]}`)
            }
            return item
        }
    })
    return newDB
}
function ImprimeDadosAtualizado(db, id) {
    let putDB = db.filter(item => {
        if (item.id == id)
            return item
    })
    return putDB[0]
}
function VerificaID(db, id) {
    let countDB = db.filter(item => {
        if (item.id == id)
            return 1
    })
    return countDB
}
function DeletaDados(db, id) {
    let newDB = db.filter(item => {
        if (item.id != id)
            return item
    })
    return newDB
}

module.exports = { 
    verifyJWT: verifyJWT,
    PreValidação: PreValidação,
    CampoInexistente: CampoInexistente,
    ParametroBranco: ParametroBranco,
    TipagemInvalida: TipagemInvalida,
    FiltraDados: FiltraDados,
    CamposObrigatorios: CamposObrigatorios,
    CadastrarDados: CadastrarDados,
    AtualizaDados: AtualizaDados,
    ImprimeDadosAtualizado: ImprimeDadosAtualizado,
    VerificaID: VerificaID,
    DeletaDados: DeletaDados};