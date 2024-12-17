import User from '../models/user.js';
import generateVerificationToken from '../utils/generateVerificationToken.js';
import sendEmail from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';

// User Sign-Up
export const signUp = async (req, res) => {
  const { firstName, lastName, email, country, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const verificationToken = generateVerificationToken();

    const verificationLink = `${process.env.BASE_URL}/api/users/verify/${verificationToken}`;
   
    const emailBody = `Hi,Please verify your email by clicking the link:`;

      const subject = 'Verify Your Email';  

    await sendEmail({email:email, name:firstName, subject:subject, emailBody:emailBody, verificationLink:verificationLink });

    res.status(201).json({success:true, message: 'User registered successfully. Please check your email for verification.' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user.', error: err.message });
  }
};

// Verify Email
export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token.' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ success:true, message: 'Email verified successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error verifying email.', error: err.message });
  }
};
