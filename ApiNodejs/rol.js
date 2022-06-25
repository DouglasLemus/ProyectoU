const rol = require('express').Router()
const { Router } = require('express')
const conexion = require('./config/conexion')

//asignamos todas las rutas-----------
//get rol
rol.get('/',(req,res)=>{
    let sql='select descripcionPuesto,accesos from Rol'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//get rol
rol.get('/:id',(req,res)=>{
    const {id} = req.params
    let sql='select descripcionPuesto,accesos from Rol where idRol = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//agregar rol
rol.post('/',(req,res)=>{
    const{descripcionPuesto,accesos} = req.body;

    let sql = `insert into Rol(descripcionPuesto,accesos) values ('${descripcionPuesto}','${accesos}')`
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'rol agregado'})
        }
    })
})

//Eliminar rol
rol.delete('/:id',(req,res)=>{
    const{id}=req.params

    let sql = `delete from Rol where idRol = '${id}' `
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'rol eliminado'})
        }
    })

})

//modificar rol
rol.put('/:id',(req,res)=>{
    const{id}=req.params
    const{descripcionPuesto,accesos} = req.body
    let sql = `update Rol set 
                descripcionPuesto = '${descripcionPuesto}',
                accesos = '${accesos}'
                where idRol = '${id}'`

    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
        res.json({status:'rol modificado'})        }
    })                
})
//------------------------------------


module.exports=rol;