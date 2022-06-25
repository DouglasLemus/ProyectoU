const { validationResult } = require('express-validator');

const User = require('../models/user')

const brcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) =>{
    const errores = validationResult(req);

    if(!errores.isEmpty()) return 

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try{

        const hashedPassword = await brcrypt.hash(password,12);

        const userDetails ={
            name : name,
            email: email,
            password:hashedPassword
        }

        const result = await User.save(userDetails);

        res.status(201).json({message : 'Usuario registrado!'})
    }catch (err){
        //handle
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.login = async (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;

    try{
        const user = await User.find(email);

        if(user[0].length != 1){
            const error = new Error('El usuario con el correo proporcionado no fue encontrado.');
            error.statusCode = 401;
            throw error;
        }

        const storedUser = user[0][0];

        const isEqual = await brcrypt.compare(password,storedUser.password);

        if(!isEqual){
            const error = new Error('Contraseña Incorrecta!');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
            email : storedUser.email,
            userId : storedUser.id
        },
        'secretfortoken',{
            expiresIn: '1h'
        }
        );

        res.status(200).json({token: token, userId: storedUser.id});


    }catch (err){
        //handle
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
    
}