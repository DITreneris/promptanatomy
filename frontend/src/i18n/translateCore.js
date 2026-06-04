export function getNested(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj)
}

export function translateMessages(messages, key, params = {}) {
  let value = getNested(messages, key)
  if (value == null) return key
  if (typeof value !== 'string') return value
  Object.keys(params).forEach((k) => {
    value = value.replace(new RegExp(`{{${k}}}`, 'g'), String(params[k]))
  })
  return value
}
