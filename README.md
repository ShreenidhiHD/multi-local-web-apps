# DevTools Hub

A collection of essential developer utilities built with static HTML, CSS, and JavaScript. Designed with a premium, modern aesthetic using glassmorphism and responsive layouts.

## Available Apps

### 1. JSON Formatter
A powerful tool to validate, format, and minify JSON data.
- **Features**: Syntax highlighting, error detection, copy to clipboard, and minification.
- **Location**: `apps/json-formatter/`

### 2. HTML Viewer
A real-time HTML editor and previewer.
- **Features**: Live preview in an isolated iframe, instant feedback.
- **Location**: `apps/html-viewer/`

### 3. Diff Checker
Compare two blocks of text to see what changed.
- **Features**: Side-by-side comparison, color-coded additions and deletions.
- **Location**: `apps/diff-checker/`

### 4. Color Converter
Convert colors and generate palettes.
- **Features**: HEX/RGB/HSL conversion, visual preview, shade/tint generator.
- **Location**: `apps/color-converter/`

## Project Structure

```text
/
├── index.html              # Landing page
├── css/
│   └── style.css           # Shared premium styles
├── js/
│   └── main.js             # Shared logic
└── apps/
    ├── json-formatter/     # JSON Formatter source
    └── html-viewer/        # HTML Viewer source
```

## How to Use

Since this project is built with static files, no build process is required.

1.  **Clone or Download** the repository.
2.  **Open `index.html`** in your web browser.
3.  Navigate to the desired tool using the cards on the landing page.

*Note: For the best experience, running a local server (e.g., VS Code Live Server) is recommended to ensure all assets load correctly without local file restrictions.*