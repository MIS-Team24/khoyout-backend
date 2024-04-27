// src/index.ts
import express from 'express';
import { prisma } from './Database';
import 'dotenv/config'; // To read CLERK_SECRET_KEY
import { clerkClient } from '@clerk/clerk-sdk-node';


const app = express();
let port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express test!');
});

app.get("/insert", async (req, res) => {
  await prisma.testTable.create({
    data: {
      Name: "Ezz " + Math.random() * 100,
    }
  });

  res.send("User successfully Added to the table");
});

app.get("/fetch", async (req, res) => {
  const users = await clerkClient.users.getUserList();
  res.send(users.data[0]);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
