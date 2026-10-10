from fastapi import (
    APIRouter,
    HTTPException
)

from models.schemas import (
    URLRequest,
    URLResponse
)

from services.url_service import (
    extract_article
)


router = APIRouter(
    prefix="/api/article",
    tags=["Article"]
)


@router.post(
    "/extract",
    response_model=URLResponse
)
def extract_url(
    request: URLRequest
):

    if not request.url.strip():
        raise HTTPException(
            status_code=400,
            detail="URL cannot be empty."
        )

    if not (
        request.url.startswith("http://")
        or request.url.startswith("https://")
    ):
        raise HTTPException(
            status_code=400,
            detail="Please provide a valid HTTP or HTTPS URL."
        )

    try:

        result = extract_article(
            request.url
        )

        return result

    except Exception as error:

        raise HTTPException(
            status_code=400,
            detail=f"Could not extract article: {error}"
        )