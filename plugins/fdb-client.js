/* eslint-disable no-console */
const faunadb = require('faunadb')
export const q = faunadb.query

const fdbClient = new faunadb.Client({
  secret: 'fnADX-6IlMACCPErZKXG6X9LhB73quwX2vxuOwSh'
})

export default (ctx, inject) => {
  ctx.fdbClient = fdbClient
  ctx.app.$fdbClient = fdbClient
}

/**
 * Get Index
 */
fdbClient
  .query(q.Paginate(q.Match(q.Index('all_articles'))))
  .then((ret) => console.log(ret.data))

// NOTE: THE CODE BELOW WORKS
// const createP = fdbClient.query(
//   q.Create(q.Collection('articles'), {
//     data: { title: 'Article 4 From Project', content: 'It works!' }
//   })
// )

/**
 * NOTE:
 * Gets single document
 */
const getArticle = fdbClient
  .query(q.Get(q.Ref(q.Collection('articles'), '243173911965991437')))
  .then((ret) => console.log(ret))

console.log('TCL: createP', getArticle)

console.log('Function `articles-read-all` invoked')
// fdbClient
//   .query(q.Paginate(q.Match(q.Ref('indexes/all_articles'))))
//   .then((response) => {
//     const articlesRef = response.data
//     console.log('Articles refs', articlesRef)
//     console.log(`${articlesRef.length} articles found`)

//     // NOTE:create new query out of articles refs. http://bit.ly/2LG3MLg
//     const getAllArticlesDataQuery = articlesRef.map((ref) => {
//       return q.Get(ref)
//     })
//     // then query the refs
//     return fdbClient.query(getAllArticlesDataQuery).then((ret) => {
//       console.log('FINAL Data:', ret)
//     })
//   })
//   .catch((error) => {
//     console.log('error', error)
//   })
