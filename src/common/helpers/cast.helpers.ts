export interface ToNumberOptions {
  default?: number
  min?: number
  max?: number
  fixed?: number
}

export function toNumber(value: string, options: ToNumberOptions = {}): number {
  let valueNumber = Number(value || options.default)

  if (Number.isNaN(valueNumber) || valueNumber === Infinity) {
    valueNumber = options.default ?? options.min
  }

  if (valueNumber < options.min) {
    valueNumber = options.min
  }

  if (valueNumber > options.max) {
    valueNumber = options.max
  }

  if (options.fixed) {
    return Number(valueNumber.toFixed(options.fixed))
  }

  return valueNumber
}
