import express from "express";
import {
  createQuiz,
  deleteQuiz,
  updateQuiz,
  getQuiz,
  getAllQuizzes,
} from "../controllers/quizController";
import { protect } from "../controllers/userController";
export const router = express.Router();

router.post("/create", protect, createQuiz);
router.get("/", getAllQuizzes);
router.route("/:id").get(getQuiz).patch(updateQuiz).delete(deleteQuiz);
