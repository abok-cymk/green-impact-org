// 1. Fetcher to get the secure token from your Vercel serverless function
export const fetchToken = async (url: string): Promise<string> => {
  const response = await fetch(url)
  if (!response.ok) throw new Error("Failed to load security token")
  const data = await response.json()
  return data.token
}

export const sendForm = async (
  url: string,
  { arg }: { arg: Record<string, any> }
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  })

  if (!response.ok) {
    const errorData = await response.json()
    const errorMessage =
      errorData.message ||
      (typeof errorData.details === "string"
        ? errorData.details
        : errorData.error) ||
      "Failed to send message"
    throw new Error(errorMessage)
  }
  return response.json()
}
