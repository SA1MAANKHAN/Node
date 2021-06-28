const Review = require("../models/reviewsModel");
// const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const factory = require("./handlerFactory");

// exports.getAllReviews = catchAsync(async (req, res, next) => {
//   let filter = {};

//   if (req.params.tourId) filter = { tour: req.params.tourId };

//   const reviews = await Review.find(filter);

//   res.status(200).json({
//     status: "success",
//     requestedAt: res.requestTime,
//     results: reviews.length,
//     data: {
//       reviews,
//     },
//   });
// });

exports.setTourUserId = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.createReview = factory.createOne(Review);

exports.deleteReview = factory.deleteOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.getReview = factory.getOne(Review);

exports.getAllReviews = factory.getAll(Review);
