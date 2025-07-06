import { Feed } from 'feed'
import { writeFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import { posts } from '../sidebar.js'

const baseUrl = 'https://blog.aichiki.ai'

function createFeed(lang) {
  const langConfig = {
    en: {
      title: "Aichiki's Blog",
      description: 'Explore the latest updates, feature releases, and ideas shaping AICHIKI.ai'
    },
    de: {
      title: "Aichikis Blog",
      description: 'Entdecken Sie die neuesten Updates, Funktionsveröffentlichungen und Ideen, die AICHIKI.ai gestalten'
    }
  }

  const feed = new Feed({
    title: langConfig[lang].title,
    description: langConfig[lang].description,
    id: baseUrl,
    link: baseUrl,
    language: lang,
    copyright: `All rights reserved ${new Date().getFullYear()}, Aichiki`,
  })

  posts[lang].forEach((post) => {
    const url = `${baseUrl}${post.link}`
    feed.addItem({
      title: post.title.replace(/<[^>]*>?/gm, ''),
      id: url,
      link: url,
      description: post.excerpt,
      date: new Date(post.date),
    })
  })

  const langPath = lang === 'en' ? '' : `${lang}/`
  const outputDir = resolve(process.cwd(), `docs/.vitepress/dist/${langPath}`)
  mkdirSync(outputDir, { recursive: true })
  writeFileSync(resolve(outputDir, 'feed.xml'), feed.rss2())
}

createFeed('en')
createFeed('de')