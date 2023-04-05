const { isValidObjectId } = require("mongoose");
const PasswordResetToken = require("../models/passwordResetToken");
const { sendError } = require("../utils/helper");

exports.isValidResetToken = async (req, res, next) => {
    const {token, userId} = req.body;

    if(!token.trim() || !isValidObjectId(userId)) return sendError(res, 'Invaid request!');

    const resetToken = await PasswordResetToken.findOne({owner: userId});
    if(!resetToken) return sendError(res, 'unauthorized access, invalid request!');
    
    const matched = await resetToken.compareToken(token);
    if(!matched) return sendError(res, 'unauthorized access, invalid request!');

    req.resetToken = resetToken;
    next();
}