const mongoose = require('mongoose');

const maestroSchema = new mongoose.Schema({
    _id: String,
    primer_nombre: String,
    apellido: String,
    correo_electronico: String,
    contrasena: String,
    id_curso: [{ type: String, ref: 'curso' }]
},{ strict: false });

module.exports = mongoose.model('maestro', maestroSchema);
