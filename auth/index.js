const express = require("express");
const options = require("../db/connection");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var knex = require("knex")(options);

const schema = Joi.object().keys({
  nama: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(8).required().required(),
  nohp: Joi.number().integer(),
  pin: Joi.number().integer(),
  role: Joi.number().required(),
  foto: Joi.string(),
});

const loginschema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
});

router.get("/", (req, res) => {
  knex
    .select()
    .from("account")
    .then((rows) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/signup", (req, res, next) => {
  let query = "select * from account where email ='" + req.body.email + "'";
  const result = Joi.validate(req.body, schema);
  // console.log(result);
  // res.json({
  //   message: result,
  // });
  if (result.error === null) {
    knex.schema.raw(query).then((rows) => {
      console.log(rows);
      if (rows[0].length != 0) {
        const error = new Error("email sudah dibuat");
        res.status(409);
        next(error);
      } else {
        bcrypt.hash(req.body.password, 12).then(async (hashedPassword) => {
          // const newUser = {
          //     nama: req.body.nama,
          //     email: req.body.email,
          //     password: hashedPassword
          // };
          const queryUser =
            "INSERT INTO account (nama,email,password,nohp,pin,role,foto) values('" +
            req.body.nama +
            "','" +
            req.body.email +
            "','" +
            hashedPassword +
            "','" +
            req.body.nohp +
            "','" +
            req.body.pin +
            "','" +
            req.body.role +
            "','" +
            req.body.foto +
            "')";
          await knex.schema.raw(queryUser);
        });
        res.json({
          message: "suskes coy",
        });
      }
    });
  } else {
    console.log(result);
    res.status(400).json({
      message: result.error,
    });
  }
});

router.post("/login", (req, res, next) => {
  const result = Joi.validate(req.body, loginschema);
  if (result.error === null) {
    knex.schema
      .raw("SELECT * FROM account WHERE email ='" + req.body.email + "'")
      .then((ress) => {
        let user = JSON.parse(JSON.stringify(ress[0]))[0];
        console.log(req.body);
        bcrypt.compare(req.body.password, user.password).then((result) => {
          if (result) {
            const payload = {
              id: user.id,
              nama: user.nama,
              email: user.email,
              nohp: user.nohp,
              role: user.role,
            };
            console.log(process.env.TOKEN_SECRET);
            jwt.sign(
              payload,
              process.env.TOKEN_SECRET,
              {
                expiresIn: "1d",
              },
              (err, token) => {
                if (err) {
                  res.status(422);
                  const error = new Error(err);
                  next(error);
                } else {
                  res.json({ token });
                }
              }
            );
          } else {
            res.status(422);
            const error = new Error("wrong password");
            next(error);
          }
        });
      })
      .catch((err) => {
        res.status(410);
        const error = new Error("Email Not Fond");
        next(error);
      });
  } else {
    res.json(result.error);
  }
});

module.exports = router;
