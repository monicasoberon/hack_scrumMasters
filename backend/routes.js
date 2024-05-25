const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Grid = require('gridfs-stream');
const path = require('path');
const crypto = require('crypto');
const router = express.Router();

const Maestro = require('./models/maestro');
const Estudiante = require('./models/estudiante');
const Curso = require('./models/curso');
const Asignacion = require('./models/asignacion');
const PdfDetails = require('./models/pdfs');

const mongoURI = 'mongodb+srv://monicasoberon2747:ScrumMasters100@cluster0.r9bpf.mongodb.net/ScrumMasters';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let gfs;
conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return cb(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            cb(null, filename);
        });
    }
});

const upload = multer({ storage });

router.get('/test', (req, res) => {
    res.send('Test route');
  });

// Route to upload PDF with curso_id
router.post('/upload-files', upload.single('file'), async (req, res) => {
    const { title, curso_id } = req.body;
    const fileName = req.file.filename;
    try {
        await PdfDetails.create({ title: title, pdf: fileName, curso_id: curso_id });
        res.send({ status: 'ok' });
    } catch (error) {
        res.status(500).json({ status: error.message });
    }
});

// Route to get PDFs for a specific course
router.get('/get-files/:curso_id', async (req, res) => {
    const { curso_id } = req.params;
    try {
        const files = await PdfDetails.find({ curso_id: curso_id });
        res.json({ status: 'ok', data: files });
    } catch (error) {
        res.status(500).json({ status: error.message });
    }
});

// Endpoint to retrieve PDF from GridFS
router.get('/get-pdf/:filename', async (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ message: 'No file exists' });
        }

        // Check if it is a PDF
        if (file.contentType === 'application/pdf') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({ message: 'Not a PDF file' });
        }
    });
});


// Add the login route here
router.post('/login', async (req, res) => {
    const { correo_electronico, contrasena } = req.body;
    try {
        const maestro = await Maestro.findOne({ correo_electronico });
        if (!maestro || maestro.contrasena !== contrasena) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        res.json({ message: 'Login successful', maestroId: maestro._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Add the new route here
router.get('/teacher/:teacherId/course/:courseId/students', async (req, res) => {
    const { teacherId, courseId } = req.params;
    try {
        // Find the course and verify the teacher_id
        const course = await Curso.findOne({ _id: courseId, teacher_id: teacherId }).populate('estudiantes');
        if (!course) {
            return res.status(404).json({ message: 'Course not found or you do not have permission to access this course.' });
        }

        // Get the students
        const studentIds = course.estudiantes;
        const students = await Estudiante.find({ _id: { $in: studentIds } });

        // Get the assignments for the course
        const assignments = await Asignacion.find({ curso_id: courseId });

        // Compile the results
        const results = students.map(student => {
            const studentGrades = assignments.map(assignment => {
                const grade = student.calificaciones.find(c => c.asignacion_id === assignment._id);
                return {
                    assignmentName: assignment.nombre,
                    grade: grade ? grade.calificacion : 'N/A'
                };
            });

            return {
                studentName: `${student.primer_nombre} ${student.apellido}`,
                grades: studentGrades
            };
        });

        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Routes for Maestros
router.get('/maestros', async (req, res) => {
    try {
        const maestros = await Maestro.find().populate('clases');
        res.json(maestros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/maestros', async (req, res) => {
    const maestro = new Maestro(req.body);
    try {
        const newMaestro = await maestro.save();
        res.status(201).json(newMaestro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Routes for Estudiantes
router.get('/estudiantes', async (req, res) => {
    try {
        const estudiantes = await Estudiante.find().populate('calificaciones.asignacion_id');
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/estudiantes', async (req, res) => {
    const estudiante = new Estudiante(req.body);
    try {
        const newEstudiante = await estudiante.save();
        res.status(201).json(newEstudiante);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Routes for Cursos
router.get('/cursos', async (req, res) => {
    try {
        const cursos = await Curso.find().populate('teacher_id').populate('estudiantes');
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/cursos', async (req, res) => {
    const curso = new Curso(req.body);
    try {
        const newCurso = await curso.save();
        res.status(201).json(newCurso);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Routes for Asignaciones
router.get('/asignaciones', async (req, res) => {
    try {
        const asignaciones = await Asignacion.find().populate('curso_id');
        res.json(asignaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/asignaciones', async (req, res) => {
    const asignacion = new Asignacion(req.body);
    try {
        const newAsignacion = await asignacion.save();
        res.status(201).json(newAsignacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PDF file upload endpoint
router.post('/upload-files', upload.single('file'), async (req, res) => {
    const title = req.body.title;
    const fileName = req.file.filename;
    try {
        await PdfDetails.create({ title: title, pdf: fileName });
        res.send({ status: 'ok' });
    } catch (error) {
        res.status(500).json({ status: error.message });
    }
});

// Get all uploaded PDF files endpoint
router.get('/get-files', async (req, res) => {
    try {
        const files = await PdfDetails.find({});
        res.json({ status: 'ok', data: files });
    } catch (error) {
        res.status(500).json({ status: error.message });
    }
});

// Endpoint to retrieve PDF from GridFS
router.get('/get-pdf/:filename', async (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ message: 'No file exists' });
        }

        // Check if it is a PDF
        if (file.contentType === 'application/pdf') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({ message: 'Not a PDF file' });
        }
    });
});

module.exports = router;
