// src/index.ts
import express, { Request, Response } from 'express';
import 'dotenv/config';
import {apiRoutes} from "./API/Routes/mainRoutes";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Pool } from 'pg';
import session from 'express-session';
import expressSession from 'express-session';
import { passportLocal } from './API/Controllers/auth/log_in/passportLogin/localStrategy/LoginController';
import { errorMidllewareHandler } from './API/Middleware/HandleError';

const app = express();
const PORT = 3005;

//passport configuration steps
const pgSession = require('connect-pg-simple')(expressSession)
const poolInstance = new Pool({
  connectionString: process.env.DATABASE_URL
})
const postgreStore = new pgSession({
  pool: poolInstance,
  createTableIfMissing: true,
})
app.use(session({
  store: postgreStore,
  secret: process.env.SESSION_SECRET || "secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite : true,
    httpOnly : true,
    //secure : true
  } ,
}))
app.use(passportLocal.session())
app.use(passportLocal.initialize())
//

app.use(cors({credentials: true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//routes
app.use(apiRoutes);
app.all( "*" , (req : Request , res : Response) => res.send("This page in not exist!"))
//

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
