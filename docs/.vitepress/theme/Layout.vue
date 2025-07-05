<template>
  <div class="blog-layout">
    <header>
      <h1><a :href="site.base">{{ site.title }}</a></h1>
      <p>{{ site.description }}</p>
    </header>
    <main>
      <div v-if="frontmatter.layout === 'home'">
        <div v-for="post in posts" :key="post.path">
          <h2><a :href="post.path">{{ post.frontmatter.title }}</a></h2>
          <p>{{ post.frontmatter.excerpt }}</p>
        </div>
      </div>
      <Content v-else />
    </main>
  </div>
</template>

<script>
import { useData } from 'vitepress'

export default {
  setup() {
    const { site, frontmatter, theme } = useData()
    return { site, frontmatter, posts: theme.value.posts }
  }
}
</script>

<style>
.blog-layout {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
header {
  text-align: center;
  margin-bottom: 2rem;
}
</style>