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
// fdbClient
//   .query(q.Paginate(q.Match(q.Index('all_articles'))))
//   .then((ret) => console.log(ret))

//
//

// NOTE: THE CODE BELOW WORKS
const createP = fdbClient.query(
  q.Create(q.Collection('articles'), {
    data: { title: 'Article 4 From Project', content: 'It works!' }
  })
)
console.log('TCL: createP', createP)
