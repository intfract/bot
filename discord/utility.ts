export function wrap(text: string, quote: string) {
  return quote + text + quote
}

export function codeBlock(text: string) {
  const quote = '`'.repeat(3)
  return wrap(text, quote)
}