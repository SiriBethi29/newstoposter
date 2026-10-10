# News2Posts — From News to Posts, Ready to Publish

News2Posts is a web-based content transformation platform that turns news articles, research, text, URLs, and supported uploaded files into social-media-ready content and visual designs.

## 1. Project Overview

News2Posts brings content preparation and poster creation into one workflow. Users can provide source material, choose a format and presentation options, review the generated result, and download or save it.

The application supports social media posts, visual posters, carousel posts, and format selections for threads and reel scripts. It also generates captions with its content response.

**Traditional workflow**

> Read → Summarize → Write → Design → Download → Publish

**News2Posts workflow**

> Input → Generate → Review → Download → Publish

The project focuses on making the step from information to publish-ready social content faster and easier.

## 2. Problem Statement

Students, researchers, content creators, journalists, and small businesses often spend considerable time adapting information for social media. Common tasks include:

- Manually summarizing articles
- Rewriting content for different platforms
- Creating visual posters
- Preparing carousel content
- Maintaining consistent formatting
- Switching between multiple tools

## 3. Proposed Solution

News2Posts provides source input, content generation, poster preview, and saved-post management in one application. Users can:

1. Enter text
2. Paste an article URL and extract its content
3. Upload a supported text, Markdown, or CSV file
4. Select a content format
5. Select a platform
6. Select a tone
7. Select a visual style
8. Select a theme
9. Generate content
10. Preview the poster or carousel
11. Download the result or save it for later

## 4. Key Features

- Text input for news and research content
- Article URL extraction
- `.txt`, `.md`, and `.csv` file upload
- Social-post content generation
- Poster preview using the selected design
- Carousel generation with slide navigation
- Format options for social posts, carousels, threads, and reel scripts
- Multiple tones, visual styles, and themes
- Platform selection
- PNG and JPG poster downloads
- Caption copying
- Save, search, view, and delete saved posts
- Responsive interface

The format selector includes threads and reel scripts. The current prototype uses the general content-generation endpoint for those format selections; it does not yet implement separate specialized thread or reel-script generation logic.

## 5. Poster Styles

The poster renderer provides five distinct layout styles:

### Modern

A contemporary social-media composition with gradients, abstract shapes, rounded summary cards, and numbered points.

### Minimal

A whitespace-focused editorial layout with restrained typography, simple alignment, and thin dividers.

### News

A newspaper-inspired design with a masthead, editorial headline hierarchy, horizontal rules, and fact sections.

### Research

A structured infographic layout with a research label, numbered findings, and organized insight panels.

### Bold

A dramatic composition with oversized typography, large numbers, geometric accents, and a prominent takeaway.

Themes—Purple, Blue, Green, Orange, and Dark—supply coordinated backgrounds and accents to the selected layout.

## 6. System Workflow

```text
User Input
   ↓
Text / URL / File
   ↓
Content Processing
   ↓
Content Generation
   ↓
Format Selection
   ↓
Visual Poster / Carousel
   ↓
Preview
   ↓
Download / Save / Copy
```

## 7. Technology Stack

**Frontend**

- React
- Vite
- JavaScript
- React Router
- Lucide React
- html2canvas

**Backend**

- Python
- FastAPI
- Pydantic
- BeautifulSoup
- Requests

**Storage**

- JSON file storage for saved posts (`backend/data/saved_posts.json`)

The current prototype does not require an external AI API key. Its content generation uses the backend’s existing text-processing logic.

## 8. Project Structure

```text
news2posts/
├── src/
│   ├── components/
│   │   ├── posters/
│   │   │   ├── BoldPoster.jsx
│   │   │   ├── MinimalPoster.jsx
│   │   │   ├── ModernPoster.jsx
│   │   │   ├── NewsPoster.jsx
│   │   │   └── ResearchPoster.jsx
│   │   ├── Navbar.jsx
│   │   └── PostDesign.jsx
│   ├── pages/
│   │   ├── Create.jsx
│   │   ├── Home.jsx
│   │   └── Saved.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── backend/
│   ├── data/
│   │   └── saved_posts.json  (created as needed; ignored by Git)
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── generate.py
│   │   ├── health.py
│   │   ├── saved.py
│   │   ├── upload.py
│   │   └── url.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── content_service.py
│   │   ├── file_service.py
│   │   ├── poster_service.py
│   │   └── url_service.py
│   ├── main.py
│   └── requirements.txt
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## 9. Backend API

The API is served by FastAPI. Interactive Swagger documentation is available at `/docs`.

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Check backend health |
| `POST` | `/api/generate` | Generate post content and a caption from text and selected options |
| `POST` | `/api/generate/carousel` | Generate carousel slides and a caption |
| `POST` | `/api/generate/poster` | Return generated content with poster theme and size metadata |
| `POST` | `/api/upload` | Extract text from an uploaded `.txt`, `.md`, or `.csv` file |
| `POST` | `/api/article/extract` | Extract article title and content from an HTTP/HTTPS URL |
| `GET` | `/api/saved` | List saved posts; supports the `search` query parameter |
| `GET` | `/api/saved/{post_id}` | Retrieve one saved post |
| `POST` | `/api/saved` | Save a post |
| `DELETE` | `/api/saved/{post_id}` | Delete one saved post |
| `DELETE` | `/api/saved` | Delete all saved posts |

## 10. Installation and Setup

### Requirements

- Node.js and npm
- Python 3.10 or later
- pip

### Frontend

From the project root:

```bash
npm install
npm run dev
```

The frontend is available at `http://localhost:5173`.

### Backend

In another terminal:

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

**Windows PowerShell**

```powershell
.\.venv\Scripts\Activate.ps1
```

**macOS / Linux**

```bash
source .venv/bin/activate
```

Install dependencies and start the API from the `backend` directory:

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

The backend is available at `http://127.0.0.1:8000`; Swagger API documentation is at `http://127.0.0.1:8000/docs`.

The frontend API helper uses `http://127.0.0.1:8000` by default. To use a different backend base URL, set `VITE_API_BASE_URL` in the frontend environment.

## 11. Usage

1. Open **Create**.
2. Enter article text, extract content from a URL, or upload a supported file.
3. Select **Social Post** or another available format.
4. Select a platform, such as Instagram.
5. Select a tone, such as Professional.
6. Select a visual style, such as News.
7. Select a theme.
8. Click **Generate Poster**.
9. Review the poster or navigate through carousel slides.
10. Download the image, copy its caption, or save the post.

Open **Saved** to search, view, download, or delete saved posts.

## 12. Target Users

- Students
- Researchers
- Content creators
- Journalists
- Small businesses
- Social media managers

## 13. Advantages

- Reduces the time spent preparing social content
- Combines content transformation and visual creation
- Supports multiple social content format selections
- Provides five distinct poster styles
- Accepts text, article URLs, and supported files
- Produces downloadable visual content
- Keeps saved content organized and searchable

## 14. Future Enhancements

The following items are possible future improvements and are **not current features**:

- Integration with a real large language model (LLM)
- More social media platforms
- AI-generated images
- Advanced template editor
- User authentication
- Cloud database
- Direct social-media publishing
- Analytics
- Brand-kit customization
- Multilingual content generation

## 15. Project Status

**Status: Working Prototype**

The React frontend and FastAPI backend are integrated. The prototype supports content generation, poster and carousel creation, saved-post management, downloads, caption copying, and URL/file input.

## 16. Screenshots

Screenshots of the Home, Create, Poster Preview and Saved Posts pages can be added here.

## 17. License

**License: To be determined**
