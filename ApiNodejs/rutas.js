const rutas = require('express').Router()
const { Router } = require('express')
const conexion = require('./config/conexion')

//asignamos todas las rutas-----------
//get equipos
rutas.get('/',(req,res)=>{
    let sql='select descripcion,direccionOrigen,direcciondestino,idMaquina from RutasdeTransporte'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//get equipo
rutas.get('/:id',(req,res)=>{
    const {id} = req.params
    let sql='select descripcion,direccionOrigen,direcciondestino,idMaquina from RutasdeTransporte where idRuta = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//agregar equipo
rutas.post('/',(req,res)=>{
    const{descripcion,direccionOrigen,direcciondestino,idMaquina} = req.body;

    let sql = `insert into RutasdeTransporte(descripcion,direccionOrigen,direcciondestino,idMaquina) values ('${descripcion}','${direccionOrigen}','${direcciondestino}','${idMaquina}')`
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'equipo agregado'})
        }
    })
})

//Eliminar
rutas.delete('/:id',(req,res)=>{
    const{id}=req.params

    let sql = `delete from RutasdeTransporte where idRuta = '${id}' `
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'equipo eliminado'})
        }
    })

})

//modificar
rutas.put('/:id',(req,res)=>{
    const{id}=req.params
    const{direccionOrigen,direcciondestino} = req.body
    let sql = `update RutasdeTransporte set 
                direccionOrigen = '${direccionOrigen}',
                direcciondestino = '${direcciondestino}' where idRuta = '${id}'`

    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
        res.json({status:'equipo modificado'})        }
    })                
})
//------------------------------------


module.exports=rutas;