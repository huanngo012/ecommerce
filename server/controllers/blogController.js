const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category)
    throw new Error("Vui lòng nhập đầy đủ");
  const newBlog = await Blog.create(req.body);
  return res.status(200).json({
    success: newBlog ? true : false,
    createdBlog: newBlog ? newBlog : "Tạo blog thất bại",
  });
});
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().populate("likes", "firstname lastname");
  return res.status(200).json({
    success: blogs ? true : false,
    blogDatas: blogs ? blogs : "Lấy dữ liệu Blog thất bại",
  });
});

const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndUpdate(
    bid,
    { $inc: { numbersView: 1 } },
    { new: true }
  ).populate("likes", "firstname lastname");
  return res.status(200).json({
    success: blog ? true : false,
    blogData: blog ? blog : "Lấy dữ liệu Blog thất bại",
  });
});
const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0)
    throw new Error("Vui lòng nhập đầy đủ");
  const updatedBlog = await Blog.findByIdAndUpdate(bid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedBlog ? true : false,
    updatedBlog: updatedBlog ? updatedBlog : "Cập nhật Blog thất bại",
  });
});
const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const deletedBlog = await Blog.findByIdAndDelete(bid);
  return res.status(200).json({
    success: deletedBlog ? true : false,
    deletedBlog: deletedBlog ? deletedBlog : "Xóa Blog thất bại",
  });
});

const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.body;
  if (!bid) throw new Error("Vui lòng nhập đầy đủ");
  const blog = await Blog.findById(bid);
  const alreadyLike = blog?.likes?.find((el) => el.toString() === _id);
  if (alreadyLike) {
    blog.likes = blog.likes.filter((id) => id.toString() !== _id);
    await blog.save();

    return res.status(200).json({ message: "Xóa yêu thích thành công" });
  } else {
    blog.likes.push(_id);
    await blog.save();
    return res.status(200).json({ message: "Yêu thích thành công" });
  }
});

const uploadImageBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!req.file) throw new Error("Vui lòng nhập đầy đủ");
  const response = await Blog.findByIdAndUpdate(
    id,
    {
      image: req.file.path,
    },
    { new: true }
  );

  return res.status(200).json({
    success: response ? true : false,
    message: response ? response : "Upload ảnh Blog thất bại",
  });
});

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  uploadImageBlog,
};
