"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const mainRoutes_1 = require("./API/Routes/mainRoutes");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
let port = 3005;
app.use(mainRoutes_1.apiRoutes);
app.all("*", (req, res) => res.send("This page in not exist!"));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
