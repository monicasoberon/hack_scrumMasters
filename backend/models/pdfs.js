const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    pdf: String,
    title: String,
    curso_id: { type: String, ref: 'curso' }  // Add course reference
}, { collection: 'pdfDetails' });

module.exports = mongoose.model('pdfDetails', pdfSchema);
