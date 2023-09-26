const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body;
  if (!name || !discount || !expiry) throw new Error("Vui lòng nhập đầy đủ");
  const newCoupon = await Coupon.create({
    ...req.body,
    expiry: Date.now() + expiry * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    success: newCoupon ? true : false,
    createdCoupon: newCoupon ? newCoupon : "Tạo mới Phiếu giảm giá thất bại",
  });
});
const getCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const Coupon = await Coupon.findById(id);
  return res.status(200).json({
    success: Coupon ? true : false,
    CouponData: Coupon ? Coupon : "Lấy dữ liệu thất bại",
  });
});

const getCoupons = asyncHandler(async (req, res) => {
  const Coupons = await Coupon.find().select("-createdAt -updatedAt");
  return res.status(200).json({
    success: Coupons ? true : false,
    CouponDatas: Coupons ? Coupons : "Lấy dữ liệu thất bại",
  });
});
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0)
    throw new Error("Vui lòng nhập đầy đủ");
  if (req.body.expiry) {
    req.body.expiry = Date.now() + req.body.expiry * 24 * 60 * 60 * 1000;
  }
  const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedCoupon ? true : false,
    updatedCoupon: updatedCoupon ? updatedCoupon : "Cập nhật thất bại",
  });
});
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedCoupon = await Coupon.findByIdAndDelete(id);
  return res.status(200).json({
    success: deletedCoupon ? true : false,
    deletedCoupon: deletedCoupon ? deletedCoupon : "Xóa thất bại",
  });
});

module.exports = {
  createCoupon,
  getCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
};
