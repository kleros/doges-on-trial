/**
 * Creates a JS enum.
 * @param {string[]} arr - An array with the enum string values in order.
 * @returns {object} - A JS enum object.
 */
export default function createEnum(arr) {
  return Object.freeze(
    arr.reduce((acc, value, i) => {
      acc[value] = i
      acc[i] = value
      if (acc.values) acc.values.push(value)
      else acc.values = [value]
      if (acc.indexes) acc.indexes.push(i)
      else acc.indexes = [i]
      return acc
    }, {})
  )
}
