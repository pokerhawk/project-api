// Import do Nest
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // canActivate(context: ExecutionContext) {
  //   return super.canActivate(context);
  // }

  // handleRequest(user, err) {
  //   if (err || !user) {
  //     throw new UnauthorizedException(err?.message);
  //   }

  //   return user;
  // }
}
