import { globbySync } from 'globby'
import matter from 'gray-matter'
import fs from 'fs'

function getPosts(lang) {
  const pathRoot = lang === 'en' ? 'docs' : `docs/${lang}`
  const paths = globbySync([`${pathRoot}/posts/*.md`])
  const posts = paths.map(item => {
    const content = fs.readFileSync(item, 'utf-8')
    const { data } = matter(content)
    const link = `/${item.replace('.md', '').replace('docs/', '')}`
    return { ...data, link }
  })
  .filter(item => item.published !== false)
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  return posts
}

export function getSidebar(lang) {
    const posts = getPosts(lang)
    const items = posts.map(post => ({
        text: post.title.replace(/<[^>]*>?/gm, '').substring(0, 40) + '...', // remove html and truncate
        link: post.link
    }))
    const text = lang === 'de' ? 'Alle Beiträge' : 'All Posts'
    return [{ text, items }]
}

export const posts = {
  en: getPosts('en'),
  de: getPosts('de')
}