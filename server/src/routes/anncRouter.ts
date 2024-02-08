import express from "express";

import {
  addAnnc,
  delAnnc,
  updateAnnc,
  getAnncById,
  getAll,
} from "../controllers/anncController";
export const router = express.Router();

router.route("/add").post(addAnnc);
router.route("/").get(getAll);

router.route("/:id").delete(delAnnc).patch(updateAnnc).get(getAnncById);
