const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidateor = require('mongoose-unique-validator');

let roles = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

const userSchema = new Schema({
    name: {
        type: String,
        required: [true,"El nombre del usuario es obligatorio"]
    },
    
    email: {
        type: String,
        required: [true,"la direccion de correo es obligatorio"],
        unique: true
    },
    
    password: {
        type: String,
        required: [true,"La contraseña debe ser obligatoria"]
    },
    
    google: {
        type: Boolean,
        required: false
    },

    role: {
        default:"USER_ROLE",
        type: String,
        required: false,
        enum: roles
    },

    img: {
        type: String,
        required: false
    },
    
    status: {
        default: true,
        type: Boolean,
        required: false
    }
})

userSchema.plugin(uniqueValidateor, {message: '{PATH} debe de ser unico'})

//Al momento de imprimir el JSON, el usuario no visualizara la contraseña
userSchema.methods.toJSON = function(){
    let user = this;
    let userObjet = user.toObject();
    delete userObjet.password;

    return userObjet;
}

module.exports = mongoose.model('User', userSchema);