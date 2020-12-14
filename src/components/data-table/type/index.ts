export class TableColumnDef {
  prop!: string
  label!: string
  width?: string
  type?: 'selection' | 'index' |'expand'
  minWidth?: string
  fixed?: 'left' | 'right'
  sortable?: boolean | 'custom'
  formatter?: (row: any, column: any, cellValue: string, index: number) => string
  showOverflowTooltip?: boolean = true
  align?: 'left' | 'center' | 'right'
  headerAlign?: 'left' | 'center' | 'right'
  [name: string]: any
}

export interface Sorter {
  prop: string;
  asc: boolean;
}

export interface DataLoader<T> {
  (params?: Record<string| number, any>): Promise<T[]>;
}

export interface PagedDataLoader<T> {
  (req: PagedDataLoaderRequest): Promise<PagedDataLoaderResponse<T>>;
}

export interface PagedDataLoaderRequest {
  params?: Record<string| number, any>;
  page: number;
  size: number;
  sorter: Sorter | null;
}

export interface PagedDataLoaderResponse<T> {
  total: number;
  page: number;
  size: number;
  rows: T[];
}
