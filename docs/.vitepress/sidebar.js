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
  const items = posts.map((post) => ({
    text: post.title.replace(/<[^>]*>?/gm, '').substring(0, 40) + '...', // remove html and truncate
    link: post.link,
  }))
  const text =
    lang === 'de'
      ? 'Alle Beiträge'
      : lang === 'zh'
        ? '所有帖子'
        : lang === 'ro'
          ? 'Toate postările'
          : lang === 'hu'
            ? 'Összes bejegyzés'
            : lang === 'es'
              ? 'Todas las publicaciones'
              : lang === 'ja'
                ? 'すべての投稿'
                : lang === 'hi'
                  ? 'सभी पोस्ट'
                  : lang === 'ar'
                    ? 'كل المشاركات'
                    : lang === 'pt'
                      ? 'Todos os posts'
                      : lang === 'ru'
                        ? 'Все посты'
                        : lang === 'fr'
                          ? 'Toutes les publications'
                          : lang === 'ko'
                            ? '모든 게시물'
                            : lang === 'it'
                              ? 'Tutti i post'
                              : lang === 'nl'
                                ? 'Alle berichten'
                                : lang === 'pl'
                                  ? 'Wszystkie posty'
                                  : lang === 'tr'
                                    ? 'Tüm gönderiler'
                                    : lang === 'id'
                                      ? 'Semua postingan'
                                      : lang === 'vi'
                                        ? 'Tất cả các bài viết'
                                        : lang === 'th'
                                          ? 'โพสต์ทั้งหมด'
                                          : lang === 'uk'
                                            ? 'Всі пости'
                                            : lang === 'cs'
                                              ? 'Všechny příspěvky'
                                              : 'All Posts'
  return [{ text, items }]
}

export const posts = {
  en: getPosts('en'),
  de: getPosts('de'),
  zh: getPosts('zh'),
  ro: getPosts('ro'),
  hu: getPosts('hu'),
  es: getPosts('es'),
  ja: getPosts('ja'),
  hi: getPosts('hi'),
  ar: getPosts('ar'),
  pt: getPosts('pt'),
  ru: getPosts('ru'),
  fr: getPosts('fr'),
  ko: getPosts('ko'),
  it: getPosts('it'),
  nl: getPosts('nl'),
  pl: getPosts('pl'),
  tr: getPosts('tr'),
  id: getPosts('id'),
  vi: getPosts('vi'),
  th: getPosts('th'),
  uk: getPosts('uk'),
  cs: getPosts('cs'),
}