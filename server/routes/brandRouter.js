const router = require("express").Router();
const ctrls = require("../controllers/brandController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createBrand);
router.get("/", ctrls.getBrands);

router.put("/:id", [verifyAccessToken, isAdmin], ctrls.updateBrand);
router.delete("/:id", [verifyAccessToken, isAdmin], ctrls.deleteBrand);
router.get("/:id", ctrls.getBrand);

module.exports = router;
