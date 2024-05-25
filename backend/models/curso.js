const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    _id: String,
    nombre: String,
    estudiantes: [String]
});

module.exports = mongoose.model('Curso', cursoSchema);
