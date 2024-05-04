// src/index.ts
import express, { Request, Response } from 'express';
import 'dotenv/config';
import {apiRoutes} from "./API/Routes/mainRoutes";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
let port = 3005;

app.use(apiRoutes);
app.all( "*" , (req : Request , res : Response) => res.send("This page in not exist!"))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
