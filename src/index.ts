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

// Correcting TypeScript errors with explicit types for 'origin' and 'callback'
const allowedOrigins = [
    'https://5173-misteam24-khoyoutfronte-kfuj7jrx19c.ws-eu111.gitpod.io',
    // Additional domains can be added here
];

const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  }
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Correcting the sameSite setting for cookie configuration
app.use(session({
  store: store,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: 'none', // Lowercase 'none' is correct
    secure: true,
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
