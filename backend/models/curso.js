const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    _id: String,
    nombre: String,
    maestro_id: { type: String, ref: 'maestro' },
    estudiante_id: [{ type: String, ref: 'estudiante' }]
});

module.exports = mongoose.model('curso', cursoSchema);
