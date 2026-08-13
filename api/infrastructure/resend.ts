const apiKey = process.env.RESEND_API_KEY
const segmentAudienceId = process.env.RESEND_SEGMENT_AUDIENCE_ID
const topicsId = process.env.RESEND_TOPICS_ID

if (!apiKey) {
  console.warn("[Resend] Missing RESEND_API_KEY")
}

if (!segmentAudienceId) {
  console.warn("[Resend] Missing RESEND_SEGMENT_AUDIENCE_ID")
}

if (!topicsId) {
  console.warn("[Resend] Missing RESEND_TOPICS_ID")
}

export const RESEND_API_KEY = apiKey || ""
export const RESEND_SEGMENT_AUDIENCE_ID = segmentAudienceId || ""
export const RESEND_TOPICS_ID = topicsId || ""
