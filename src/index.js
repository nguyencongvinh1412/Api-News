const path = require('path');
const express = require('express');
const app = express();
// const express = require('body-parser');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

// connect database
const connect = require('../src/configs/connest');
connect.connect();

// require routes
const routeTheLoai = require('./sources/routes/theloai.route');
const routeLoaiTin = require('./sources/routes/loaitin.route');
const routeTinTuc = require('./sources/routes/tintuc.route');
const routeUser = require('./sources/routes/user.route');
const routeComment = require('./sources/routes/comment.route');

app.get('/', (req, res) => {
    res.send('starting...')
})

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// static file
app.use(express.static(path.join(__dirname, 'public')))

// use routes 
app.use('/theloai', routeTheLoai);
app.use('/loaitin', routeLoaiTin);
app.use('/tintuc', routeTinTuc);
app.use('/user', routeUser);
app.use('/comment', routeComment);

app.listen(port, (req, res) => {
    console.log('listening on port: ' + port);
    console.log(`http://localhost:${port}/`);
})