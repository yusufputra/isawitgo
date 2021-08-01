const express = require("express");
const options = require("../db/connection");
const router = express.Router();
var knex = require("knex")(options);
const Joi = require("joi");

const schemalahan = Joi.object().keys({
  idKyc: Joi.number().integer(),
  nama: Joi.string().required(),
  foto: Joi.string().required(),
  status: Joi.string().required(),
  lokasi: Joi.string().required(),
  longi: Joi.string(),
  lat: Joi.string(),
  luas: Joi.number().integer().required(),
  jumlahpohon: Joi.number().integer().required(),
  jenispohon: Joi.string().required(),
});

router.get("/", (req, res) => {
  knex
    .select()
    .from("lahansawit")
    .then((ress) => {
      res.json(ress);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/create", (req, res) => {
  console.log(req.body);
  const result = Joi.validate(req.body, schemalahan);
  if (result.error === null) {
    knex("lahansawit")
      .insert({
        idAcc: req.user.id,
        idKyc: req.body.idKyc,
        nama: req.body.nama,
        foto: req.body.foto,
        status: req.body.status,
        lokasi: req.body.lokasi,
        longi: req.body.longi,
        lat: req.body.lat,
        luas: req.body.luas,
        jumlahPohon: req.body.jumlahpohon,
        jenisPohon: req.body.jenispohon,
      })
      .then((ress) => {
        res.json(ress);
      })
      .catch((err) => {
        console.log("ini error");
        res.status(400).json(err);
      });
  } else {
    console.log("ini error3");
    res.status(400).json(result.error);
  }
});

module.exports = router;
