import { defineConfig } from 'vitepress'
import posts from './theme/posts.js'

export default defineConfig({
  title: "Aichiki's Blog",
  description: "A blog about tech and other things.",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aichiki' }
    ]
  },
  customData: {
    posts: posts
  }
})