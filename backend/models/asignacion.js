const mongoose = require('mongoose');

const asignacionSchema = new mongoose.Schema({
    _id: String,
    nombre: String,
    fecha: Date,
    curso_id: String
});

module.exports = mongoose.model('Asignacion', asignacionSchema);
