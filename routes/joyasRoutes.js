const express = require("express");
const router = express.Router();
const { getJoyas, getJoyasFiltradas } = require("../controllers/joyasController");

router.get("/", getJoyas);
router.get("/filtros", getJoyasFiltradas);

module.exports = router;
