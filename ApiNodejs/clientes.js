const cliente = require('express').Router()
const { Router } = require('express')
const conexion = require('./config/conexion')

//asignamos todas las cliente-----------
//get Clientes
cliente.get('/',(req,res)=>{
    let sql='select nombre,apellido,direccion,nit,telefono,email from Cliente'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//get Cliente
cliente.get('/:id',(req,res)=>{
    const {id} = req.params
    let sql='select nombre,apellido,direccion,nit,telefono,email from Cliente where idCliente = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//agregar Cliente
cliente.post('/',(req,res)=>{
    const{nombre,apellido,direccion,nit,telefono,email} = req.body;

    let sql = `insert into cliente(nombre,apellido,direccion,nit,telefono,email) values ('${nombre}','${apellido}','${direccion}','${nit}','${telefono}','${email}')`
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'Cliente agregado'})
        }
    })
})

//Eliminar
cliente.delete('/:id',(req,res)=>{
    const{id}=req.params

    let sql = `delete from cliente where idCliente = '${id}' `
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'Cliente eliminado'})
        }
    })

})

//modificar
cliente.put('/:id',(req,res)=>{
    const{id}=req.params
    const{descripcion,logo} = req.body
    let sql = `update Cliente set 
                descripcion = '${descripcion}',
                telefono = '${telefono}' where idMaquina = '${id}'`

    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
        res.json({status:'Cliente modificado'})        }
    })                
})
//------------------------------------


module.exports=cliente;
