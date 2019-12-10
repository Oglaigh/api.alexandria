const express = require('express');
var mongoose = require('mongoose');
const router = express.Router();

const Books = require('../models/book');

//Get Users
router.get('/', async (req, res) => {
    const book = await Books.find();
    console.log(book);
    res.json(book);
});

//POST User
router.post('/', async (req, res) => {
    const {title, author, library,user,owned} = req.body;
    const book = new Books({
        title: title,
        author: author,
        library: library,
        user: user,
        owned: owned
    });
    console.log(book);
    await book.save();
    res.json({status: 'Book successfully added!'});
});

//PUT User

router.put('/:id', async (req, res) => {
    const {title, author, library,user,owned,requested,requestUser} = req.body;
    const newBook = {
        title,
        author,
        library,
        user,
        owned,
        requested,
        requestUser
    };
    await Books.findByIdAndUpdate(req.params.id, newBook);
    res.json({status: 'Book successfully updated!'});
})

router.delete('/:id', async (req, res)=>{
    await Books.findByIdAndDelete(req.params.id);
    res.json({status: 'Book successfully deleted!'});
});

router.get('/:id', async (req, res) => {
    var id = mongoose.Types.ObjectId(req.params.id);
    const book = await Books.findById(id);
    res.json(book);
});

//router.get('/:title', async (req, res) =>{
  //  const book = await Books.find(x => x.title === req.params.title);
    //res.json(book);
//})

router.get('/user/:userId'), async (req,res)=>{
    //var user = mongoose.Types.ObjectId(req.params.id);
    //const userBooks = await Books.find({ _id: user});
    res.json({"Response":true});
}

module.exports = router;