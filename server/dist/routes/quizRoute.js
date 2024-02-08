"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const quizController_1 = require("../controllers/quizController");
exports.router = express_1.default.Router();
exports.router.post("/create", quizController_1.createQuiz);
exports.router.get("/", quizController_1.getAllQuizzes);
exports.router.route("/:id").get(quizController_1.getQuiz).patch(quizController_1.updateQuiz).delete(quizController_1.deleteQuiz);
