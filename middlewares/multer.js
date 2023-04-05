const multer = require("multer");
const storage = multer.diskStorage({});

const imageFileFilter = (req, file, cb) => {
  if (!file.mimetype.includes("image")) {
    cb("Only image file is supported", false);
  }
  cb(null, true);
};
const videoFileFilter = (req, file, cb) => {
  if (!file.mimetype.includes("video")) {
    cb("Only image file is supported", false);
  }
  cb(null, true);
};
exports.uploadImage = multer({ storage, imageFileFilter });
exports.uploadVideo = multer({ storage, videoFileFilter });
