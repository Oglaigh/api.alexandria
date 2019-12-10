const express = require('express');

const bcrypt = require('bcrypt');

const User = require('../models/user');

var jwt = require('jsonwebtoken');

const router = express.Router();


router.post('/',(req,res) =>{

    let body = req.body;
    console.log(body);

    User.findOne({email: body.email}, (err, userDB) =>{

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!userDB) {
            return res.status(400).json({
                ok:false,
                err:{
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }

        if( !bcrypt.compareSync(body.password, userDB.password)){
            return res.status(400).json({
                ok:false,
                err:{
                    message: "Contraseña incorrecta"
                }
            });
        };

        let token = jwt.sign({
            user: userDB //payload
        },process.env.SEED_AUTH,{expiresIn: process.env.EXPIRE_TOKEN})

        console.log(userDB);

        res.json({
            ok: true,
            user: userDB,
            token
        });
    });
})


module.exports = router;