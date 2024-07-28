import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedisModule } from "./redis/redis.module";
import { PostgresConfig } from "config";
import { UserModule } from "./user/user.module";
import { PasswordModule } from "./password/password.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(PostgresConfig),
    AuthModule,
    RedisModule,
    UserModule,
    PasswordModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
