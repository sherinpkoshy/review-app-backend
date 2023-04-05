const express = require("express");

const {
  uploadTrailer,
  createMovie,
  updateMovie,
  removeMovie,
  getMovies,
  getMovieForUpdates,
  searchMovies,
  getLatestUploads,
  getSingleMovie,
  getRelatedMovies,
  getTopRatedMovies,
  searchPublicMovies,
} = require("../controllers/movie");

const { isAuth, isAdmin } = require("../middlewares/auth");
const { uploadVideo, uploadImage } = require("../middlewares/multer");
const {
  validateMovie,
  validate,
  validateTrailer,
} = require("../middlewares/validator");
const { parseData } = require("../utils/helper");
const router = express.Router();

router.post(
  "/upload-trailer",
  isAuth,
  isAdmin,
  uploadVideo.single("video"),
  uploadTrailer
);

router.post(
  "/create",
  isAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseData,
  validateMovie,
  validateTrailer,
  validate,
  createMovie
);

// router.patch(
//   "/update-movie-without-poster/:movieId",
//   isAuth,
//   isAdmin,
//   //   parseData,
//   validateMovie,
//   validate,
//   updateMovieWithoutPoster
// );

router.patch(
  "/update/:movieId",
  isAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseData,
  validateMovie,
  validate,
  updateMovie
);

router.delete("/:movieId", isAuth, isAdmin, removeMovie);
router.get("/movies", isAuth, isAdmin, getMovies);
router.get("/movies/for-update/:movieId", isAuth, isAdmin, getMovieForUpdates);
router.get("/search", isAuth, isAdmin, searchMovies);

// For normal users
router.get("/latest-uploads", getLatestUploads);
router.get("/single/:movieId", getSingleMovie);
router.get("/related/:movieId", getRelatedMovies);
router.get("/top-rated", getTopRatedMovies);
router.get("/search-public", searchPublicMovies);

module.exports = router;
