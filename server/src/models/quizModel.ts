import mongoose, { Document, Schema } from "mongoose";

export interface IQuiz extends Document {
  course: string;
  topic: string;
  date: Date;
}

const quizSchema: Schema<IQuiz> = new mongoose.Schema<IQuiz>({
  course: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, "Date is required"],
  },
});

const Quiz = mongoose.model<IQuiz>("Quiz", quizSchema);

export default Quiz;
