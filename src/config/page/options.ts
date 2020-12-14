import { PageOption } from './type'

const options: PageOption[] = [
  {
    name: 'dashboard',
    title: '首页',
    router: true
  },
  {
    name: 'example',
    title: '数据管理',
    children: [
      {
        name: 'book',
        title: '批次管理',
        router: true,
        children: [
          {
            name: 'detail',
            title: '详情-{id}',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'edit',
            title: '编辑-{id}',
            router: { pathSuffix: '/:id', nested: false }
          },
          {
            name: 'create',
            title: '创建',
            router: { nested: false }
          }
        ]
      },
      {
        name: 'import',
        title: '案件导入',
        router: true,
        children: [

        ]
      }
    ]
  }
]

export default options
