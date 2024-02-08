"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAnncs =
  exports.getAnnc =
  exports.updateAnnc =
  exports.deleteAnnc =
  exports.addAnnc =
    void 0;
const announcementModel_1 = __importDefault(require("../models/anncModel"));
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = require("../utils/appError");

exports.addAnnc = (0, catchAsync_1.catchAsync)(async (req, res) => {
  const newAnnc = await announcementModel_1.default.create({
    title: req.body.title,
    content: req.body.content,
    user: req.body.user,
  });

  res.status(201).json({
    status: "success",
    data: newAnnc,
  });
});
// Delete annc by ID
exports.deleteAnnc = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
  const anncId = req.params.id;
  // Check if the annc exists
  const annc = await announcementModel_1.default.findById(anncId);
  if (!annc) {
    return next(new appError_1.AppError("Announcement not found", 404));
  }
  // Perform the deletion
  await announcementModel_1.default.findByIdAndDelete(anncId);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
// Update annc by ID
exports.updateAnnc = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
  const annc = await announcementModel_1.default.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!annc) {
    return next(new appError_1.AppError("Announcement not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: annc,
  });
});
// Get annc by ID
exports.getAnnc = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
  const annc = await announcementModel_1.default.findById(req.params.id);
  if (!annc) {
    return next(
      new appError_1.AppError("No Announcement found with that ID", 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      data: annc,
    },
  });
});
// Get All Anncs
exports.getAllAnncs = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
  const anncs = await announcementModel_1.default.find();
  res.status(200).json({
    status: "success",
    result: anncs.length,
    data: {
      anncs,
    },
  });
});
