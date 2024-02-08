import mongoose, { Document, Schema } from "mongoose";

export interface IAnnc {
  title: string;
  content: string;
  user: string;
}

const anncSchema: Schema<IAnnc> = new mongoose.Schema<IAnnc>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: String,
  },
});

const Annc = mongoose.model<IAnnc>("Annc", anncSchema);

export default Annc;
