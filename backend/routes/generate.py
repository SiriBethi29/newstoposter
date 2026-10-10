from fastapi import APIRouter, HTTPException

from models.schemas import (
    GenerateRequest,
    GeneratedContent,
    CarouselResponse
)

from services.content_service import (
    generate_content,
    generate_carousel
)

from services.poster_service import (
    create_poster_data
)


router = APIRouter(
    prefix="/api/generate",
    tags=["Generate"]
)


@router.post(
    "",
    response_model=GeneratedContent
)
def generate(request: GenerateRequest):

    if not request.content.strip():
        raise HTTPException(
            status_code=400,
            detail="Content cannot be empty."
        )

    result = generate_content(
        content=request.content,
        format=request.format,
        platform=request.platform,
        tone=request.tone,
        style=request.style,
        theme=request.theme
    )

    return result


@router.post(
    "/carousel",
    response_model=CarouselResponse
)
def generate_carousel_endpoint(
    request: GenerateRequest
):

    if not request.content.strip():
        raise HTTPException(
            status_code=400,
            detail="Content cannot be empty."
        )

    result = generate_carousel(
        content=request.content,
        platform=request.platform,
        tone=request.tone,
        style=request.style,
        theme=request.theme
    )

    return result


@router.post("/poster")
def generate_poster(
    request: GenerateRequest
):

    if not request.content.strip():
        raise HTTPException(
            status_code=400,
            detail="Content cannot be empty."
        )

    generated = generate_content(
        content=request.content,
        format=request.format,
        platform=request.platform,
        tone=request.tone,
        style=request.style,
        theme=request.theme
    )

    return create_poster_data(
        generated
    )
