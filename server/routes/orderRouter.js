const router = require("express").Router();
const ctrls = require("../controllers/orderController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken], ctrls.createOrder);
router.put("/status/:id", [verifyAccessToken, isAdmin], ctrls.updateStatus);
router.get("/", verifyAccessToken, ctrls.getUserOrder);
router.get("/admin", [verifyAccessToken, isAdmin], ctrls.getOrders);

// router.put("/:pid", [verifyAccessToken, isAdmin], ctrls.updateProduct);
// router.delete("/:pid", [verifyAccessToken, isAdmin], ctrls.deleteProduct);
// router.get("/:pid", ctrls.getProduct);

module.exports = router;
