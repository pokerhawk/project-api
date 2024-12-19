// Import do Nest
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
// Import do Express
import { NextFunction, Request, Response } from 'express';
// Import do Class-Validator
import { validate } from 'class-validator';
// Imports da Aplicação
import { LoginRequestBody } from 'src/modules/auth/model/login-request-body';

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const loginRequestBody = new LoginRequestBody();
    loginRequestBody.email = body.email;
    loginRequestBody.password = body.password;

    const validations = await validate(loginRequestBody);

    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc, curr) => {
          return [...acc, ...Object.values(curr.constraints)];
        }, []),
      );
    }

    next();
  }
}