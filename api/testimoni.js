const express = require("express");
const options = require("../db/connection");
const router = express.Router();
var knex = require("knex")(options);
const Joi = require("joi");

const schemaTestimoni = Joi.object().keys({
  pesan: Joi.string().required(),
});

router.get("/", (req, res) => {
  knex
    .select(
      "account.id",
      "account.nama",
      "account.foto",
      "testimoni.pesan",
      "testimoni.createdAt"
    )
    .from("account")
    .join("testimoni", function () {
      this.on("account.id", "=", "testimoni.idAcc");
    })
    .then((ress) => {
      res.json({dataTestimoni: ress});
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/create", (req, res) => {
  console.log(req.body);
  const result = Joi.validate(req.body, schemaTestimoni);
  if (result.error === null) {
    knex("testimoni")
      .insert({
        idAcc: req.user.id,
        pesan: req.body.pesan,
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
