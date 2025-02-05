from fastapi import FastAPI
from api.endpoints import router as api_router

app = FastAPI(title="TurmerikTerminal API")

# Include the API routes
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)

from dotenv import load_dotenv
import os

# ✅ Load environment variables from .env
load_dotenv()

# ✅ Retrieve OpenAI API key
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("❌ ERROR: OpenAI API key is missing. Set it in the .env file.")