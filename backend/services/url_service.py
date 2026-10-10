import requests
from bs4 import BeautifulSoup


def extract_article(url: str):

    headers = {
        "User-Agent": (
            "Mozilla/5.0 "
            "(Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 "
            "(KHTML, like Gecko) "
            "Chrome/120 Safari/537.36"
        )
    }

    response = requests.get(
        url,
        headers=headers,
        timeout=10
    )

    response.raise_for_status()

    soup = BeautifulSoup(
        response.text,
        "html.parser"
    )

    title = ""

    if soup.title:
        title = soup.title.get_text(
            strip=True
        )

    paragraphs = soup.find_all("p")

    content_parts = []

    for paragraph in paragraphs:

        text = paragraph.get_text(
            " ",
            strip=True
        )

        if len(text) > 40:
            content_parts.append(text)

    content = " ".join(
        content_parts[:20]
    )

    if not content:
        content = (
            "No readable article content "
            "was found on this webpage."
        )

    return {
        "title": title or "Article",
        "content": content,
        "source": title or url,
        "url": url
    }