import { getDictionary } from '@/config/dictionary'

export default function (value: any, code: string) {
  if (!value) return ''
  const map = getDictionary(code) || {}
  return map[value] || value
}
