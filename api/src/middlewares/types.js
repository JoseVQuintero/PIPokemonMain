const { Router } = require("express");
const { Op, Types } = require("../db");
const { Sequelize } = require("sequelize");
const axios = require("axios").default;
const router = Router();

router.get("/", (req, res) => {
  axios
    .get("https://pokeapi.co/api/v2/type")
    .then(function (response) {
      //return Types.bulkCreate([...response.data.results, ...[{ name: 'prueba' }]], {
      return Types.bulkCreate(response.data.results, {
        upsertKeys: ["id"],
        updateOnDuplicate: ["name"]
      });
    })
    .then(() => {
        Types.findAll({
          attributes: ["name"],
          group: ["name"],
        })
        .then((types) => {
          return res.status(200).json(types);
        })
        .catch((response) => {
          return res.status(200).json([]);
        });;
    })
    .catch((response) => {
      return res.status(200).json([]);
    });
});

module.exports = router;