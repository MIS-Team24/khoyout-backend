import express from 'express';
import 'dotenv/config';
import { apiRoutes } from "./API/Routes/mainRoutes";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { Pool } from 'pg';
import { passportLocal } from './API/Controllers/auth/log_in/passportLogin/localStrategy/LoginController';
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

// Middleware configuration
app.use(cors({
  credentials: true,
  origin: ['https://5173-misteam24-khoyoutfronte-kfuj7jrx19c.ws-eu111.gitpod.io'] // Adjust based on your front-end deployment
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  store: store,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: 'lax', // Adjust according to your requirements
    httpOnly: true
  }
}));
app.use(passportLocal.initialize());
app.use(passportLocal.session());

// Routing
app.use(apiRoutes);
app.all("*", (req, res) => res.status(ResStatus.PAGE_NOT_FOUND).send("This page is not found!"));

// Server activation
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
