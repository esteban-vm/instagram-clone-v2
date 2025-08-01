import { isEmail, isEmpty, isLength, isStrongPassword } from 'validator'

const TextValidations = class {
  static isNotEmpty = (value: string) => !isEmpty(value)
  static isNotEmail = (value: string) => !isEmail(value)
  static isNotStrongPassword = (value: string) => !isStrongPassword(value)
  static isNotCorrectLength = (value: string) => !isLength(value, { min: 4, max: 50 })
}

const TextTransformations = class {
  static truncate(word: string) {
    return word.charAt(0).toUpperCase()
  }

  static capitalize(word: string) {
    return TextTransformations.truncate(word).concat(word.slice(1).toLowerCase())
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
        return TextTransformations.capitalize(word)
      })
      .join(' ')
  }
}

export const Texts = class {
  static Validations = TextValidations
  static Transformations = TextTransformations
}
