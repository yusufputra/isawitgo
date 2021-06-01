const express = require("express");
const options = require("../db/connection");
const router = express.Router();
var knex = require("knex")(options);
const Joi = require("joi");

const schemaporto = Joi.object().keys({
  kategori: Joi.string().required(),
  namaKelompokTani: Joi.string().required(),
  penerimaPinjaman: Joi.string().required(),
  jumlahSlot: Joi.number().integer().required(),
  lokasi: Joi.string().required(),
  deskripsi: Joi.string().required(),
  dokumenpros: Joi.string().required(),
  foto: Joi.string().required(),
  jenisPohon: Joi.string().required(),
  longitude: Joi.string().required(),
  latt: Joi.string().required(),
  luasLahan: Joi.number().integer().required(),
  jumlahPohon: Joi.number().integer().required(),
  harga: Joi.number().integer().required(),
  periodeKontrak: Joi.number().integer().required(),
  jumlahPembiayaan: Joi.number().integer().required(),
  periodeBagiHasil: Joi.number().integer().required(),
  pa: Joi.number().integer().required(),
  minimPembelian: Joi.number().integer().required(),
});

router.get("/", (req, res) => {
  knex
    .select()
    .from("portofolio")
    .then((ress) => {
      res.json(ress);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/create", (req, res) => {
  console.log(req.body);
  const result = Joi.validate(req.body, schemaporto);
  if (result.error === null) {
    knex("portofolio")
      .insert({
        idAcc: req.user.id,
        kategori: req.body.kategori,
        namaKelompokTani: req.body.namaKelompokTani,
        penerimaPinjaman: req.body.penerimaPinjaman,
        jumlahSlot: req.body.jumlahSlot,
        lokasi: req.body.lokasi,
        deskripsi: req.body.deskripsi,
        dokumenpros: req.body.dokumenpros,
        foto: req.body.foto,
        jenisPohon: req.body.jenisPohon,
        longitude: req.body.longitude,
        latt: req.body.latt,
        luasLahan: req.body.luasLahan,
        jumlahPohon: req.body.jumlahPohon,
        harga: req.body.harga,
        periodeKontrak: req.body.periodeKontrak,
        jumlahPembiayaan: req.body.jumlahPembiayaan,
        periodeBagiHasil: req.body.periodeBagiHasil,
        pa: req.body.pa,
        minimPembelian: req.body.minimPembelian,
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
