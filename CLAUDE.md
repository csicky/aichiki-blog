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

## ⚠️ CRITICAL: YAML Frontmatter Rules for Translations

When creating or translating blog posts, **ALWAYS follow these YAML frontmatter rules** to prevent build failures:

### Frontmatter Format Requirements

```yaml
---
title: 'Your Title Here'
date: 2025-11-20
excerpt: 'Your excerpt here'
published: true
---
```

### Critical Rules

1. **ALWAYS wrap title and excerpt in SINGLE QUOTES** (`'...'`)
   - This prevents YAML parsing errors with colons, special characters, etc.
   - Example: `title: 'How to Build a Character With Depth in AICHIKI'`

2. **NO CURLY QUOTES OR SMART QUOTES** - Only use straight ASCII quotes
   - ❌ BAD: `'`, `'`, `"`, `"` (Unicode curly quotes)
   - ✅ GOOD: `'`, `"` (ASCII straight quotes)
   - Common in translations from AI tools that auto-format text

3. **Escape single quotes within single-quoted strings** with double single quotes (`''`)
   - Example: `excerpt: 'Don''t use curly apostrophes in YAML'`
   - This is especially important for languages with apostrophes (English, Ukrainian, etc.)

4. **Never use colons in unquoted strings**
   - ❌ BAD: `title: How to: Build Characters`
   - ✅ GOOD: `title: 'How to: Build Characters'`

5. **Keep date format as YYYY-MM-DD** (no quotes needed)
   - Example: `date: 2025-11-20`

6. **Keep published as boolean** (no quotes)
   - Example: `published: true`

### Common Error Prevention

**When translating content:**
- Check for curly apostrophes in the translated text (especially in Ukrainian: `запам'ятовуваних` should be `запам''ятовуваних` in YAML)
- Check for smart quotes that may have been inserted by translation tools
- Always wrap the entire title and excerpt values in single quotes
- Test the build after adding new translations

**Testing for errors:**
```bash
npm run docs:build
```

If you see an error like:
```
can not read a block mapping entry; a multiline key may not be an implicit key
```

This means there's a YAML formatting issue in one of the markdown file frontmatters. Check for:
1. Curly quotes/apostrophes
2. Unescaped single quotes within single-quoted strings
3. Missing quotes around title/excerpt values