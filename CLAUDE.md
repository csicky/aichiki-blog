# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multilingual blog site for AICHIKI.ai built with VitePress. The blog supports 22 languages and generates RSS feeds for content syndication.

## Common Development Commands

```bash
# Start development server
npm run docs:dev

# Build the site and generate RSS feeds
npm run docs:build

# Preview the built site locally
npm run docs:preview

# Format all code with Prettier
npm run format
```

## Architecture

### VitePress Configuration
- Main config: `docs/.vitepress/config.js` - Defines all 22 language locales, navigation, and site metadata
- Sidebar generation: `docs/.vitepress/sidebar.js` - Dynamically generates blog post sidebar from markdown files using gray-matter
- RSS generation: `docs/.vitepress/scripts/generate-rss.js` - Creates RSS feeds for each language after build

### Content Structure
- Blog posts: `docs/posts/*.md` (English) and `docs/{lang}/posts/*.md` (other languages)
- Each post uses frontmatter with `title`, `date`, `excerpt`, and optional `published` fields
- Posts are automatically sorted by date and filtered by published status

### Supported Languages
The blog supports 22 languages: English (default), German, Chinese, Romanian, Hungarian, Spanish, Japanese, Hindi, Arabic, Portuguese, Russian, French, Korean, Italian, Dutch, Polish, Turkish, Indonesian, Vietnamese, Thai, Ukrainian, and Czech.

### Theme Customization
- Custom theme components in `docs/.vitepress/theme/`
- Home page component: `Home.vue`
- Layout wrapper: `Layout.vue`
- Post data handling: `posts.js`