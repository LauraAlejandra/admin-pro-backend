const { response } = require('express'); //para tener funciones de .status y todo lo demas
const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {
    const medicos = await Medico.find()
        .populate('usuario', 'nombre img') //me encuentra el nombre del id de usuario que tengo guardado (si no se muestra el campo es porque no tiene nada)
        .populate('hospital', 'nombre');
    res.json({
        ok: true,
        medicos
    });
}

const crearMedico = async(req, res = response) => {
    const uid = req.uid; //al hacer la validacion del jwt ya trae el uid
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    try {
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
}

const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarMedico'
    });
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}