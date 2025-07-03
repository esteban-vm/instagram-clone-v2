export const Texts = class {
  static capitalize(word: string) {
    return word.charAt(0).toUpperCase().concat(word.slice(1).toLowerCase())
  }

  static separate(text: string) {
    const replaceValue = '$1 $2'

    return text
      .replace(/([A-Z]+)([A-Z][a-z])/g, replaceValue)
      .replace(/([a-z0-9])([A-Z])/g, replaceValue)
      .replace(/([a-zA-Z])([0-9])/g, replaceValue)
      .replace(/([0-9])([a-zA-Z])/g, replaceValue)
      .split(' ')
      .map((word) => {
        if (/^[A-Z]{2,}$/.test(word)) return word
        return this.capitalize(word)
      })
      .join(' ')
  }
}
