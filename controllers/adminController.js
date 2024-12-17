import Admin from '../models/admin.js';
import bcrypt from 'bcrypt';

// Add a New Admin
export const addAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({success:true, message: 'Admin added successfully.', admin: newAdmin });
  } catch (err) {
    res.status(500).json({ message: 'Error adding admin.', error: err.message });
  }
};

