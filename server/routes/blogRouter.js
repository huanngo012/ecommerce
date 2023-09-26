const router = require("express").Router();
const ctrls = require("../controllers/blogController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");

router.post("/", [verifyAccessToken], ctrls.createBlog);
router.get("/", ctrls.getBlogs);
router.get("/:bid", ctrls.getBlog);
router.put("/like", verifyAccessToken, ctrls.likeBlog);

router.put("/:bid", [verifyAccessToken], ctrls.updateBlog);
router.delete("/:bid", [verifyAccessToken], ctrls.deleteBlog);

router.put(
  "/upload-image/:id",
  [verifyAccessToken, isAdmin],
  uploader.single("image"),
  ctrls.uploadImageBlog
);

module.exports = router;
