import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies[process.env.COOKIE_NAME || "jwt"];
    if (!token) {
      throw new UnauthorizedException("Token not found");
    }
    try {
      request.user = this.jwtService.verify(token);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw new UnauthorizedException("Token is expired");
      }
      throw new UnauthorizedException("Token is invalid");
    }

    return super.canActivate(context);
  }
}
/*JsonWebTokenError*/
