//getTodo
const router = require("../routes/busquedas");
const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async(req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i'); // esto permite hacer la busqueda insensible, osea que el parametro de busqueda no tiene que estar escrito exactamente igual que en la bd
    //para que se disparen de forma simultanea y usando desestructuracion para asignar cada promesa a una posicion del arreglo
    const [usuarios, medicos, hospitales] = await Promise.all([
        await Usuario.find({ nombre: regex }), //condicion si nombre = a parametro de busqueda
        await Medico.find({ nombre: regex }),
        await Hospital.find({ nombre: regex })
    ]);
    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })
}

const getDocumentosColeccion = async(req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    let data = [];
    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex }).populate('usuario', 'nombre img').populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex }).populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene se que ser usuarios/medicos/hospitales'
            });
    }
    res.json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}