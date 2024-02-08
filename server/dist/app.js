"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORTS
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const quizRoute_1 = require("./routes/quizRoute");
const userRoute_1 = require("./routes/userRoute");
const anncRouter_1 = require("./routes/anncRouter");
// ###########################################################
// Initialize Express app
dotenv_1.default.config({ path: "./.env" });
const app = (0, express_1.default)();
//app.use(json());
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.options("*", (0, cors_1.default)());
app.use("/api/coligo/quiz", quizRoute_1.router);
app.use("/api/coligo/annc", anncRouter_1.router);
app.use("/api/coligo/user", userRoute_1.router);
// ###########################################################
// Limit requests from same API
const limiter = (0, express_rate_limit_1.default)({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
// ###########################################################
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
// ROUTES
app.use(express_1.default.urlencoded({ extended: true }));
app.use(errorController_1.default);
exports.default = app;
