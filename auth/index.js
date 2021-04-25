const express = require('express');
const options = require('../db/connection');
const router = express.Router();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


var knex = require('knex')(options);

const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().min(8).required()
});

const loginschema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().min(8).required()
});

router.get('/', (req, res) => {
    knex.select().from('Users').then(rows => {
        res.status(200).json(rows);
    }).catch((err) => {
        res.status(500).json(err);
    })
});


router.post('/signup', (req, res, next) => {
    let query = "select * from users where username ='" + req.body.username + "'";
    const result = Joi.validate(req.body, schema);
    if (result.error === null) {
        knex.schema.raw(query).then(rows => {
            console.log(rows);
            if (rows.length != 0) {
                const error = new Error('Username sudah dibuat');
                res.status(409);
                next(error);
            }
            else {
                bcrypt.hash(req.body.password, 12).then(async (hashedPassword) => {
                    const newUser = {
                        username: req.body.username,
                        email: req.body.email,
                        password: hashedPassword
                    };
                    const queryUser = "INSERT INTO users (username,email,password) values('" + newUser.username + "','" + newUser.email + "','" + newUser.password + "')"
                    await knex.schema.raw(queryUser);
                })
                res.json({
                    message: 'suskes coy'
                })
            }
        })
    }
    else {
        console.log(result)
        res.json({
            message: "Hello"
        })
    }
})


router.post('/login', (req, res, next) => {
    
    const result = Joi.validate(req.body, loginschema);
    if (result.error === null) {
        knex.schema.raw("SELECT * FROM users WHERE email ='" + req.body.email + "'")
            .then(ress => {
                console.log(ress)
                console.log(req.body)
                bcrypt.compare(req.body.password, ress[0].password).then(result => {
                    if (result) {

                        const payload = {
                            _id: ress[0].idUser,
                            username: ress[0].username
                        };
                        console.log(process.env.TOKEN_SECRET);
                        jwt.sign(payload, process.env.TOKEN_SECRET, {
                            expiresIn: '1d'
                        }, (err, token) => {
                            if (err) {
                                res.status(422);
                                const error = new Error(err);
                                next(error);
                            }
                            else {
                                res.json(token);
                            }
                        });
                    }
                    else {
                        res.status(422);
                        const error = new Error('wrong password');
                        next(error);
                    }
                })
            }).catch(err => {
                res.status(410);
                const error = new Error('Username Not Fond');
                next(error);
            });
    }else{
         res.json(result.error);
    }
});

module.exports = router;