const router = require("express").Router();
const ctrls = require("../controllers/couponController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createCoupon);
router.get("/", ctrls.getCoupons);

router.put("/:id", [verifyAccessToken, isAdmin], ctrls.updateCoupon);
router.delete("/:id", [verifyAccessToken, isAdmin], ctrls.deleteCoupon);
router.get("/:id", ctrls.getCoupon);

module.exports = router;
