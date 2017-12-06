const usuarios = [];
const shortid = require('shortid');
const moment = require('moment')

const getUsuarios = () => {
    return usuarios
}

const deleteUsuario = (id) => {
    const user = usuarios.find(user => id == user._id)
    if(!user) return false;
    const indexOf = usuarios.indexOf(user)
    usuarios.splice(indexOf, 1)
    return true;
}

const create = (data) => {
    usuarios.push({
        _id: data.id || shortid.generate(),
        _createdAt: moment().format(),
        nome: data.nome,
        logradouro: data.logradouro,
        numero: data.numero,
        cep: data.cep,
        estado: data.estado,
        cidade: data.cidade,
        pais: data.pais,
    })
}

const getUsuario = id => {
    const user = usuarios.find(user => id == user._id)
    return user;
}

const updateUsuario = (id, data) => {
    const user = getUsuario(id);
    if(user) {
        const _id = user._id;
        deleteUsuario(id);
        data.id = _id;
        return create(data);
    } else {
        return false;
    }
}

module.exports = {
    getUsuarios,
    deleteUsuario,
    getUsuario,
    create,
}