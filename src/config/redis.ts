import Redis from "ioredis";

export const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  maxRetriesPerRequest: null,
  lazyConnect: true,
});

redis.on(`connect`, () => {
  console.log(`Redis Connected`);
});

redis.on(`error`, (err) => {
  console.error(`Redis conncetion error`, err.message);
});
