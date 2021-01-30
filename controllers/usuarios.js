const router = require("../routes/usuarios");
const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,
        usuarios
        //uid: req.uid //esto es lo que se configuro en el middleware, ahi tenemos el id de la persona que hizo la peticion
    })
}

const deleteUsuario = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }
        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Usuario Eliminado ' + uid
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const crearUsuario = async(req, res = response) => {
    const { email, password, nombre } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email }); //se iguala al email que viene en el body
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);
        //encriptar contraseña (instalar: npm i bcryptjs)
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        //guardar usuario
        await usuario.save();
        // generar jwt
        const token = await generarJWT(usuario._id);
        res.json({
            ok: true,
            usuario: usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }

}

const actualizarUsuario = async(req, res = response) => {
    //Validar token y comprobar si es el usuario correcto
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //actualización
        const { password, google, email, ...campos } = req.body; //extraemos esos campos

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este email'
                });
            }
        }

        //delete campos.password; //si es que mandan password o google lo eliminamos para que no se actualice esto solo funciona si los campos estan definidos en el modelo
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true }); //el true es para que regrese el usuario actualizado

        res.json({
            ok: true,
            usuario: 'Usuario actualizado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    deleteUsuario
}