const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
 

const PORT = process.env.PORT || 3000;

const DbConnect = require('./database');
const routes = require('./routes');

app.use(express.json());

// Database connection
DbConnect();

// Routes 
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// 404 Page
app.use((req, res, next) => {
    res.send('<h1> Error:404, Page not found </h1>');
 });


// Template Engine
app.use(express.static('./public/'))
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');




app.listen(PORT, (req, res) => {
    console.log(`Listning on PORT: ${PORT}`);
})
