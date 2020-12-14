import { Filter, filters } from '@/filters'

export const tf = (filter: Filter, ...args: string[]) => {
  return (row: any, column: any, cellValue: string, index: number) => {
    const fn = filters[filter]
    if (!fn) throw new Error(`not define filter [${filter}]`)
    return fn(cellValue, ...args)
  }
}

export const dateFormat = 'yyyy-MM-dd'
