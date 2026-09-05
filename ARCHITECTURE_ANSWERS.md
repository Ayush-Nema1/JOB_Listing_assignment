# Architecture Scenario — Answers

## 1. Where should the paid third-party AI API key live?

I would keep the API key on the backend, not in the frontend. Anything shipped to the browser can be viewed by users, so exposing the key would allow someone to copy and misuse it.

The backend can store the key in an environment variable and use it when making requests to the AI service.


## 2. How do we stop anyone from triggering paid backend calls?
The AI endpoint should not be publicly usable. I would first add authentication and check that the request is coming from a logged-in user.

Since the API is paid, I would also add rate limiting or a per-user quota so one user cannot keep sending requests and run up the API bill.

## 3. Why would Vercel → Render fail with a browser cross-origin error?

I would first check the backend's CORS settings. Since the frontend and backend are on different origins, the FastAPI backend needs to explicitly allow the Vercel frontend URL.

So I would check the CORSMiddleware configuration on the Render backend and make sure the allowed origin matches the deployed frontend URL.