const express = require('express');

const {body} = require('express-validator');

const router = express.Router()

const User = require('../models/user');

const authController = require('../controllers/auth')

router.post(
    '/signup',[
        body('name').trim().not().isEmpty(),
        body('email').isEmail().withMessage('Por favor ingresa un email valido').custom(async (email) =>{
            const user = await User.find(email);
            if(user[0].length > 0){
                return Promise.reject('El correo ingresado ya existe');
            }
        })
        .normalizeEmail(),
        body('password').trim().isLength({min: 7})
    ], authController.signup
);

router.post('/login',authController.login);

module.exports = router;