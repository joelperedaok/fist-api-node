const express = require('express')
const app = express()
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');


app.get('/usuario', function (req, res) {
    res.json('get Usuario local')
})

app.post('/usuario', function (req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
})

app.put('/usuario/:id', function (req, res) {

    let id = req.params.id;
    let body = req.body;

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

})

app.delete('/usuario', function (req, res) {
    res.json('delete Usuario')
})


module.exports = app;