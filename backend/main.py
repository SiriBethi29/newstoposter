from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.health import router as health_router
from routes.generate import router as generate_router
from routes.upload import router as upload_router
from routes.url import router as url_router
from routes.saved import router as saved_router


app = FastAPI(
    title="News2Posts API",
    description=(
        "Backend API for converting "
        "news and research into social content."
    ),
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    health_router
)

app.include_router(
    generate_router
)

app.include_router(
    upload_router
)

app.include_router(
    url_router
)

app.include_router(
    saved_router
)


@app.get("/")
def root():

    return {
        "message": "Welcome to News2Posts API",
        "status": "running",
        "docs": "/docs"
    }