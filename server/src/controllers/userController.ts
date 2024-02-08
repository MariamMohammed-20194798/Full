import { RequestHandler, Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import { CustomRequest } from "../interfaces/customRequest";
import { DecodedToken } from "../interfaces/userController";

import { sign, verify as verifyJWT } from "jsonwebtoken";

const signToken = (id: string) => {
  return sign({ id }, String(process.env.JWT_SECRET), {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  user: any,
  statusCode: number,
  req: Request,
  res: Response
): void => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const jwtVerifyPromisified = (token: string, secret: string) => {
  return new Promise((resolve, reject) => {
    verifyJWT(token, secret, {}, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
};

export const protect: RequestHandler = catchAsync(
  async (req: CustomRequest, res: Response, next) => {
    // 1) check if token is there and if it exists
    let token: string | undefined = req.cookies.jwt;

    if (!token) {
      return next(new AppError("please login to access this route", 401));
    }

    // 2) Verify Token

    const decoded = (await jwtVerifyPromisified(
      token,
      process.env.JWT_SECRET!
    )) as DecodedToken;

    // 3) check if user exist
    const currentUser = (await User.findById(decoded.id)) as IUser;
    if (!currentUser) {
      return next(new AppError("please login to access this route", 404));
    }
    req.user = currentUser;

    next();
  }
);
// Create New User
interface CreateUserBody {
  name: string;
}
export const createUser: RequestHandler = catchAsync(
  async (req: CustomRequest<CreateUserBody>, res) => {
    const newUser = await User.create({
      name: req.body.name,
    });
    createSendToken(newUser, 201, req, res);
  }
);

export const getUser: RequestHandler = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("No User found with that ID", 404));
  }
  createSendToken(user, 200, req, res);
});

export const getMe: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const user = await User.findById(req.user?.id);
    createSendToken(user, 200, req, res);
  }
);

export const getAllUsers: RequestHandler = catchAsync(
  async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      result: users.length,
      data: {
        users,
      },
    });
  }
);
