const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    pdf: String,
    title: String,
    curso_id: { type: String, ref: 'Curso' }  // Add course reference
}, { collection: 'PdfDetails' });

module.exports = mongoose.model('PdfDetails', pdfSchema);
