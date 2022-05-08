const express = require('express');
const connectDB = require('./config/db');
const elasticClient = require('./config/elasticClient')
const cors = require('cors');

// routes
const articles = require('./routes/api/articles');
const books = require('./routes/api/books');

const app = express();

// Connect Database
connectDB();
// const BuildIndexes = require('./models/BuildIndexes');
// BuildIndexes();
// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/articles', articles);

app.use('/api/books', books);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));