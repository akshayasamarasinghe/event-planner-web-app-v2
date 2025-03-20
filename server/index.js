import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {routes} from "./routes/index.js";
import {initDatabase} from "./data-access/index.js";
import userRouter from "./routes/user.routes.js";

dotenv.config(); // Load environment variables

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON

// Connect to MongoDB
initDatabase();

// Routes initialization
routes(app);

// Start server locally (for testing)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
