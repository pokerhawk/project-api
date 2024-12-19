import { Request } from "express";
import { User } from "prisma/generated/client";

export interface IAuthRequest extends Request {
    user: User;
}