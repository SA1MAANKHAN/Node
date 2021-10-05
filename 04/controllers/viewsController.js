const Tour = require("../models/tourModel");
const catchAsync = require("../Utils/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
  // get tour data
  const tours = await Tour.find();

  // build template

  // render the templete using tour data
  res.status(200).render("overview", { title: "All tours", tours });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  const tour = await Tour.findOne({ slug }).populate({
    path: "reviews",
    fields: "review rating user",
  });

  res.status(200).render("tour", { title: `${tour.name} Tour`, tour });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render("login", { title: "Login in to your account" });
});
