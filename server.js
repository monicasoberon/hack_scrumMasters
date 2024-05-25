const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://monicasoberon2747:ScrumMasters100@cluster0.r9bpf.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB', error);
});

app.use('/api', routes);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
