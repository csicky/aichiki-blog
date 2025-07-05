import { globby } from 'globby'
import {matter} from 'gray-matter'
import fs from 'fs-extra'
import path from 'path'

async function getPosts() {
  const paths = await globby(['docs/posts/*.md'])
  const posts = await Promise.all(
    paths.map(async (item) => {
      const content = await fs.readFile(item, 'utf-8')
      const { data } = matter(content)
      const postPath = `/${item.replace('.md', '.html').replace('docs/','')}`
      return {
        frontmatter: { ...data },
        path: postPath
      }
    })
  )
  return posts
}

export default {
    load: getPosts,
    watch: 'docs/posts/*.md'
}