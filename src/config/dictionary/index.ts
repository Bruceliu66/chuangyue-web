import options from './options'

export function getDictionary (name: string): Record<string | number, string> {
  return options[name] || {}
}

export const d = getDictionary

export const f = (row: any, column: any, cellValue: string, index: number) => {
  return (getDictionary(column.property) || {})[cellValue] || cellValue
}
