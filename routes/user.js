const express = require("express");

const {
  create,
  verifyEmail,
  resendEmailVerificationToken,
  forgotPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
  signIn,
} = require("../controllers/user");
const { isValidResetToken } = require("../middlewares/user");
const {
  userValidator,
  validate,
  validatePassword,
  signInValidator,
} = require("../middlewares/validator");
const { isAuth } = require("../middlewares/auth");
const router = express.Router();

router.post("/create", userValidator, validate, create);
router.post("/sign-in", signInValidator, validate, signIn);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-token", resendEmailVerificationToken);
router.post("/forgot-password", forgotPassword);
router.post(
  "/verify-password-reset-token",
  isValidResetToken,
  sendResetPasswordTokenStatus
);
router.post(
  "/reset-password",
  isValidResetToken,
  validatePassword,
  validate,
  resetPassword
);
router.get("/is-auth", isAuth, (req, res) => {
  const { user } = req;
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      role: user.role,
    },
  });
});

module.exports = router;
