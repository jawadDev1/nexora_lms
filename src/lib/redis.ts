import { REDIS_TOKEN, REDIS_URL } from "@/constants";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});

export default redis;