<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, page, lang } = useData()

const displayDate = computed(() => {
  const fmDate = frontmatter.value?.date
  const lastUpdated = page.value?.lastUpdated
  if (isReasonableDate(fmDate)) return fmDate
  if (isReasonableDate(lastUpdated)) return lastUpdated
  return ''
})

function isReasonableDate(value) {
  const time = new Date(value).getTime()
  if (!Number.isFinite(time)) return false
  // Ignore dates that are accidentally set way in the future.
  const now = Date.now()
  const maxFuture = now + 1000 * 60 * 60 * 24 * 30 // 30 days buffer
  return time <= maxFuture
}

function formatDate(value) {
  const parsed = new Date(value)
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

<template>
  <div v-if="displayDate" class="blog-post-date">
    {{ formatDate(displayDate) }}
  </div>
</template>

<style scoped>
.blog-post-date {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0 0 1.5rem 0;
  padding: 0 0 0.75rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
  font-style: italic;
  display: block;
}
</style>
