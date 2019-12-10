const express = require('express');
const app = express();

app.use('/api/books',require('./books_routes'))
app.use('/api/user',require('./user_routes'))
app.use('/api/login',require('./login_routes'))

module.exports = app