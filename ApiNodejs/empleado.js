const usuarios = require('express').Router()
const { Router } = require('express')
const conexion = require('./config/conexion')

//asignamos todas las rutas-----------
//get usuarios
usuarios.get('/',(req,res)=>{
    let sql='select idEmpleado,nombre,apellido,numeroTelefono,tipoDeSangre,fotografia from Empleados'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//get equipo
usuarios.get('/:id',(req,res)=>{
    const {id} = req.params
    let sql='select idEmpleado,nombre,apellido,numeroTelefono,tipoDeSangre,fotografia from Empleados where idEmpleado = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//agregar equipo
usuarios.post('/',(req,res)=>{
    const{nombre,apellido,numeroTelefono,tipoDeSangre,fotografia} = req.body;

    let sql = `insert into Empleados(nombre,apellido,numeroTelefono,tipoDeSangre,fotografia) values ('${nombre}','${apellido}','${numeroTelefono}','${tipoDeSangre}','${fotografia}')`
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'usuarios agregado'})
        }
    })
})

//Eliminar
usuarios.delete('/:id',(req,res)=>{
    const{id}=req.params

    let sql = `delete from Empleados where idEmpleado = '${id}' `
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'usuarios eliminado'})
        }
    })

})

//modificar
usuarios.put('/:id',(req,res)=>{
    const{id}=req.params
    const{numeroTelefono,fotografia} = req.body
    let sql = `update Empleados set 
                numeroTelefono = '${numeroTelefono}',fotografia = '${fotografia}'
                where idEmpleado = '${id}'`

    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
        res.json({status:'usuarios modificado'})        }
    })                
})
//------------------------------------


module.exports=usuarios;