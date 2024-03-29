"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
exports.router = express_1.default.Router();
exports.router.post("/create", userController_1.createUser);
exports.router.get("/all", userController_1.getAllUsers);
exports.router.get("/:id", userController_1.getUser);
exports.router.get(
  "/me",
  userController_1.protect,
  userController_1.getMe,
  userController_1.getUser
);
