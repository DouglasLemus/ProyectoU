const users = require('express').Router()
const { Router } = require('express')
const conexion = require('./config/conexion')

//asignamos todas las users-----------
//get userss
users.get('/',(req,res)=>{
    let sql='select * from users'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//get users
users.get('/:id',(req,res)=>{
    const {id} = req.params
    let sql='select * from users where idUser = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//agregar users
users.post('/',(req,res)=>{
    const{name,email,password,fotografia} = req.body;

    let sql = `insert into users(name,email,password,fotografia) values ('${name}','${email}','${password}','${fotografia}')`
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'users agregado'})
        }
    })
})

//Eliminar
users.delete('/:id',(req,res)=>{
    const{id}=req.params

    let sql = `delete from users where idUser = '${id}' `
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'users eliminado'})
        }
    })

})

//modificar
users.put('/:id',(req,res)=>{
    const{id}=req.params
    const{email,password,fotografia} = req.body
    let sql = `update users set 
                email = '${email}',
				password = '${password}',fotografia = '${fotografia}'
				where idUser = '${id}'`

    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
        res.json({status:'users modificado'})        }
    })                
})
//------------------------------------


module.exports=users;