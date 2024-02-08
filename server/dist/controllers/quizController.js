"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllQuizzes = exports.getQuiz = exports.updateQuiz = exports.deleteQuiz = exports.createQuiz = void 0;
const quizModel_1 = __importDefault(require("../models/quizModel"));
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = require("../utils/appError");
// Create New Quiz
exports.createQuiz = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const newQuiz = await quizModel_1.default.create({
        course: req.body.course,
        topic: req.body.topic,
        date: req.body.date,
    });
    res.status(201).json({
        status: "success",
        data: newQuiz,
    });
});
// Delete Quiz by ID
exports.deleteQuiz = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const quizId = req.params.id;
    // Check if the quiz exists
    const quiz = await quizModel_1.default.findById(quizId);
    if (!quiz) {
        return next(new appError_1.AppError("Quiz not found", 404));
    }
    // Perform the deletion
    await quizModel_1.default.findByIdAndDelete(quizId);
    res.status(204).json({
        status: "success",
        data: null,
    });
});
// Update Quiz by ID
exports.updateQuiz = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const quiz = await quizModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!quiz) {
        return next(new appError_1.AppError("Quiz not found", 404));
    }
    res.status(200).json({
        status: "success",
        data: quiz,
    });
});
// Get Quiz by ID
exports.getQuiz = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const quiz = await quizModel_1.default.findById(req.params.id);
    if (!quiz) {
        return next(new appError_1.AppError("No quiz found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            data: quiz,
        },
    });
});
// Get All Qizzes
exports.getAllQuizzes = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const quizzes = await quizModel_1.default.find();
    res.status(200).json({
        status: "success",
        result: quizzes.length,
        data: {
            quizzes,
        },
    });
});
