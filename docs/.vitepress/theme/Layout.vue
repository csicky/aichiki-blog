<script setup>
import DefaultTheme from 'vitepress/theme'
import Home from './Home.vue'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <Home />
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