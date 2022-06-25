const contacto = require('express').Router()
const { Router } = require('express')
const conexion = require('./config/conexion')

//asignamos todas las contacto-----------
//get contactos
contacto.get('/',(req,res)=>{
    let sql='select nombre,apellido,parentesco,numeroTelefono from contactoEmergencia'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//get contacto
contacto.get('/:id',(req,res)=>{
    const {id} = req.params
    let sql='select nombre,apellido,parentesco,numeroTelefono from contactoEmergencia where idContactoEmergencia = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//agregar contacto
contacto.post('/',(req,res)=>{
    const{nombre,apellido,parentesco,numeroTelefono} = req.body;

    let sql = `insert into contactoEmergencia(nombre,apellido,parentesco,numeroTelefono) values ('${nombre}','${apellido}','${parentesco}','${numeroTelefono}')`
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'contacto agregado'})
        }
    })
})

//Eliminar
contacto.delete('/:id',(req,res)=>{
    const{id}=req.params

    let sql = `delete from contactoEmergencia where idContactoEmergencia = '${id}' `
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'contacto eliminado'})
        }
    })

})

//modificar
contacto.put('/:id',(req,res)=>{
    const{id}=req.params
    const{numeroTelefono} = req.body
    let sql = `update contactoEmergencia set 
                numeroTelefono = '${numeroTelefono}'
				where idContactoEmergencia = '${id}'`

    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
        res.json({status:'contacto modificado'})        }
    })                
})
//------------------------------------


module.exports=contacto;