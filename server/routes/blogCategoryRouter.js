const router = require("express").Router();
const ctrls = require("../controllers/blogCategoryController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken], ctrls.createCategory);
router.get("/", ctrls.getCategories);

router.put("/:id", [verifyAccessToken], ctrls.updateCategory);
router.delete("/:id", [verifyAccessToken], ctrls.deleteCategory);
router.get("/:id", ctrls.getCategory);

module.exports = router;
