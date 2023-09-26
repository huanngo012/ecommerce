const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  const userCart = await User.findById(_id)
    .select("cart address")
    .populate("cart.product", "title price images");
  const products = userCart?.cart?.map((el) => ({
    product: el.product._id,
    count: el.quantity,
    color: el.color,
  }));
  let total = userCart?.cart?.reduce(
    (sum, el) => el.product.price * el.quantity + sum,
    0
  );
  const createData = { products, total, orderBy: _id };
  if (coupon) {
    const selectedCoupon = await Coupon.findById(coupon);
    total =
      Math.round((total * (1 - selectedCoupon?.discount / 100)) / 10) * 10;
    createData.total = total;
    createData.coupon = coupon;
  }
  const rs = await Order.create(createData);

  return res.status(200).json({
    success: rs ? true : false,
    createdOrder: rs ? rs : "Tạo đơn hàng mới thất bại",
  });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Vui lòng nhập đầy đủ");
  const response = await Order.findByIdAndUpdate(id, { status }, { new: true });

  return res.status(200).json({
    success: response ? true : false,
    createdOrder: response ? response : "Cập nhật trạng thái đơn hàng thất bại",
  });
});

const getUserOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const orders = await Order.find({ orderBy: _id });

  return res.status(200).json({
    success: orders ? true : false,
    createdOrder: orders ? orders : "Lấy dữ liệu đơn hàng thất bại",
  });
});
const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const orders = await Order.find();

  return res.status(200).json({
    success: orders ? true : false,
    createdOrder: orders ? orders : "Lấy dữ liệu đơn hàng thất bại",
  });
});

module.exports = {
  createOrder,
  updateStatus,
  getOrders,
  getUserOrder,
};
