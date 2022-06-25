const servicios = require('express').Router()
const { Router } = require('express')
const conexion = require('./config/conexion')

//asignamos todas las servicios-----------
//get servicioss
servicios.get('/',(req,res)=>{
    let sql='select Descripcion,costoServicio from Servicios'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//get servicios
servicios.get('/:id',(req,res)=>{
    const {id} = req.params
    let sql='select Descripcion,costoServicio from Servicios where idServicio = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//agregar servicios
servicios.post('/',(req,res)=>{
    const{Descripcion,costoServicio} = req.body;

    let sql = `insert into Servicios(Descripcion,costoServicio) values ('${Descripcion}','${costoServicio}')`
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'servicios agregado'})
        }
    })
})

//Eliminar
servicios.delete('/:id',(req,res)=>{
    const{id}=req.params

    let sql = `delete from Servicios where idServicio = '${id}' `
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'servicios eliminado'})
        }
    })

})

//modificar
servicios.put('/:id',(req,res)=>{
    const{id}=req.params
    const{Descripcion,costoServicio} = req.body
    let sql = `update Servicios set 
                Descripcion = '${Descripcion}',
                costoServicio = '${costoServicio}' where idServicio = '${id}'`

    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
        res.json({status:'servicios modificado'})        }
    })                
})
//------------------------------------


module.exports=servicios;