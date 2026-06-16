# Architecture

## Overview

A static single-page website hosted on GitHub Pages.
No build step, no dependencies — pure HTML, CSS, and optional vanilla JS.

```
9t29zhmwdh-coder.github.io/
├── index.html        # Main page
├── css/
│   └── style.css     # Styles
├── js/
│   └── main.js       # Optional interactivity
└── assets/
    └── logo/         # Logos and images
```

## Deployment

Push to `main` branch → GitHub Pages deploys automatically.

## CI

```yaml
name: CI
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Validate HTML
        uses: validator/validator@main
        with: {files: '*.html'}
```
