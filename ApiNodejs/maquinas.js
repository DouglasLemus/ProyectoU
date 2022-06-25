const maquinas = require('express').Router()
const { Router } = require('express')
const conexion = require('./config/conexion')

//asignamos todas las maquinas-----------
//get equipos
maquinas.get('/',(req,res)=>{
    let sql='select * from Maquinas'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//get equipo
maquinas.get('/:id',(req,res)=>{
    const {id} = req.params
    let sql='select * from Maquinas where idMaquina = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//agregar equipo
maquinas.post('/',(req,res)=>{
    const{descripcion,logo,costoHora,cantidadDisponible,costoHoraOperador,horasdeUso,estado,costoVenta,idProveedor} = req.body;

    let sql = `insert into Maquinas(descripcion,logo,costoHora,cantidadDisponible,costoHoraOperador,horasdeUso,estado,costoVenta,idProveedor) values ('${descripcion}','${logo}','${costoHora}','${cantidadDisponible}','${costoHoraOperador}','${horasdeUso}','${estado}','${costoVenta}','${idProveedor}')`
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'equipo agregado'})
        }
    })
})

//Eliminar
maquinas.delete('/:id',(req,res)=>{
    const{id}=req.params

    let sql = `delete from Maquinas where idMaquina = '${id}' `
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status:'equipo eliminado'})
        }
    })

})

//modificar
maquinas.put('/:id',(req,res)=>{
    const{id}=req.params
    const{descripcion,logo,costoHora} = req.body
    let sql = `update Maquinas set 
                descripcion = '${descripcion}',
                logo = '${logo}', costoHora = '${costoHora}' where idMaquina = '${id}'`

    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
        res.json({status:'equipo modificado'})        }
    })                
})
//------------------------------------


module.exports=maquinas;