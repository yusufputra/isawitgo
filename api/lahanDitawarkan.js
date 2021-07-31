const express = require("express");
const options = require("../db/connection");
const router = express.Router();
var knex = require("knex")(options);
const Joi = require("joi");

const schemaporto = Joi.object().keys({
  idPengajuan: Joi.number().integer().required(),
  namaKelompokTani: Joi.string().required(),
  deskripsi: Joi.string().required(),
  dokumenPros: Joi.string().required(),
  foto: Joi.string().required(),
  jumlahSlot: Joi.number().integer().required(),
  pohonSawit: Joi.string().required(),
  lokasi: Joi.string().required(),
  harga: Joi.number().integer().required(),
  periodeKontrak: Joi.number().integer().required(),
  jumlahPembiayaan: Joi.number().integer().required(),
  periodeBagiHasil: Joi.number().integer().required(),
  pa: Joi.number().integer().required(),
  minBeliSlot: Joi.number().integer().required(),
});

router.get("/", (req, res) => {
  knex
    .select()
    .from("lahanditawarkan")
    .then((ress) => {
      res.json({dataLahan:ress});
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/byid", (req, res) => {
  knex
    .select()
    .from("lahanditawarkan")
    .where({
      id: req.body.id
    })
    .then((ress) => {
      res.json(ress[0]);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/create", (req, res) => {
  console.log(req.body);
  const result = Joi.validate(req.body, schemaporto);
  if (result.error === null) {
    knex("lahanditawarkan")
      .insert({
        idAcc: req.user.id,
        idPengajuan: req.body.idPengajuan,
        namaKelompokTani: req.body.namaKelompokTani,
        deskripsi: req.body.deskripsi,
        dokumenPros: req.body.dokumenPros,
        foto: req.body.foto,
        jumlahSlot: req.body.jumlahSlot,
        pohonSawit: req.body.pohonSawit,
        lokasi: req.body.lokasi,
        harga: req.body.harga,
        periodeKontrak: req.body.periodeKontrak,
        jumlahPembiayaan: req.body.jumlahPembiayaan,
        periodeBagiHasil: req.body.periodeBagiHasil,
        pa: req.body.pa,
        minBeliSlot: req.body.minBeliSlot,
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
