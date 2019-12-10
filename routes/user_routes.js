const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const router = express.Router();

const User = require('../models/user');

const {verificateToken, verificateAdminRole} = require('../middlewares/authentication');

//GET User (Paginado)
router.get('/', [verificateToken, verificateAdminRole],async (req, res) => {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limit = Number(limite);

    User.find({status: true})
        .skip(desde)
        .limit(limite)
        .exec( (err, users) => {

            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            console.log(users);
            User.count({status: true}, (err,cont) =>{

                res.json({
                    ok:true,
                    users,
                    total: cont
                })
            })
        });
});

//POST User
router.post('/', verificateToken, async (req, res) => {
    const {name, email, password,google,role,img,status} = req.body;

    let user = new User({
        name : name,
        email : email,
        password : bcrypt.hashSync(password, 10),
        google : google,
        role : role,
        img : img,
        status : status
    })

    console.log(user);
    await user.save((err, userDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok:true,
            user : userDB,
            status: 'User successfully created!'
        })
    });
})

//PUT User
router.put('/:id', verificateToken, function (req, res) {
    
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'img', 'role', 'status']);

    User.findByIdAndUpdate(id ,body,{new: true, runValidators: true}, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };


        console.log(userDB);
        
        res.json({
            ok: true,
            user: userDB
        });
    });
})


//DELETE USER
router.delete('/:id', verificateToken, function (req,res) {
    
    let id = req.params.id;

    let changeStatus = {
        status: false
    };


    User.findByIdAndUpdate(id, changeStatus , {new: true}, (err, deletedUser) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if(!deletedUser) {
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Usuario no encontrado'
                }
            });
        }

        console.log(deletedUser);
        res.json({
            ok: true,
            deletedUser
        });
    });
})
module.exports = router;