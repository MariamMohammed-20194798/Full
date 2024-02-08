import { RequestHandler } from "express";
import Quiz, { IQuiz } from "../models/quizModel";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import { CustomRequest } from "../interfaces/customRequest";

// Create New Quiz
export const createQuiz: RequestHandler = catchAsync(
  async (req: CustomRequest, res) => {
    const newQuiz: Partial<IQuiz> = await Quiz.create({
      course: req.body.course,
      topic: req.body.topic,
      date: req.body.date,
    });

    res.status(201).json({
      status: "success",
      data: newQuiz,
    });
  }
);

// Delete Quiz by ID
export const deleteQuiz: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const quizId = req.params.id;
    // Check if the quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return next(new AppError("Quiz not found", 404));
    }
    // Perform the deletion
    await Quiz.findByIdAndDelete(quizId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

// Update Quiz by ID
export const updateQuiz: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!quiz) {
      return next(new AppError("Quiz not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: quiz,
    });
  }
);

// Get Quiz by ID
export const getQuiz: RequestHandler = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    return next(new AppError("No quiz found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: quiz,
    },
  });
});

// Get All Qizzes
export const getAllQuizzes: RequestHandler = catchAsync(
  async (req, res, next) => {
    console.log("1111111");
    const quizzes = await Quiz.find();

    res.status(200).json({
      status: "success",
      result: quizzes.length,
      data: {
        quizzes,
      },
    });
  }
);
