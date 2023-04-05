const Movie = require("../models/movie");
const Review = require("../models/review");
const User = require("../models/user");
const { getAverageRatings } = require("../utils/helper");

exports.getAppInfo = async (req, res) => {
  const movieCount = await Movie.countDocuments();
  const reviewCount = await Review.countDocuments();
  const userCount = await User.countDocuments();

  res.json({ appInfo: { movieCount, reviewCount, userCount } });
};

exports.getMostRated = async (req, res) => {
  const { type = "Short Film" } = req.query;
  const matchOptions = {
    reviews: { $exists: true },
    status: { $eq: "public" },
  };
  if (type) matchOptions.type = { $eq: type };
  const movies = await Movie.aggregate([
    {
      $lookup: {
        from: "Movie",
        localField: "reviews",
        foreignField: "_id",
        as: "topRated",
      },
    },
    {
      $match: matchOptions,
    },
    {
      $project: {
        title: 1,
        poster: "$poster.url",
        responsivePosters: "$poster.responsive",
        reviewCount: { $size: "$reviews" },
      },
    },
    {
      $sort: {
        reviewCount: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);

  const topRatedMovies = await Promise.all(
    movies.map(async (m) => {
      const reviews = await getAverageRatings(m._id);
      return {
        id: m._id,
        title: m.title,
        reviews: { ...reviews },
      };
    })
  );
  res.json({ movies: topRatedMovies });
};
