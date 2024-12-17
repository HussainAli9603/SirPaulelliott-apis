import Admin from '../models/admin.js';
import bcrypt from 'bcrypt';

const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: process.env.DEFAULT_ADMIN_EMAIL });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);

      await Admin.create({
        name: 'Default Admin',
        email: process.env.DEFAULT_ADMIN_EMAIL,
        password: hashedPassword,
      });

      console.log('Default admin created successfully.');
    } else {
      console.log('Default admin already exists.');
    }
  } catch (err) {
    console.error('Error seeding default admin:', err.message);
  }
};

export default seedAdmin;
