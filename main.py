from fastapi import FastAPI
from api.endpoints import router as api_router

app = FastAPI(title="TurmerikTerminal API")

# Include the API routes
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
