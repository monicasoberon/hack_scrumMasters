const mongoose = require('mongoose');

const asignacionSchema = new mongoose.Schema({
    _id: String,
    nombre: String,
    fecha: Date,
    curso_id: { type: String, ref: 'Curso' }
});

module.exports = mongoose.model('Asignacion', asignacionSchema);
