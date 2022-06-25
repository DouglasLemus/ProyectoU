const empresa = require('express').Router()
const { Router } = require('express')
const conexion = require('./config/conexion')

//asignamos todas las rutas-----------
//get empresa
empresa.get('/',(req,res)=>{
    let sql='select nombre,direccion,numeroTelefono,correo from Empresa'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//get equipo
empresa.get('/:id',(req,res)=>{
    const {id} = req.params
    let sql='select nombre,direccion,numeroTelefono,correo from Empresa where idEmpresa = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//agregar equipo
empresa.post('/',(req,res)=>{
    const{nombre,direccion,numeroTelefono,correo} = req.body;

    let sql = `insert into Empresa(nombre,direccion,numeroTelefono,correo) values ('${nombre}','${direccion}','${numeroTelefono}','${correo}')`
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'empresa agregado'})
        }
    })
})

//Eliminar
empresa.delete('/:id',(req,res)=>{
    const{id}=req.params

    let sql = `delete from Empresa where idEmpresa = '${id}' `
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'empresa eliminado'})
        }
    })

})

//modificar
empresa.put('/:id',(req,res)=>{
    const{id}=req.params
    const{direccion,numeroTelefono,correo} = req.body
    let sql = `update Empresa set 
                direccion = '${direccion}',
                numeroTelefono = '${numeroTelefono}',
                correo= '${correo}'
                where idEmpresa = '${id}'`

    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
        res.json({status:'empresa modificado'})        }
    })                
})
//------------------------------------


module.exports=empresa;