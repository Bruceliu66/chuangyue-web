<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import pages from '@/config/page'

@Component({
  components: { }
})
export default class AppMenu extends Vue {
  @Prop(Boolean) expand!: boolean

  get menus () {
    return pages // .filter((v: any) => this.$auth.accessSync(v.path))
  }

  get lastMenus () {
    const ret: any[] = []
    traverse(this.menus)
    return ret

    function traverse (list: any[]) {
      if (!Array.isArray(list) || list.length < 1) return
      list.forEach((v: any) => {
        if (v.menu && v.router) {
          ret.push(v)
        } else {
          if (Array.isArray(v.children) && v.children.length > 0) traverse(v.children)
        }
      })
    }
  }

  get aciveIndex () {
    const vm = this as any
    const path = this.$route.path
    return getPath(path)

    function getPath (path: string): string {
      if (!path) return ''
      const has = vm.lastMenus.some((v: any) => v.path === path)
      if (has) return path
      return getPath(path.slice(0, path.lastIndexOf('/')))
    }
  }

  get expandCls () {
    return this.expand ? (this as any).$style.expand : ''
  }

  render (h: CreateElement) {
    const vm = this as any
    const data = {
      props: {
        backgroundColor: '#515050',
        textColor: 'rgba(255, 255, 255, .8)',
        activeTextColor: '#fff',
        router: true,
        defaultActive: this.aciveIndex,
        collapse: !this.expand
      },
      class: [this.expandCls, 'nav-menu']
    }
    return h('el-menu', data, this.menus.map((v: any) => renderItem(v)))

    function renderItem (item: any) {
      if (!item || !item.menu) return null
      const children = (item.children || []) // .filter((v: any) => vm.$auth.accessSync(v.path))
      if (children.length > 0 && !item.router) return renderSubMenu(item)
      return renderMenuItem(item)

      function renderSubMenu (item: any) {
        const data = {
          props: {
            index: item.path
          }
        }
        const children = item.children || []
        const content = [
          h('div', { slot: 'title' }, [renderIcon(item), h('span', item.title)]),
          children.map((v: any) => renderItem(v))
        ]
        return h('el-submenu', data, content)
      }

      function renderMenuItem (item: any) {
        const data = {
          props: {
            index: item.path
          }
        }
        const content = [
          renderIcon(item),
          h('span', { slot: 'title' }, item.title)
        ]
        return h('el-menu-item', data, content)
      }

      function renderIcon (item: any) {
        return h('i', { class: [vm.$style.icon] }, [h('svg-icon', { props: { icon: item.name } })])
      }
    }
  }

  $style!: Record<string, unknown>
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";

.expand {
  width: 200px;
}

.icon {
    font-size: 16px;
    color: inherit !important;
    margin-right: 4px;
    line-height: 1;
}
</style>

<style lang="scss">
@import "~@/styles/vars.scss";
.nav-menu.el-menu{
  border-right-color: transparent;
  font-weight: 600;

  .el-submenu.is-opened {
    .el-menu {
      background-color: #333 !important;
    }

    .el-menu-item {
      background-color: #333 !important;
      &.is-active, &:hover{
        background-color: $color-primary !important;
      }
    }
  }

  .el-menu-item, .el-submenu__title{
      height: 46px;
      line-height: 46px;
      &.is-active, &:hover{
        background-color: $color-primary !important;
      }
  }

  .el-submenu {
    .el-menu-item {
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
