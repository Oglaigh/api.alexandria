/*PUERTO*/
process.env.PORT = process.env.PORT || 80;

/* ENTORNO*/
process.env.NODE_ENV = process.env.NODE_ENV || 'prod';

/*VENCIMIENTO DEL TOKEN*/
//60 segundos * 60 minutos * 24 horas * 30 dias
process.env.EXPIRE_TOKEN = 60 * 60 * 24 * 30;

/*SEED DEL TOKEN*/
process.env.SEED_AUTH = process.env.SEED_AUTH || 'este-es-el-seed-desarrollo';

/*BASE DATOS*/

let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost/Alexandria';
}else{
    var user = 'alx_admin';
    var pass = 'SuperAdmin';
    var DataBaseName = 'Alexandria';
    urlDB = `mongodb+srv://${user}:${pass}@serapeum-edlmi.mongodb.net/${DataBaseName}?retryWrites=true&w=majority`
    
}

process.env.urlDB = urlDB;