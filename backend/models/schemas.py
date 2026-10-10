from typing import List, Optional
from pydantic import BaseModel, Field


class GenerateRequest(BaseModel):
    content: str = Field(..., min_length=1)
    format: str = "Social Post"
    platform: str = "Instagram"
    tone: str = "Professional"
    style: str = "Modern"
    theme: str = "Purple"


class GeneratedContent(BaseModel):
    title: str
    summary: str
    points: List[str]
    caption: str
    source: str
    platform: str
    format: str
    tone: str
    style: str
    theme: str


class CarouselSlide(BaseModel):
    slide_number: int
    title: str
    content: str
    points: List[str] = []


class CarouselResponse(BaseModel):
    slides: List[CarouselSlide]
    caption: str
    platform: str
    format: str
    tone: str
    style: str
    theme: str


class URLRequest(BaseModel):
    url: str


class URLResponse(BaseModel):
    title: str
    content: str
    source: str
    url: str


class SavedPost(BaseModel):
    id: str
    title: str
    summary: str
    points: List[str]
    caption: str
    source: str
    platform: str
    format: str
    tone: str
    style: str
    theme: str
    created_at: str
    slides: Optional[List[CarouselSlide]] = None