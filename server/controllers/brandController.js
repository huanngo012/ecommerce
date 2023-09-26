const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createBrand = asyncHandler(async (req, res) => {
  if (!req.body.title) throw new Error("Vui lòng nhập đầy đủ");
  const newBrand = await Brand.create(req.body);
  return res.status(200).json({
    success: newBrand ? true : false,
    createdBrand: newBrand ? newBrand : "Tạo thương hiệu mới thất bại",
  });
});
const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  return res.status(200).json({
    success: brand ? true : false,
    brandData: brand ? brand : "Lấy dữ liệu thương hiệu thất bại",
  });
});

const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  return res.status(200).json({
    success: brands ? true : false,
    brandDatas: brands ? brands : "Lấy dữ liệu các thương hiệu thất bại",
  });
});
const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0)
    throw new Error("Vui lòng nhập đầy đủ");
  const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedBrand ? true : false,
    updatedBrand: updatedBrand ? updatedBrand : "Cập nhật thương hiệu thất bại",
  });
});
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedBrand = await Brand.findByIdAndDelete(id);
  return res.status(200).json({
    success: deletedBrand ? true : false,
    deletedBrand: deletedBrand ? deletedBrand : "Xóa thương hiệu thất bại",
  });
});

module.exports = {
  createBrand,
  getBrand,
  getBrands,
  updateBrand,
  deleteBrand,
};
