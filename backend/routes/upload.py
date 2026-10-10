from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException
)

from services.file_service import (
    read_uploaded_file
)


router = APIRouter(
    prefix="/api/upload",
    tags=["Upload"]
)


@router.post("")
async def upload_file(
    file: UploadFile = File(...)
):

    try:

        content = await read_uploaded_file(
            file
        )

        if not content.strip():
            raise HTTPException(
                status_code=400,
                detail="Uploaded file is empty."
            )

        return {
            "success": True,
            "filename": file.filename,
            "content": content
        }

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"File processing failed: {error}"
        )