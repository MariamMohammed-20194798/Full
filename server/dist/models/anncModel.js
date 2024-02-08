"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });

const mongoose_1 = __importDefault(require("mongoose"));
const anncSchema = new mongoose_1.default.Schema({
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
const Annc = mongoose_1.default.model("Annc", anncSchema);
exports.default = Annc;
