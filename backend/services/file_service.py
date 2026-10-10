import csv
import io


ALLOWED_EXTENSIONS = {
    ".txt",
    ".md",
    ".csv"
}


def get_extension(filename: str) -> str:
    if "." not in filename:
        return ""

    return "." + filename.rsplit(".", 1)[1].lower()


def validate_file(filename: str):
    extension = get_extension(filename)

    if extension not in ALLOWED_EXTENSIONS:
        raise ValueError(
            "Only .txt, .md and .csv files are supported."
        )

    return extension


async def read_uploaded_file(file):

    extension = validate_file(file.filename)

    data = await file.read()

    if extension in [".txt", ".md"]:
        try:
            return data.decode("utf-8")
        except UnicodeDecodeError:
            return data.decode("latin-1")

    if extension == ".csv":

        decoded = data.decode(
            "utf-8",
            errors="ignore"
        )

        reader = csv.reader(
            io.StringIO(decoded)
        )

        rows = []

        for row in reader:
            rows.append(" ".join(row))

        return "\n".join(rows)

    return ""