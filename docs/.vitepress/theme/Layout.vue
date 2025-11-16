<script setup>
import DefaultTheme from 'vitepress/theme'
import Home from './Home.vue'
import BlogDate from './BlogDate.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <Home />
    </template>
    <template #doc-before>
      <BlogDate />
    </template>
  </Layout>
</template>

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