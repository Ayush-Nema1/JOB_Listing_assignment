# Architecture Scenario — Answers

## 1. Where should the paid third-party AI API key live?

The key should never be placed in frontend code. Browser code can be inspected by users, so a frontend key can be copied and abused, potentially generating paid requests.

The key should stay on the backend as a server-side environment variable/secret. The backend calls the third-party AI service without exposing the secret to the browser.

## 2. How do we stop anyone from triggering paid backend calls?

Add authentication and authorization before the paid operation. For example, users sign in and the backend validates their session or JWT before allowing the AI request.

I would also add rate limiting and request quotas. Authentication controls who can call the endpoint, while rate limiting controls how frequently they can call it.

## 3. Why would Vercel → Render fail with a browser cross-origin error?

The most likely problem is an incorrect CORS configuration on the backend. The Render backend must allow the exact deployed Vercel frontend origin.

I would check the FastAPI `CORSMiddleware` configuration first and verify the allowed origin matches the deployed frontend URL exactly.
