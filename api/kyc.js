const express = require("express");
const options = require("../db/connection");
const router = express.Router();
var knex = require("knex")(options);
const Joi = require("joi");

const schemakyc = Joi.object().keys({
  nama: Joi.string().required(),
  alamat: Joi.string().required(),
  nik: Joi.number().integer().required(),
  fotoktp: Joi.string().required(),
  pekerjaan: Joi.string().required(),
  pendapatan: Joi.number().integer().required(),
  bank: Joi.string().required(),
  norek: Joi.number().integer().required(),
  npwp: Joi.number().integer(),
  jenisKelamin: Joi.string().required(),
  ttl: Joi.string().required(),
  agama: Joi.string().required(),
  pendidikan: Joi.string().required(),
  bidangPekerjaan: Joi.string().required(),
});

router.get("/", (req, res) => {
  knex
    .select()
    .from("kyc")
    .then((ress) => {
      res.json(ress);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/create", (req, res) => {
  console.log(req.body);
  const result = Joi.validate(req.body, schemakyc);
  if (result.error === null) {
    knex("kyc")
      .insert({
        idAcc: req.user.id,
        nama: req.body.nama,
        alamat: req.body.alamat,
        nik: req.body.nik,
        fotoktp: req.body.fotoktp,
        pekerjaan: req.body.pekerjaan,
        pendapatan: req.body.pendapatan,
        bank: req.body.bank,
        norek: req.body.norek,
        npwp: req.body.npwp,
        jenisKelamin: req.body.jenisKelamin,
        TTL: req.body.ttl,
        agama: req.body.agama,
        pendidikan: req.body.pendidikan,
        bidangPekerjaan: req.body.bidangPekerjaan,
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
