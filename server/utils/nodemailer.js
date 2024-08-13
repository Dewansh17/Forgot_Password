


require('dotenv').config();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User'); // Adjust the path according to your project structure

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL, // Your email address
    pass: process.env.NODEMAILER_PASSWORD // Your password or app password if 2-step verification is enabled
  }
});

// Function to generate a token
function generateToken() {
  return crypto.randomBytes(20).toString('hex');
}

// Function to send password reset email
const sendPasswordResetEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('No user found with that email');
    }

    const token = generateToken();
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `http://${process.env.FRONTEND_URL}/reset/${token}`;

    const mailOptions = {
      from: `Dewansh <${process.env.NODEMAILER_EMAIL}>`, // Sender address
      to: email, // Recipient address
      subject: 'Password Reset', // Email subject
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>` // HTML content of the email
    };

    const info = await transporter.sendMail(mailOptions); // Send email
    console.log('Email sent:', info.response); // Log success message
    return info.response;
  } catch (error) {
    console.error('Error sending email:', error.message); // Log detailed error message
    throw new Error('Failed to send reset email'); // Throw error for handling in routes
  }
};

module.exports = { sendPasswordResetEmail };
