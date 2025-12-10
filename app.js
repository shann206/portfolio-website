const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true })); // without this, req.body wont work

app.use(express.static('public'))
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Republic_C207',
    database: 'portfolio'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }

    console.log('Connected to the database');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/project1', (req, res) => {
    res.render('project1');
});

app.get('/project2', (req, res) => {
    res.render('project2');
});

app.get('/project3', (req, res) => {
    res.render('project3');
});

app.get('/project4', (req, res) => {
    res.render('project4');
});

app.post('/contact', upload.single('image'), (req, res) => {
    const { name, email, contactNo, message } = req.body;

    const sql = 'INSERT INTO contact (name, email, contactNo, message) VALUES (?, ?, ?, ?)';
    connection.query(sql, [name, email, contactNo, message], (error, results) => {
        if (error) {
            console.error('Error submitting message:', error);
            res.status(500).send('Error submitting message');
        } else {
            res.redirect('/#contact');
        }
    });
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});