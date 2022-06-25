const mysql = require('mysql');

const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Mancilla13062!',
    port:3306,
    database:'DBProyecto'
});

conexion.connect((err)=>{
    if(err){
        console.log("Existe problemas para acceder a la base de datos : " + err);
    }else{
        console.log("la conexion se realizo correctamente");
    }
});

module.exports = conexion;