import { DataLoader, PagedDataLoader, Sorter } from './type'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({
  components: { }
})
export default class DataIterator<T> extends Vue {
  @Prop(Array) dataSource?: any[]

  @Prop() loader?: DataLoader<T>

  @Prop() pagedLoader?: PagedDataLoader<T>

  @Prop(String) api!: string

  @Prop(Number) defaultSize!: number

  // 以上三者选其一

  @Prop({ type: Boolean, default: true }) pageable!: boolean // 是否分页

  page = 1

  size = 10

  sorter: Sorter | null = null

  params: Record<string | number, any> = {}

  localRows: T[] = []

  localTotal = 0

  loading = false

  private seq = 1

  get actualPagedLoader () {
    if (this.api) {
      return ({ page, size, params }: any) => this.$http.post<any>(this.api,
        { ...params, pageNum: page, pageSize: size }).then(data => Object.assign({ page: data.pageNum, size: data.pageSize }, data)
      )
    }
    return this.pagedLoader
  }

  get rows (): T[] {
    const data = this.dataSource || this.localRows || []
    if (this.actualPagedLoader) {
      return data
    } else {
      const start = (this.page - 1) * this.size
      return this.pageable ? data.slice(start, start + this.size) : data
    }
  }

  set rows (rows: T[]) {
    this.localRows = rows
  }

  get total (): number {
    if (this.dataSource) {
      return this.dataSource.length
    } else if (this.loader) {
      return this.localRows.length
    } else if (this.actualPagedLoader) {
      return this.localTotal
    } else {
      return 0
    }
  }

  set total (total: number) {
    this.localTotal = total
  }

  query (params: Record<string | number, any> = {}) {
    this.params = params
    this.sorter = null
    this.load(params, 1, this.size)
  }

  refresh () {
    this.load(this.params, this.page, this.size)
  }

  protected load (params: Record<string | number, any> = {}, page: number, size: number) {
    if (this.dataSource) {
      this.page = page
      this.size = size
    } else if (this.loader) {
      const seq = this.seq = this.seq + 1
      this.loading = true
      this.loader(params).then(data => {
        if (seq === this.seq) {
          this.rows = data
          this.page = page
          this.size = size
          this.loading = false
        }
      }).catch((e: any) => {
        if (seq === this.seq) {
          this.loading = false
        }
      })
    } else if (this.actualPagedLoader) {
      const seq = this.seq = this.seq + 1
      this.loading = true
      this.actualPagedLoader({ params, page, size, sorter: this.sorter }).then(data => {
        if (seq === this.seq) {
          const { page, size, total, rows } = data || {}
          this.page = page || this.page
          this.size = size || this.size
          this.total = total || 0
          this.rows = rows || []
          this.loading = false
        }
      }).catch((e: any) => {
        if (seq === this.seq) {
          this.loading = false
        }
      })
    } else {
      throw new Error('can\'t load data, must define one of [dataSource] [loader] [pagedLoader]')
    }
  }

  @Watch('defaultSize', { immediate: true }) defaultSizeChange () {
    if (this.defaultSize) this.size = this.defaultSize
  }
}
