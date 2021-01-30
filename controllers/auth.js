const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");

const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        //verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }
        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password); //compara la contraseña que escribio el usuario con la que esta encriptada en la bd
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        //Generar el token (jwt)
        const token = await generarJWT(usuarioDB._id); //_id hace referencia al id que genera mongodb

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con administrador'
        })
    }
}

module.exports = {
    login
}

//notas
//usamos async para poder hacer peticiones
//usamos response para usar las funciones de status, etc