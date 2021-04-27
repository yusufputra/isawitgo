const express = require("express");
const options = require("../db/connection");
const router = express.Router();
var knex = require("knex")(options);

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

module.exports = router;
