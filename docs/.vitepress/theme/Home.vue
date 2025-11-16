<template>
  <div class="home-container">
    <div v-for="post in posts" :key="post.link" class="post-preview">
      <h2 class="post-title">
        <a :href="post.link">{{ post.frontmatter.title || post.title }}</a>
      </h2>
      <p class="post-date">
        {{ formatDate(resolveDate(post)) }}
      </p>
      <p v-if="post.frontmatter.excerpt" class="post-excerpt">
        {{ post.frontmatter.excerpt }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const englishPosts = import.meta.glob('../../posts/*.md', {
  eager: true,
  import: '__pageData',
})
const localizedPosts = import.meta.glob('../../*/posts/*.md', {
  eager: true,
  import: '__pageData',
})

const normalisePosts = modules =>
  Object.entries(modules)
    .map(([path, mod]) => {
      const rootRelativePath = path.replace('../../', '').replace(/\.md$/, '')
      const frontmatter = mod?.frontmatter || {}
      return {
        frontmatter,
        title: frontmatter.title || mod?.title || '',
        lastUpdated: mod?.lastUpdated,
        link: `/${rootRelativePath}`,
      }
    })
    .filter(post => post.frontmatter.published !== false)
    .sort((a, b) => getTime(resolveDate(b)) - getTime(resolveDate(a)))

const postsByLang = Object.entries(localizedPosts).reduce(
  (acc, [path, mod]) => {
    const langMatch = path.match(/\.\.\/\.\.\/([^/]+)\/posts\//)
    const lang = langMatch?.[1]
    if (!lang) return acc
    acc[lang] = acc[lang] || []
    const rootRelativePath = path.replace('../../', '').replace(/\.md$/, '')
    const frontmatter = mod?.frontmatter || {}
    acc[lang].push({
      frontmatter,
      title: frontmatter.title || mod?.title || '',
      lastUpdated: mod?.lastUpdated,
      link: `/${rootRelativePath}`,
    })
    return acc
  },
  { en: normalisePosts(englishPosts) }
)

Object.keys(postsByLang).forEach(lang => {
  postsByLang[lang] = postsByLang[lang]
    .filter(post => post.frontmatter.published !== false)
    .sort((a, b) => getTime(resolveDate(b)) - getTime(resolveDate(a)))
})

const { lang } = useData()
const posts = computed(() => postsByLang[lang.value.split('-')[0] || 'en'] || [])

function getTime(date) {
  const value = new Date(date).getTime()
  return Number.isNaN(value) ? 0 : value
}

function resolveDate(post) {
  if (isReasonableDate(post.frontmatter?.date)) return post.frontmatter.date
  if (isReasonableDate(post.lastUpdated)) return post.lastUpdated
  return ''
}

function isReasonableDate(value) {
  const time = new Date(value).getTime()
  if (!Number.isFinite(time)) return false
  // Guard against accidentally future-dated frontmatter.
  const now = Date.now()
  const maxFuture = now + 1000 * 60 * 60 * 24 * 30 // 30 days buffer
  return time <= maxFuture
}

function formatDate(date) {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return ''
  const locale = lang.value || 'en-US'
  const formatted = parsed.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const prefix =
    datePrefixes[lang.value.split('-')[0]] || datePrefixes.en
  return `${prefix} ${formatted}`
}

const datePrefixes = {
  en: 'Last updated',
  de: 'Zuletzt aktualisiert',
  zh: '最后更新',
  ro: 'Ultima actualizare la',
  hu: 'Utoljára frissítve',
  es: 'Última actualización',
  ja: '最終更新',
  hi: 'अंतिम अपडेट',
  ar: 'آخر تحديث',
  pt: 'Última atualização',
  ru: 'Последнее обновление',
  fr: 'Dernière mise à jour le',
  ko: '마지막 업데이트',
  it: 'Ultimo aggiornamento',
  nl: 'Laatst bijgewerkt',
  pl: 'Ostatnia aktualizacja',
  tr: 'Son güncelleme',
  id: 'Pembaruan terakhir',
  vi: 'Cập nhật lần cuối',
  th: 'อัปเดตล่าสุด',
  uk: 'Останнє оновлення',
  cs: 'Naposledy aktualizováno',
}
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
