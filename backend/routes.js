const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const router = express.Router();

// Define schemas and models
const Maestro = mongoose.model('Maestro', new mongoose.Schema({
    _id: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true }
}));

const Estudiante = mongoose.model('Estudiante', new mongoose.Schema({
    _id: String,
    name: { type: String, required: true }
}));

const Curso = mongoose.model('Curso', new mongoose.Schema({
    _id: String,
    name: { type: String, required: true },
    teacher_id: { type: String, ref: 'Maestro', required: true }
}));

const Trabajo = mongoose.model('Trabajo', new mongoose.Schema({
    _id: String,
    course_id: { type: String, ref: 'Curso', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true }
}));

const Inscrito = mongoose.model('Inscrito', new mongoose.Schema({
    student_id: { type: String, ref: 'Estudiante', required: true },
    course_id: { type: String, ref: 'Curso', required: true }
}));

const Calificacion = mongoose.model('Calificacion', new mongoose.Schema({
    assignment_id: { type: String, ref: 'Trabajo', required: true },
    student_id: { type: String, ref: 'Estudiante', required: true },
    calificacion: { type: String, required: true }
}));

const PdfDetails = mongoose.model('PdfDetails', new mongoose.Schema(
    {
        pdf: String,
        title: String,
    },
    { collection: "PdfDetails" }
));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});
const upload = multer({ storage: storage });

// Routes for Maestros
router.get('/maestros', async (req, res) => {
    try {
        const maestros = await Maestro.find();
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
        const estudiantes = await Estudiante.find();
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
        const cursos = await Curso.find().populate('teacher_id');
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

// Routes for Trabajos
router.get('/trabajos', async (req, res) => {
    try {
        const trabajos = await Trabajo.find().populate('course_id');
        res.json(trabajos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/trabajos', async (req, res) => {
    const trabajo = new Trabajo(req.body);
    try {
        const newTrabajo = await trabajo.save();
        res.status(201).json(newTrabajo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Routes for Inscritos
router.post('/inscritos', async (req, res) => {
    const inscrito = new Inscrito(req.body);
    try {
        const newInscrito = await inscrito.save();
        res.status(201).json(newInscrito);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/inscritos', async (req, res) => {
    try {
        const inscritos = await Inscrito.find().populate('student_id').populate('course_id');
        res.json(inscritos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Routes for Calificacions
router.post('/calificacions', async (req, res) => {
    const calificacion = new Calificacion(req.body);
    try {
        const newCalificacion = await calificacion.save();
        res.status(201).json(newCalificacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/calificacions', async (req, res) => {
    try {
        const calificacions = await Calificacion.find().populate('assignment_id').populate('student_id');
        res.json(calificacions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for Teacher to See Their Courses, Students, and Calificacions
router.get('/teacher/:teacherId/courses', async (req, res) => {
    const { teacherId } = req.params;
    try {
        const courses = await Curso.find({ teacher_id: teacherId });
        const courseDetails = await Promise.all(courses.map(async (course) => {
            const inscritos = await Inscrito.find({ course_id: course._id }).populate('student_id');
            const students = inscritos.map(inscrito => inscrito.student_id);
            const assignments = await Trabajo.find({ course_id: course._id });
            const calificacions = await Promise.all(assignments.map(async (assignment) => {
                const assignmentCalificacions = await Calificacion.find({ assignment_id: assignment._id }).populate('student_id');
                return {
                    assignment,
                    calificacions: assignmentCalificacions
                };
            }));
            return {
                course,
                students,
                calificacions
            };
        }));
        res.json(courseDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PDF file upload endpoint
router.post("/upload-files", upload.single("file"), async (req, res) => {
    const title = req.body.title;
    const fileName = req.file.filename;
    try {
        await PdfDetails.create({ title: title, pdf: fileName });
        res.send({ status: "ok" });
    } catch (error) {
        res.status(500).json({ status: error.message });
    }
});

// Get all uploaded PDF files endpoint
router.get("/get-files", async (req, res) => {
    try {
        const files = await PdfDetails.find({});
        res.json({ status: "ok", data: files });
    } catch (error) {
        res.status(500).json({ status: error.message });
    }
});

module.exports = router;
