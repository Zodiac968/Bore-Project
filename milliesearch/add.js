import { MeiliSearch } from 'meilisearch'
const names = [{id:1, title:"reena.txt"}, {id:2, title:"vaish.txt"},{id:3, title:"reihan.txt"},{id:4, title:"justin.txt"},{id:5, title:"bieber.txt"},{id:6, title:"selena.txt"}]
const client = new MeiliSearch({
    host: 'http://localhost:7700',
    apiKey: ''
  })
//   client.index('names').addDocuments(names)
//     .then((res) => console.log(res))

client.index('names').search('re').then((res) => console.log(res))
