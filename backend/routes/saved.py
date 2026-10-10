import json
import os
from datetime import datetime
from uuid import uuid4

from fastapi import (
    APIRouter,
    HTTPException
)

from models.schemas import SavedPost


router = APIRouter(
    prefix="/api/saved",
    tags=["Saved"]
)


DATA_DIR = "data"
DATA_FILE = os.path.join(
    DATA_DIR,
    "saved_posts.json"
)


def ensure_data_file():

    os.makedirs(
        DATA_DIR,
        exist_ok=True
    )

    if not os.path.exists(DATA_FILE):

        with open(
            DATA_FILE,
            "w",
            encoding="utf-8"
        ) as file:

            json.dump(
                [],
                file
            )


def read_posts():

    ensure_data_file()

    with open(
        DATA_FILE,
        "r",
        encoding="utf-8"
    ) as file:

        return json.load(file)


def write_posts(posts):

    ensure_data_file()

    with open(
        DATA_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            posts,
            file,
            indent=2,
            ensure_ascii=False
        )


@router.get("")
def get_saved_posts(
    search: str = ""
):

    posts = read_posts()

    if search.strip():

        search_text = search.lower()

        posts = [
            post
            for post in posts
            if (
                search_text in
                post["title"].lower()
                or
                search_text in
                post["summary"].lower()
            )
        ]

    posts.reverse()

    return {
        "success": True,
        "count": len(posts),
        "posts": posts
    }


@router.get("/{post_id}")
def get_saved_post(
    post_id: str
):

    posts = read_posts()

    for post in posts:

        if post["id"] == post_id:
            return post

    raise HTTPException(
        status_code=404,
        detail="Saved post not found."
    )


@router.post("")
def save_post(
    post: SavedPost
):

    posts = read_posts()

    post_data = post.model_dump()

    if not post_data.get("id"):
        post_data["id"] = str(uuid4())

    post_data["created_at"] = (
        datetime.now().isoformat()
    )

    posts.append(post_data)

    write_posts(posts)

    return {
        "success": True,
        "message": "Post saved successfully.",
        "post": post_data
    }


@router.delete("/{post_id}")
def delete_post(
    post_id: str
):

    posts = read_posts()

    original_count = len(posts)

    posts = [
        post
        for post in posts
        if post["id"] != post_id
    ]

    if len(posts) == original_count:

        raise HTTPException(
            status_code=404,
            detail="Saved post not found."
        )

    write_posts(posts)

    return {
        "success": True,
        "message": "Post deleted successfully."
    }


@router.delete("")
def delete_all_posts():

    write_posts([])

    return {
        "success": True,
        "message": "All saved posts deleted."
    }