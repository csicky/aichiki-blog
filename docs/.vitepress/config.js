import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { getSidebar, posts } from './sidebar.js'

export default defineConfig({
  title: "Aichiki's Blog",

  markdown: {
    links: { externalAttrs: { target: '_blank', rel: 'noopener' } },
  },

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
    ],
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      description:
        'Explore the latest updates, feature releases, and ideas shaping AICHIKI.ai',
      themeConfig: {
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
      themeConfig: {
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
