const mongoose = require('mongoose');

const maestroSchema = new mongoose.Schema({
    _id: String,
    primer_nombre: String,
    apellido: String,
    correo_electronico: String,
    contrasena: String,
    clases: [String]
});

module.exports = mongoose.model('Maestro', maestroSchema);
