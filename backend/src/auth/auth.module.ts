import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET } from "src/env";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.stragegy";

@Module({
	imports: [UserModule, PassportModule, JwtModule.register({ secret: JWT_SECRET, signOptions: { expiresIn: "1d" } })],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
