const express = require("express");

const router = express.Router();
const productControler= require("../controllers/productControler");
const { verifyToken } = require('../middleware/authMiddleware');
router.route("/").get(verifyToken,productControler.getProduct).post(productControler.createProduct);
router.route("/:id").patch(verifyToken,productControler.updateProducr);
module.exports = router;


