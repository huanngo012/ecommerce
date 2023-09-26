const BlogCategory = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createCategory = asyncHandler(async (req, res) => {
  if (!req.body.title) throw new Error("Vui lòng nhập đầy đủ");
  const newCateBlog = await BlogCategory.create(req.body);
  return res.status(200).json({
    success: newCateBlog ? true : false,
    createdCategory: newCateBlog
      ? newCateBlog
      : "Tạo danh mục bài viết mới thất bại",
  });
});
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await BlogCategory.findById(id);
  return res.status(200).json({
    success: category ? true : false,
    categoryData: category
      ? category
      : "Lấy dữ liệu danh mục bài viết thất bại",
  });
});
// Filtering, sorting & pagination
const getCategories = asyncHandler(async (req, res) => {
  const categories = await BlogCategory.find();
  return res.status(200).json({
    success: categories ? true : false,
    categoryDatas: categories
      ? categories
      : "Lấy dữ liệu các danh mục bài viết thất bại",
  });
});
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedCategory = await BlogCategory.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedCategory ? true : false,
    updatedCategory: updatedCategory
      ? updatedCategory
      : "Cập nhật danh mục bài viết thất bại",
  });
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedCategory = await BlogCategory.findByIdAndDelete(id);
  return res.status(200).json({
    success: deletedCategory ? true : false,
    deletedCategory: deletedCategory
      ? deletedCategory
      : "Xóa danh mục bài viết thất bại",
  });
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
