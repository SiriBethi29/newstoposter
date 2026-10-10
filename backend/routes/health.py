from fastapi import APIRouter

router = APIRouter(
    prefix="/api",
    tags=["Health"]
)


@router.get("/health")
def health_check():

    return {
        "status": "success",
        "message": "News2Posts backend is running",
        "version": "1.0.0"
    }