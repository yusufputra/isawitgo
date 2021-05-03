const express = require("express");
const options = require("../db/connection");
const router = express.Router();
var knex = require("knex")(options);
const Joi = require("joi");

const schemalahan = Joi.object().keys({
  idLahan: Joi.number().integer(),
  idKyc: Joi.number().integer(),
  namaKelompok: Joi.string().required(),
  jumlahPetani: Joi.number().integer().required(),
  periodeKontrak: Joi.number().integer().required(),
  periodeBagiHasil: Joi.number().integer().required(),
  jumlahPermohonanDana: Joi.number().integer().required(),
  tanggalMulai: Joi.string().required(),
  dokumenPengajuan: Joi.string().required(),
});

router.get("/", (req, res) => {
  knex
    .select()
    .from("pengajuanpembiayaan")
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
    knex("pengajuanpembiayaan")
      .insert({
        idAcc: req.user.id,
        idKyc: req.body.idKyc,
        idLahan: req.body.idLahan,
        namaKelompok: req.body.namaKelompok,
        jumlahPetani: req.body.jumlahPetani,
        periodeKontrak: req.body.periodeKontrak,
        periodeBagiHasil: req.body.periodeBagiHasil,
        jumlahPermohonanDana: req.body.jumlahPermohonanDana,
        tanggalMulai: req.body.tanggalMulai,
        dokumenPengajuan: req.body.dokumenPengajuan,
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

router.post("/update", (req, res) => {
  knex("pengajuanpembiayaan")
    .where("id", "=", req.body.id)
    .update({
      totalSlot: req.body.totalSlot,
      approved: req.body.approved,
    })
    .then((ress) => {
      res.json(ress);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
