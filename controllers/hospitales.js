const { response } = require('express'); //para tener funciones de .status y todo lo demas
const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {
    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img'); //me encuentra el nombre del id de usuario que tengo guardado (si no se muestra el campo es porque no tiene nada)
    res.json({
        ok: true,
        hospitales
    });
}

const crearHospital = async(req, res = response) => {
    const uid = req.uid; //al hacer la validacion del jwt ya trae el uid
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    res.json({
        ok: true,
        msg: 'crearHospital'
    });
}

const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    });
}

const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarHospital'
    });
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}