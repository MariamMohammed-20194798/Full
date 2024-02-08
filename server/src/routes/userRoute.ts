import express from "express";
import {
  createUser,
  getMe,
  getAllUsers,
  getUser,
  protect,
} from "../controllers/userController";

export const router = express.Router();

router.post("/create", createUser);

router.get("/me", getMe, getUser);
router.get("/:id", getUser);
router.get("/all", getAllUsers);
