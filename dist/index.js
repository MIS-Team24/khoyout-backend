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
const pg_1 = require("pg");
const express_session_1 = __importDefault(require("express-session"));
const express_session_2 = __importDefault(require("express-session"));
const LoginController_1 = require("./API/Controllers/auth/log_in/passportLogin/localStrategy/LoginController");
const app = (0, express_1.default)();
const PORT = 3005;
//passport configuration steps
const pgSession = require('connect-pg-simple')(express_session_2.default);
const poolInstance = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL
});
const postgreStore = new pgSession({
    pool: poolInstance,
    createTableIfMissing: true,
});
app.use((0, express_session_1.default)({
    store: postgreStore,
    secret: process.env.SESSION_SECRET || "secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: true,
        httpOnly: true,
        //secure : true
    },
}));
app.use(LoginController_1.passportLocal.session());
app.use(LoginController_1.passportLocal.initialize());
//
app.use((0, cors_1.default)({ credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
//routes
app.use(mainRoutes_1.apiRoutes);
app.all("*", (req, res) => res.send("This page in not exist!"));
//
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
