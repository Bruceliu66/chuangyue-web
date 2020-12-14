import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 8)',
    name: '@cword(4, 8)',
    author: '@cname',
    publishDate: '@date',
    rank: '@integer',
    'status|1': ['0', '1'],
  }]
}).list

export default data
