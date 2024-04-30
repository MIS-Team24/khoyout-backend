// src/index.ts
import express, { Request, Response } from 'express';
import 'dotenv/config'; // To read CLERK_SECRET_KEY
import { LooseAuthProp } from '@clerk/clerk-sdk-node';
import {apiRoutes} from "./API/Routes/mainRoutes";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
let port = 3000;


declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

app.use(apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
