import { TableColumnDef } from '@/components/data-table/type'
import { tf } from '@/config/other'

export const columns: TableColumnDef[] = [
  { prop: '', type: 'selection', label: '', width: '48px', fixed: 'left' },
  { prop: 'id', label: '批次号' },
  { prop: 'name', label: '委托方' },
  { prop: 'author', label: '催收区域' },
  { prop: 'publishDate', label: '委案日期' },
  { prop: 'status', label: '委案类型', formatter: tf('transcode', 'status') },
  { prop: 'opt', label: '预计退案日期', width: '180px', fixed: 'right' }
]
