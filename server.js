import express from'express';
import dotenv from'dotenv';
import connectDB from'./config/db.js';
import rateLimiter from'./middlewares/rateLimiter.js';
import errorHandler from'./middlewares/errorHandler.js';
import userRoutes from'./routes/userRoutes.js';
import postRoutes from'./routes/postRoutes.js';
import adminRoutes from'./routes/adminRoutes.js';
import seedAdmin from'./seeders/seedAdmin.js';
import logger from'./utils/logger.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the Swagger YAML file
// const swaggerDocument = YAML.load(path.join(__dirname, 'swagger', '/swagger.yaml'));
const swaggerDocument = YAML.load(path.join(__dirname, 'public', 'swagger.yaml'));

dotenv.config();
const app = express();

// Database Connection
connectDB();
seedAdmin();

// Middleware
app.use(express.json());
app.use(rateLimiter);

// Serve Swagger API documentation at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api-docs', express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist')));


// Example logging usage
app.get('/test', (req, res) => {
    logger.info('Test route was accessed');
    res.send('Hello World!');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/post', postRoutes);


// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>  logger.info(`Server running on port ${PORT}`));
