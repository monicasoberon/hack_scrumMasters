const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    _id: String,
    nombre: String,
    teacher_id: { type: String, ref: 'Maestro' },
    estudiantes: [{ type: String, ref: 'Estudiante' }]
});

module.exports = mongoose.model('Curso', cursoSchema);
