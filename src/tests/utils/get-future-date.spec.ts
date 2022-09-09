import { expect, test } from "vitest"
import { getFutureDate } from "./get-future-date"

test('increases date with one year', () => {

  const year = new Date().getFullYear()
  const expectedYear = year + 1

  expect(getFutureDate(`${year}-08-10`).getFullYear()).toEqual(expectedYear)
})