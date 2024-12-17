import mongoose from 'mongoose';
import bcrypt from'bcrypt';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
