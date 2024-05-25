const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');
const path = require('path');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));

// Update MongoDB connection with your new database URI
const mongoURI = 'mongodb+srv://monicasoberon2747:ScrumMasters100@cluster0.r9bpf.mongodb.net/ScrumMasters';

// MongoDB connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB', error);
});

// Use routes
app.use('/api', routes);

// Start server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
