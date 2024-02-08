"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = require("../utils/appError");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const signToken = (id) => {
  return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
// Create New User
exports.createUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
  const newUser = await userModel_1.default.create({
    name: req.body.name,
  });
  createSendToken(newUser, 201, req, res);
});
exports.getAllUsers = (0, catchAsync_1.catchAsync)(async (req, res) => {
  const users = await userModel_1.default.find();

  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
  const user = await userModel_1.default.findById(req.params.id);
  if (!user) {
    return next(new appError_1.AppError("No User found with that ID", 404));
  }
  createSendToken(user, 200, req, res);
});

exports.getMe = (0, catchAsync_1.catchAsync)(async (req, res) => {
  const user = await userModel_1.default.findById(req.user?.id);
  createSendToken(user, 200, req, res);
});
const jwtVerifyPromisified = (token, secret) => {
  return new Promise((resolve, reject) => {
    (0, jsonwebtoken_1.verify)(token, secret, {}, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
};
exports.protect = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
  // 1) check if token is there and if it exists
  let token = req.cookies.jwt;
  if (!token) {
    return next(
      new appError_1.AppError("please login to access this route", 401)
    );
  }
  // 2) Verify Token
  const decoded = await jwtVerifyPromisified(token, process.env.JWT_SECRET);
  // 3) check if user exist
  const currentUser = await userModel_1.default.findById(decoded.id);
  if (!currentUser) {
    return next(
      new appError_1.AppError("please login to access this route", 404)
    );
  }
  req.user = currentUser;
  next();
});
