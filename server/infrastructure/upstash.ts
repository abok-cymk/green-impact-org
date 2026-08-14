const redisUrl = process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

if (!redisUrl) {
  console.warn("[Upstash] Missing UPSTASH_REDIS_REST_URL")
}

if (!redisToken) {
  console.warn("[Upstash] Missing UPSTASH_REDIS_REST_TOKEN")
}

export const UPSTASH_REDIS_REST_URL = redisUrl || ""
export const UPSTASH_REDIS_REST_TOKEN = redisToken || ""
