import { RequestHandler } from "express";
import Annc, { IAnnc } from "../models/anncModel";
import { catchAsync } from "../utils/catchAsync";
import { CustomRequest } from "../interfaces/customRequest";
import { AppError } from "../utils/appError";

// Delete Annc by ID
export const delAnnc: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const anncId = req.params.id;
    const annc = await Annc.findById(anncId);
    if (!annc) {
      return next(new AppError("annc not found", 404));
    }
    await Annc.findByIdAndDelete(anncId);
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

// Update Annc by ID
export const updateAnnc: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const annc = await Annc.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!annc) {
      return next(new AppError("Annc not found", 404));
    }
    res.status(200).json({
      status: "success",
      data: annc,
    });
  }
);

// Get Annc by ID
export const getAnncById: RequestHandler = catchAsync(
  async (req, res, next) => {
    const annc = await Annc.findById(req.params.id);
    if (!annc) {
      return next(new AppError("No annc found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: annc,
      },
    });
  }
);

// Get All
export const getAll: RequestHandler = catchAsync(async (req, res, next) => {
  const anncs = await Annc.find();
  res.status(200).json({
    status: "success",
    result: anncs.length,
    data: {
      anncs,
    },
  });
});

// Create New annc
export const addAnnc: RequestHandler = catchAsync(
  async (req: CustomRequest, res) => {
    const newannc = await Annc.create({
      title: req.body.title,
      content: req.body.content,
      user: req.body.user,
    });

    res.status(201).json({
      status: "success",
      data: newannc,
    });
  }
);

/* export const addAnnc: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const obj = { ...req.body, user: req.user?._id };
    await Annc.create(obj);
    const createdAnnc = await Annc.findOne().sort({ createdAt: -1 }).populate({
      path: "user",
      select: "-_id",
    });
    res.status(200).json({
      status: "success",
      data: createdAnnc,
    });
  }
);
 */
