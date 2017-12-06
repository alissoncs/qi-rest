const express = require('express');

const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()

const { getUsuarios, create, deleteUsuario, getUsuario, updateUsuario } = require('./usuarios')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/usuarios', (req,res) => {
    res.send(getUsuarios())
})
app.get('/usuarios/:id', (req,res) => {
    const usuario = getUsuario(req.params.id);
    if(usuario) {
        res.send(usuario)
    } else {
        res.status(404).send({status: 'not-found'})
    }
    
})
app.post('/usuarios', (req,res) => {
    
    const data = req.body
    
    create(data);

    res.status(201).send({
        status: 'ok'
    })
})
app.put('/usuarios/:id', (req,res) => {
    
    const data = req.body
    const id = req.params.id
    
    const up = updateUsuario(id, data);

    if(up) {
        res.status(202).send({
            status: 'ok'
        })
    } else {
        res.status(404).send({
            status: 'ok'
        })
    }
     
})
app.del('/usuarios/:id', (req,res) => {
    
    const data = req.body
    
    const deleted = deleteUsuario(req.params.id);
    if(deleted) {
        res.status(202).send({
            status: 'ok'
        })
    } else {
        res.status(404).send({
            status: 'not-found'
        })
    }
    
})
module.exports = app;