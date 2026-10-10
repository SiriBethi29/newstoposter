import re
from typing import List


def clean_text(text: str) -> str:
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def create_title(content: str) -> str:
    text = clean_text(content)

    if not text:
        return "News Update"

    first_sentence = re.split(r"[.!?]", text)[0].strip()

    words = first_sentence.split()

    if len(words) > 10:
        first_sentence = " ".join(words[:10]) + "..."

    return first_sentence.title()


def create_summary(content: str, max_words: int = 40) -> str:
    words = clean_text(content).split()

    if len(words) <= max_words:
        return " ".join(words)

    return " ".join(words[:max_words]) + "..."


def create_points(content: str) -> List[str]:
    text = clean_text(content)

    sentences = re.split(r"[.!?]", text)

    sentences = [
        sentence.strip()
        for sentence in sentences
        if sentence.strip()
    ]

    points = []

    for sentence in sentences[:3]:
        words = sentence.split()

        if len(words) > 18:
            sentence = " ".join(words[:18]) + "..."

        points.append(sentence)

    while len(points) < 3:
        points.append("Important information from the provided source.")

    return points[:3]


def create_caption(
    title: str,
    summary: str,
    platform: str
) -> str:

    if platform.lower() == "linkedin":
        return (
            f"{title}\n\n"
            f"{summary}\n\n"
            "#News #Research #Technology #Insights"
        )

    if platform.lower() == "x":
        return (
            f"{title}\n\n"
            f"{summary}\n\n"
            "#News #Research"
        )

    return (
        f"{title}\n\n"
        f"{summary}\n\n"
        "#News #Research #Trending #Updates"
    )


def generate_content(
    content: str,
    format: str,
    platform: str,
    tone: str,
    style: str,
    theme: str
):

    title = create_title(content)
    summary = create_summary(content)
    points = create_points(content)

    caption = create_caption(
        title,
        summary,
        platform
    )

    return {
        "title": title,
        "summary": summary,
        "points": points,
        "caption": caption,
        "source": "User Input",
        "platform": platform,
        "format": format,
        "tone": tone,
        "style": style,
        "theme": theme
    }


def generate_carousel(
    content: str,
    platform: str,
    tone: str,
    style: str,
    theme: str
):

    title = create_title(content)
    summary = create_summary(content, 35)
    points = create_points(content)

    slides = [
        {
            "slide_number": 1,
            "title": title,
            "content": summary,
            "points": []
        },
        {
            "slide_number": 2,
            "title": "Key Information",
            "content": points[0],
            "points": [points[0]]
        },
        {
            "slide_number": 3,
            "title": "More Insights",
            "content": points[1],
            "points": [points[1]]
        },
        {
            "slide_number": 4,
            "title": "Key Takeaway",
            "content": points[2],
            "points": [points[2]]
        }
    ]

    caption = create_caption(
        title,
        summary,
        platform
    )

    return {
        "slides": slides,
        "caption": caption,
        "platform": platform,
        "format": "Carousel",
        "tone": tone,
        "style": style,
        "theme": theme
    }