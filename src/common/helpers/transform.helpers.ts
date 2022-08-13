import { BadRequestException } from "@nestjs/common"
import { TransformationType, TransformFnParams } from "class-transformer"

import { toNumber } from "./cast.helpers"

interface TransformNumberOptions {
  default?: number
  min?: number
  max?: number
}

export function transformNumber(
  options: TransformNumberOptions = {}
): (params: TransformFnParams) => number {
  return ({ value }) => toNumber(value, options)
}

export function transformDate({ type, value }: TransformFnParams): Date | string {
  switch (type) {
    case TransformationType.CLASS_TO_PLAIN:
      return (value as Date).toLocaleString("en", { dateStyle: "short" })

    case TransformationType.PLAIN_TO_CLASS:
      if (/^\d{4}-\d{2}-\d{2}$/m.test(value) === false) {
        throw new BadRequestException(
          "Validation failed: Wrong date format, the accepted is YYYY-MM-DD."
        )
      }

      return new Date(value as string)

    default:
      return value
  }
}
