import { Module } from "@nestjs/common";
import { Redis } from "ioredis";
import { RedisService } from "./redis.service";
import { RedisConfig } from "config";

@Module({
  providers: [
    {
      provide: "REDIS_CLIENT",
      useFactory: () => {
        return new Redis(RedisConfig);
      },
    },
    RedisService,
  ],
  exports: ["REDIS_CLIENT", RedisService],
})
export class RedisModule {}
