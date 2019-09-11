<template>
  <div class="container">
    <div>
      <h1 class="title">
        Nuxt.js With Netlify/FaunaDB
      </h1>
      <div v-for="(article, index) in articles" :key="index">
        <h2>{{ article.title }}</h2>
      </div>
      <pre>{{ articles }}</pre>
    </div>
  </div>
</template>

<script>
import { q } from '@/plugins/fdb-client'

const getAllArticlesDataQuery = (articlesRef) => {
  return articlesRef.map((ref) => q.Get(ref))
}

export default {
  components: {},
  async asyncData({ fdbClient }) {
    const { data } = await fdbClient.query(
      q.Paginate(q.Match(q.Ref('indexes/all_articles')))
    )
    const Articles = await fdbClient.query(getAllArticlesDataQuery(data))

    return { articles: Articles.map((article) => article.data) }
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
