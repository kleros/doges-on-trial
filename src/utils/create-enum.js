/**
 * Creates a JS enum.
 * @param {string[]} arr - An array with the enum string values in order.
 * @returns {object} - A JS enum object.
 */
export default function createEnum(arr) {
  const enumObj = arr.reduce((acc, value, i) => {
    acc[value] = i
    acc[i] = value
    return acc
  }, {})
  enumObj.values = [...arr]
  return Object.freeze(enumObj)
}
