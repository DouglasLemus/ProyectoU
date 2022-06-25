require('./config/conexion');

const express = require('express');
const port = (process.env.port || 3000);

//express
const app = express();

//admitir
app.use(express.json())

//configurar puerto
app.set('port',port);

//rutas
app.use('/rutas',require('./rutas'))
app.use('/empleados',require('./empleado'))
app.use('/rol',require('./rol'))
app.use('/empresa',require('./empresa'))
app.use('/maquinas',require('./maquinas'))
app.use('/clientes',require('./clientes'))
app.use('/servicios',require('./servicios'))
app.use('/contactoemergencia',require('./contactoemergencia'))
app.use('/proveedores',require('./proveedores'))
app.use('/user',require('./user'))

//iniciar express
app.listen(app.get('port'),(error)=>{
    if(error){
        console.log('error al iniciar el servidor: ' + error);
    }else{
        console.log('Servidor iniciado correctamente en el puerto: ' + port);
    }
})