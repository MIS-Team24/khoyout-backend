"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const Database_1 = require("./Database");
require("dotenv/config"); // To read CLERK_SECRET_KEY
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const app = (0, express_1.default)();
let port = 3000;
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express test!');
});
app.get("/insert", async (req, res) => {
    await Database_1.prisma.testTable.create({
        data: {
            Name: "Ezz " + Math.random() * 100,
        }
    });
    res.send("User successfully Added to the table");
});
app.get("/fetch", async (req, res) => {
    const users = await clerk_sdk_node_1.clerkClient.users.getUserList();
    res.send(users.data[0]);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
