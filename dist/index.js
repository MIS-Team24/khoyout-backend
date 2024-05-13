"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const mainRoutes_1 = require("./API/Routes/mainRoutes");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const pg_1 = require("pg");
const LoginController_1 = require("./API/Controllers/auth/log_in/passportLogin/localStrategy/LoginController");
const main_1 = require("./API/Exceptions/main");
const connectPgSimple = require('connect-pg-simple');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3005;
const SESSION_SECRET = process.env.SESSION_SECRET || "secret_key";
// Database and session configuration
const pgSession = connectPgSimple(express_session_1.default);
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const store = new pgSession({
    pool: pool,
    createTableIfMissing: true,
});
// Correcting TypeScript errors with explicit types for 'origin' and 'callback'
const allowedOrigins = [
    'https://5173-misteam24-khoyoutfronte-kfuj7jrx19c.ws-eu111.gitpod.io',
    // Additional domains can be added here
];
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'), false);
        }
    }
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Correcting the sameSite setting for cookie configuration
app.use((0, express_session_1.default)({
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
app.use(LoginController_1.passportLocal.initialize());
app.use(LoginController_1.passportLocal.session());
// Routing
app.use(mainRoutes_1.apiRoutes);
app.all("*", (req, res) => res.status(main_1.ResStatus.PAGE_NOT_FOUND).send("This page is not found!"));
// Server activation
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
