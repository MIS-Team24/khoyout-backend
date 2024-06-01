import express from 'express';
import 'dotenv/config';
import { apiRoutes } from "./API/Routes/mainRoutes";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { Pool } from 'pg';
import { ResStatus } from './API/Exceptions/main';
const connectPgSimple = require('connect-pg-simple');

const app = express();
const PORT = process.env.PORT || 3005;
const SESSION_SECRET = process.env.SESSION_SECRET || "secret_key";

// Database and session configuration
const pgSession = connectPgSimple(session);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const store = new pgSession({
  pool: pool,
  createTableIfMissing: true,
});

app.use(cors());
// this was uncommented because it was moved to a deeper level
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use(apiRoutes);
app.all("*", (req, res) => res.status(ResStatus.PAGE_NOT_FOUND).send("This page is not found!"));

// Server activation
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
