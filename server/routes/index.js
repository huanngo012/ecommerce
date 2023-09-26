const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const productCategoryRouter = require("./productCategoryRouter");
const blogRouter = require("./blogRouter");
const blogCategoryRouter = require("./blogCategoryRouter");
const brandRouter = require("./brandRouter");
const couponRouter = require("./couponRouter");
const billRouter = require("./billRouter");
const orderRouter = require("./orderRouter");
const { notFound, errHandler } = require("../middlewares/errHandler");

const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/product-category", productCategoryRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/blog-category", blogCategoryRouter);
  app.use("/api/brand", brandRouter);
  app.use("/api/coupon", couponRouter);
  app.use("/api/bill", billRouter);
  app.use("/api/order", orderRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
