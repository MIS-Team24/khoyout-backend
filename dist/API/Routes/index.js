"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth/auth"));
exports.apiRoutes = express_1.default.Router();
exports.apiRoutes.use("/api/v1", auth_1.default);
