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

// CORS configuration with dynamic origin checking
const allowedOrigins = [
    'https://5173-misteam24-khoyoutfronte-kfuj7jrx19c.ws-eu111.gitpod.io',
    // Additional domains can be added here
];

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration with secure cookie settings
app.use(session({
  store: store,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: 'None', // Necessary for third-party cookies
    secure: true, // Necessary when sameSite is None
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
