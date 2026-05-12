---
name: browser-automation
description: Control a real Chromium browser to scrape pages, fill forms, click buttons, take screenshots, and automate web workflows.
model: copilot/claude-opus-4.7
---

# Browser Automation

Use the built-in Chromium browser to interact with live websites — no API needed.

## Available tools

| Tool | What it does |
|------|--------------|
| `browser navigate <url>` | Go to URL in current tab |
| `browser open <url>` | Open URL in new tab |
| `browser snapshot` | Get page structure (refs for clicking/filling) |
| `browser screenshot` | Capture current viewport → `MEDIA:path` |
| `browser pdf` | Save page as PDF |
| `browser click <ref>` | Click element by ref from snapshot |
| `browser click-coords <x> <y>` | Click by pixel coordinates |
| `browser type <ref> "text"` | Type into element |
| `browser fill --fields '[...]'` | Fill multiple form fields at once |
| `browser press <key>` | Send keyboard key (Enter, Tab, Escape...) |
| `browser select <ref> <val>` | Pick dropdown option |
| `browser hover <ref>` | Hover element |
| `browser drag <ref1> <ref2>` | Drag one element to another |
| `browser wait --text "Done"` | Wait for text to appear on page |
| `browser evaluate --fn '(el)=>...' --ref <r>` | Run JS against element |
| `browser cookies` | Read/write cookies |
| `browser requests` | See recent network requests |
| `browser console --level error` | Get page console messages |
| `browser errors` | Get recent JS errors |
| `browser dialog --accept` | Accept next browser dialog |
| `browser download <ref>` | Click link and save file |
| `browser resize <w> <h>` | Set viewport size |
| `browser close` | Close current tab |

## Standard workflow

1. **Navigate** to the target URL
2. **Snapshot** the page to get element refs — snapshot gives you the accessibility tree with ref IDs
3. **Act** using refs (click, type, fill, etc.)
4. **Verify** with another snapshot or screenshot
5. **Extract** data via snapshot text, evaluate JS, or screenshot

## Rules

- Always snapshot before clicking — refs change after navigation
- Prefer `fill` for multi-field forms over individual `type` calls
- Use `wait` after actions that trigger async page changes
- Screenshots go to `~/.openclaw/media/browser/` and are auto-attached to Telegram replies
- For login flows: check cookies first, navigate, screenshot to confirm state
- Use `browser open` for parallel tabs when comparing pages

## Common patterns

### Scrape a page
```
browser navigate https://example.com
browser snapshot
```

### Fill and submit a form
```
browser navigate https://site.com/form
browser snapshot   # note the ref IDs
browser fill --fields '[{"ref":"3","value":"Mohammed"},{"ref":"5","value":"test@example.com"}]'
browser click <submit-ref>
browser wait --text "Success"
browser screenshot
```

### Take a screenshot and share
```
browser navigate https://site.com
browser screenshot   # returns MEDIA path, auto-attached to Telegram
```

### Scrape data with JS
```
browser navigate https://site.com/table
browser evaluate --fn '() => [...document.querySelectorAll("tr")].map(r=>r.innerText)'
```
