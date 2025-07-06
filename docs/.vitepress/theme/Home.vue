<template>
  <div class="home-container">
    <div v-for="post in posts" :key="post.url" class="post-preview">
      <h2 class="post-title">
        <a :href="post.link">{{ post.frontmatter.title }}</a>
      </h2>
      <p class="post-date">{{ new Date(post.frontmatter.date).toDateString() }}</p>
      <p class="post-excerpt">{{ post.frontmatter.excerpt }}</p>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { posts as allPosts } from '../sidebar.js'

const { lang } = useData()
const posts = allPosts[lang.value.split('-')[0] || 'en']

</script>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 0 auto;
}

.post-preview {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-title a {
  font-size: 1.75rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.25s;
}

.post-title a:hover {
  color: var(--vp-c-brand);
}

.post-date {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

.post-excerpt {
  margin-top: 1rem;
  color: var(--vp-c-text-1);
}
</style>