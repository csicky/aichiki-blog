import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { getSidebar, posts } from './sidebar.js'

export default defineConfig({
  title: "Aichiki's Blog",

  markdown: {
    links: { externalAttrs: { target: '_blank', rel: 'noopener' } },
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      description:
        'Explore the latest updates, feature releases, and ideas shaping AICHIKI.ai',
      head: [
        [
          'link',
          {
            rel: 'icon',
            type: 'image/svg+xml',
            href: '/aichiki-logo-2_dcb16g.svg',
          },
        ],
        [
          'link',
          {
            rel: 'alternate',
            type: 'application/rss+xml',
            href: '/feed.xml',
            title: "Aichiki's Blog RSS Feed",
          },
        ],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:title', content: "Aichiki's Blog" }],
        [
          'meta',
          {
            property: 'og:description',
            content:
              'Explore the latest updates, feature releases, and ideas shaping AICHIKI.ai',
          },
        ],
        [
          'meta',
          {
            property: 'og:image',
            content: 'https://blog.aichiki.ai/aichiki-avatar.webp',
          },
        ],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ],
      themeConfig: {
        socialLinks: [
          { icon: 'discord', link: 'https://discord.gg/z8r5X8pP9y' },
          {
            icon: {
              svg: fs.readFileSync(
                path.resolve('./docs/public/aichiki-logo-2_dcb16g.svg'),
                'utf-8'
              ),
            },
            link: 'https://aichiki.ai',
            ariaLabel: 'Aichiki Website',
          },
          { icon: 'rss', link: '/feed.xml' },
        ],
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Blog', link: posts.en[0].link },
        ],
        sidebar: {
          '/posts/': getSidebar('en'),
        },
      },
    },
    de: {
      label: 'Deutsch',
      lang: 'de-DE',
      description:
        'Entdecken Sie die neuesten Updates, Funktionsveröffentlichungen und Ideen, die AICHIKI.ai gestalten',
      head: [
        [
          'link',
          {
            rel: 'icon',
            type: 'image/svg+xml',
            href: '/aichiki-logo-2_dcb16g.svg',
          },
        ],
        [
          'link',
          {
            rel: 'alternate',
            type: 'application/rss+xml',
            href: '/de/feed.xml',
            title: 'Aichikis Blog RSS-Feed',
          },
        ],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:title', content: 'Aichikis Blog' }],
        [
          'meta',
          {
            property: 'og:description',
            content:
              'Entdecken Sie die neuesten Updates, Funktionsveröffentlichungen und Ideen, die AICHIKI.ai gestalten',
          },
        ],
        [
          'meta',
          {
            property: 'og:image',
            content: 'https://blog.aichiki.ai/aichiki-avatar.webp',
          },
        ],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ],
      themeConfig: {
        socialLinks: [
          { icon: 'discord', link: 'https://discord.gg/z8r5X8pP9y' },
          {
            icon: {
              svg: fs.readFileSync(
                path.resolve('./docs/public/aichiki-logo-2_dcb16g.svg'),
                'utf-8'
              ),
            },
            link: 'https://aichiki.ai',
            ariaLabel: 'Aichiki Website',
          },
          { icon: 'rss', link: '/de/feed.xml' },
        ],
        nav: [
          { text: 'Startseite', link: '/de/' },
          { text: 'Blog', link: posts.de[0].link },
        ],
        sidebar: {
          '/de/posts/': getSidebar('de'),
        },
      },
    },
  },

  vite: {
    server: {
      hmr: {
        overlay: false,
      },
    },
  },
})
