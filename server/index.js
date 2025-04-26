import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {routes} from "./routes/index.js";
import {initDatabase} from "./data-access/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
initDatabase();

// Routes initialization
routes(app);

// Start server locally (for testing)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

