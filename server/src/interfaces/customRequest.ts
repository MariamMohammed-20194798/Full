import { Request } from "express";
import { IUser } from "../models/userModel";
export interface CustomRequest<T = Request["body"]> extends Request {
  body: T;
  user?: IUser;
}
