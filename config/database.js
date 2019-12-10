const mongoose = require('mongoose');
//const uri = 'mongodb://localhost/Alexandria';
const uri = process.env.urlDB;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,})
    .then(db => console.log('DataBase is connected...'))
    .catch(err => console.error(err));


module.exports = mongoose;