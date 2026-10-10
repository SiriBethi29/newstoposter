THEMES = {
    "Purple": {
        "primary": "#7c3aed",
        "secondary": "#a78bfa"
    },
    "Blue": {
        "primary": "#2563eb",
        "secondary": "#60a5fa"
    },
    "Green": {
        "primary": "#16a34a",
        "secondary": "#4ade80"
    },
    "Orange": {
        "primary": "#ea580c",
        "secondary": "#fb923c"
    },
    "Dark": {
        "primary": "#111827",
        "secondary": "#374151"
    }
}


def get_theme(theme_name: str):

    return THEMES.get(
        theme_name,
        THEMES["Purple"]
    )


def get_poster_size(platform: str):

    platform = platform.lower()

    if platform == "instagram":
        return {
            "width": 1080,
            "height": 1350
        }

    if platform == "facebook":
        return {
            "width": 1200,
            "height": 1500
        }

    if platform == "linkedin":
        return {
            "width": 1200,
            "height": 1350
        }

    return {
        "width": 1080,
        "height": 1350
    }


def create_poster_data(
    generated_content: dict
):

    theme = get_theme(
        generated_content["theme"]
    )

    size = get_poster_size(
        generated_content["platform"]
    )

    return {
        "content": generated_content,
        "theme_data": theme,
        "size": size
    }