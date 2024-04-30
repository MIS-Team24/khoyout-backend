"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
require("dotenv/config"); // To read CLERK_SECRET_KEY
const mainRoutes_1 = require("./API/Routes/mainRoutes");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
let port = 3000;
app.use(mainRoutes_1.apiRoutes);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
