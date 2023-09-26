const ProductCategory = require("../models/productCateogry");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createCategory = asyncHandler(async (req, res) => {
  if (!req.body.title) throw new Error("Vui lòng nhập đầy đủ");
  const newCateProduct = await ProductCategory.create(req.body);
  return res.status(200).json({
    success: newCateProduct ? true : false,
    createdCategory: newCateProduct
      ? newCateProduct
      : "Tạo danh mục sản phẩm mới thất bại",
  });
});
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await ProductCategory.findById(id);
  return res.status(200).json({
    success: category ? true : false,
    categoryData: category
      ? category
      : "Lấy dữ liệu danh mục sản phẩm thất bại",
  });
});
const getCategories = asyncHandler(async (req, res) => {
  const categories = await ProductCategory.find();
  return res.status(200).json({
    success: categories ? true : false,
    categoryDatas: categories
      ? categories
      : "Lấy dữ liệu các danh mục sản phẩmthất bại",
  });
});
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0)
    throw new Error("Vui lòng nhập đầy đủ");
  const updatedCategory = await ProductCategory.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  );
  return res.status(200).json({
    success: updatedCategory ? true : false,
    updatedCategory: updatedCategory
      ? updatedCategory
      : "Cập nhật danh mục sản phẩm thất bại",
  });
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedCategory = await ProductCategory.findByIdAndDelete(id);
  return res.status(200).json({
    success: deletedCategory ? true : false,
    deletedCategory: deletedCategory
      ? deletedCategory
      : "Xóa danh mục sản phẩm thất bại",
  });
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
