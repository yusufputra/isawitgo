const express = require("express");
const options = require("../db/connection");
const router = express.Router();
var knex = require("knex")(options);
const Joi = require("joi");

const schemalahan = Joi.object().keys({
  idPengajuan: Joi.number().integer().required(),
  jumlahslot: Joi.number().integer().required(),
});

router.get("/", (req, res) => {
  knex
    .select()
    .from("transaksi")
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
    knex("transaksi")
      .insert({
        idAcc: req.user.id,
        idPengajuan: req.body.idPengajuan,
        jumlahslot: req.body.jumlahslot,
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

router.post("/progres", (req, res) => {
  let transaksi = {};
  knex("transaksi")
    .where("id", "=", req.body.id)
    .then((ress) => {
      transaksi = ress;
      knex("lahanditawarkan")
        .where("id", "=", transaksi[0].id)
        .then((ress) => {
          res.json(ress);
        })
        .catch((error) => {
          res.json(error);
        });
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
