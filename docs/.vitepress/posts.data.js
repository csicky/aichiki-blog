import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  transform(rawData) {
    return rawData
      .filter(({ frontmatter }) => frontmatter.published !== false)
      .sort((a, b) => {
        return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
      })
  }
})