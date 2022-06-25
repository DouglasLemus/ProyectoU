const proveedor = require('express').Router()
const { Router } = require('express')
const conexion = require('./config/conexion')

//asignamos todas las proveedor-----------
//get proveedors
proveedor.get('/',(req,res)=>{
    let sql='select idProveedor,descripcion,numeroTelefono,correoelectronico,personacontacto,logo from Proveedor'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//get proveedor
proveedor.get('/:id',(req,res)=>{
    const {id} = req.params
    let sql='select idProveedor,descripcion,numeroTelefono,correoelectronico,personacontacto,logo from Proveedor where idProveedor = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//agregar proveedor
proveedor.post('/',(req,res)=>{
    const{descripcion,numeroTelefono,correoelectronico,personacontacto,logo} = req.body;

    let sql = `insert into Proveedor(descripcion,numeroTelefono,correoelectronico,personacontacto,logo) values ('${descripcion}','${numeroTelefono}','${correoelectronico}','${personacontacto}','${logo}')`
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'proveedor agregado'})
        }
    })
})

//Eliminar
proveedor.delete('/:id',(req,res)=>{
    const{id}=req.params

    let sql = `delete from Proveedor where idProveedor = '${id}' `
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'proveedor eliminado'})
        }
    })

})

//modificar
proveedor.put('/:id',(req,res)=>{
    const{id}=req.params
    const{numeroTelefono,personacontacto} = req.body
    let sql = `update Proveedor set 
                numeroTelefono = '${numeroTelefono}',
				personacontacto = '${personacontacto}'
				where idProveedor = '${id}'`

    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
        res.json({status:'proveedor modificado'})        }
    })                
})
//------------------------------------


module.exports=proveedor;