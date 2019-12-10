/*Verificar Token */
const jwt = require('jsonwebtoken');

let verificateToken  = (req, res, next)=>{

    let token = req.get('Authorization');//Obtengo el token del header del request

    //Verifico si el token es valido
    jwt.verify(token, process.env.SEED_AUTH , (err, decoded) => {
        
        if(err){
            res.status(401).json({
                ok:false,
                err:{
                    message: "Solicitud no autorizada."
                }
            });
        }

        console.log(`Consulta Autorizada => token: ${token}`);
        req.user = decoded.user;
        next();
    });   
}

let verificateAdminRole = (req, res, next) => {
    let user = req.user;

    if( user.role === 'ADMIN_ROLE'){
        next();
    }else{
        
        res.json({
            ok: false,
            err: {
                message: 'El usuario no es Administrador'
            }
        });
    }

};


module.exports = {
    verificateToken,
    verificateAdminRole
};