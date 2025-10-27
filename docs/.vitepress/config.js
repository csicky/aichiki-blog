import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { getSidebar, posts } from './sidebar.js'

const languages = [
  {
    code: 'zh',
    label: '简体中文',
    lang: 'zh-CN',
    description: '探索塑造 AICHIKI.ai 的最新更新、功能发布和想法',
    rssTitle: 'AICHIKI 博客 RSS 提要',
    navHome: '首页',
    navBlog: '博客',
  },
  {
    code: 'ro',
    label: 'Română',
    lang: 'ro-RO',
    description:
      'Explorați cele mai recente actualizări, versiuni de funcții și idei care modelează AICHIKI.ai',
    rssTitle: 'AICHIKI Blog RSS Feed',
    navHome: 'Acasă',
    navBlog: 'Blog',
  },
  {
    code: 'hu',
    label: 'Magyar',
    lang: 'hu-HU',
    description:
      'Fedezze fel a legújabb frissítéseket, funkciókiadásokat és ötleteket, amelyek formálják az AICHIKI.ai-t',
    rssTitle: 'AICHIKI Blog RSS-hírcsatorna',
    navHome: 'Kezdőlap',
    navBlog: 'Blog',
  },
  {
    code: 'es',
    label: 'Español',
    lang: 'es-ES',
    description:
      'Explore las últimas actualizaciones, lanzamientos de funciones e ideas que dan forma a AICHIKI.ai',
    rssTitle: 'AICHIKI Blog RSS Feed',
    navHome: 'Inicio',
    navBlog: 'Blog',
  },
  {
    code: 'ja',
    label: '日本語',
    lang: 'ja-JP',
    description:
      'AICHIKI.aiを形作る最新のアップデート、機能リリース、アイデアをご覧ください',
    rssTitle: 'AICHIKIブログRSSフィード',
    navHome: 'ホーム',
    navBlog: 'ブログ',
  },
  {
    code: 'hi',
    label: 'हिन्दी',
    lang: 'hi-IN',
    description:
      'AICHIKI.ai को आकार देने वाले नवीनतम अपडेट, फ़ीचर रिलीज़ और विचारों का अन्वेषण करें',
    rssTitle: 'AICHIKI ब्लॉग RSS फ़ीड',
    navHome: 'होम',
    navBlog: 'ब्लॉग',
  },
  {
    code: 'ar',
    label: 'العربية',
    lang: 'ar-SA',
    description:
      'استكشف آخر التحديثات وإصدارات الميزات والأفكار التي تشكل AICHIKI.ai',
    rssTitle: 'تغذية RSS لمدونة AICHIKI',
    navHome: 'الرئيسية',
    navBlog: 'المدونة',
  },
  {
    code: 'pt',
    label: 'Português',
    lang: 'pt-PT',
    description:
      'Explore as últimas atualizações, lançamentos de recursos e ideias que moldam o AICHIKI.ai',
    rssTitle: 'Feed RSS do Blog da AICHIKI',
    navHome: 'Início',
    navBlog: 'Blog',
  },
  {
    code: 'ru',
    label: 'Русский',
    lang: 'ru-RU',
    description:
      'Изучите последние обновления, выпуски функций и идеи, формирующие AICHIKI.ai',
    rssTitle: 'RSS-лента блога AICHIKI',
    navHome: 'Главная',
    navBlog: 'Блог',
  },
  {
    code: 'fr',
    label: 'Français',
    lang: 'fr-FR',
    description:
      'Découvrez les dernières mises à jour, les nouvelles fonctionnalités et les idées qui façonnent AICHIKI.ai',
    rssTitle: "Flux RSS du blog d'AICHIKI",
    navHome: 'Accueil',
    navBlog: 'Blog',
  },
  {
    code: 'ko',
    label: '한국어',
    lang: 'ko-KR',
    description:
      'AICHIKI.ai를 형성하는 최신 업데이트, 기능 출시 및 아이디어를 살펴보세요',
    rssTitle: 'AICHIKI 블로그 RSS 피드',
    navHome: '홈',
    navBlog: '블로그',
  },
  {
    code: 'it',
    label: 'Italiano',
    lang: 'it-IT',
    description:
      'Esplora gli ultimi aggiornamenti, le versioni delle funzionalità e le idee che modellano AICHIKI.ai',
    rssTitle: 'Feed RSS del blog di AICHIKI',
    navHome: 'Home',
    navBlog: 'Blog',
  },
  {
    code: 'nl',
    label: 'Nederlands',
    lang: 'nl-NL',
    description:
      'Ontdek de nieuwste updates, functiereleases en ideeën die AICHIKI.ai vormgeven',
    rssTitle: 'AICHIKI Blog RSS Feed',
    navHome: 'Home',
    navBlog: 'Blog',
  },
  {
    code: 'pl',
    label: 'Polski',
    lang: 'pl-PL',
    description:
      'Poznaj najnowsze aktualizacje, wydania funkcji i pomysły kształtujące AICHIKI.ai',
    rssTitle: 'Kanał RSS bloga AICHIKI',
    navHome: 'Strona główna',
    navBlog: 'Blog',
  },
  {
    code: 'tr',
    label: 'Türkçe',
    lang: 'tr-TR',
    description:
      "AICHIKI.ai'yi şekillendiren en son güncellemeleri, özellik sürümlerini ve fikirleri keşfedin",
    rssTitle: 'AICHIKI Blog RSS Beslemesi',
    navHome: 'Anasayfa',
    navBlog: 'Blog',
  },
  {
    code: 'id',
    label: 'Bahasa Indonesia',
    lang: 'id-ID',
    description:
      'Jelajahi pembaruan terbaru, rilis fitur, dan ide-ide yang membentuk AICHIKI.ai',
    rssTitle: 'Umpan RSS Blog AICHIKI',
    navHome: 'Beranda',
    navBlog: 'Blog',
  },
  {
    code: 'vi',
    label: 'Tiếng Việt',
    lang: 'vi-VN',
    description:
      'Khám phá các bản cập nhật mới nhất, các bản phát hành tính năng và các ý tưởng định hình AICHIKI.ai',
    rssTitle: 'Nguồn cấp RSS của Blog AICHIKI',
    navHome: 'Trang chủ',
    navBlog: 'Blog',
  },
  {
    code: 'th',
    label: 'ไทย',
    lang: 'th-TH',
    description:
      'สำรวจการอัปเดตล่าสุด การเปิดตัวฟีเจอร์ และแนวคิดที่สร้าง AICHIKI.ai',
    rssTitle: 'ฟีด RSS ของบล็อก AICHIKI',
    navHome: 'หน้าแรก',
    navBlog: 'บล็อก',
  },
  {
    code: 'uk',
    label: 'Українська',
    lang: 'uk-UA',
    description:
      'Ознайомтеся з останніми оновленнями, випусками функцій та ідеями, що формують AICHIKI.ai',
    rssTitle: 'RSS-стрічка блогу AICHIKI',
    navHome: 'Головна',
    navBlog: 'Блог',
  },
  {
    code: 'cs',
    label: 'Čeština',
    lang: 'cs-CZ',
    description:
      'Prozkoumejte nejnovější aktualizace, vydání funkcí a nápady utvářející AICHIKI.ai',
    rssTitle: 'RSS kanál blogu AICHIKI',
    navHome: 'Domů',
    navBlog: 'Blog',
  },
]

const generatedLocales = languages.reduce((acc, lang) => {
  posts[lang.code] = getSidebar(lang.code)
  acc[lang.code] = {
    label: lang.label,
    lang: lang.lang,
    description: lang.description,
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
          href: `/${lang.code}/feed.xml`,
          title: lang.rssTitle,
        },
      ],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:title', content: "Aichiki's Blog" }],
      ['meta', { property: 'og:description', content: lang.description }],
      [
        'meta',
        {
          property: 'og:image',
          content: 'https://blog.aichiki.ai/aichiki-avatar.png',
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
        { icon: 'rss', link: `/${lang.code}/feed.xml` },
      ],
      nav: [
        { text: lang.navHome, link: `/${lang.code}/` },
        { text: lang.navBlog, link: posts[lang.code][0]?.link || '#' },
      ],
      sidebar: {
        [`/${lang.code}/posts/`]: getSidebar(lang.code),
      },
    },
  }
  return acc
}, {})

export default defineConfig({
  title: "Aichiki's Blog",

  sitemap: {
    hostname: 'https://blog.aichiki.ai'
  },

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
            content: 'https://blog.aichiki.ai/aichiki-avatar.png',
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
            content: 'https://blog.aichiki.ai/aichiki-avatar.png',
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
    ...generatedLocales,
  },

  vite: {
    server: {
      hmr: {
        overlay: false,
      },
    },
  },
})
