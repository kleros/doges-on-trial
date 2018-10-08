export const required = name => v => (v ? undefined : `${name} is required.`)
export const number = name => v =>
  Number.isNaN(Number(v)) ? `${name} must be a number.` : undefined
export const email = name => v =>
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
    v
  )
    ? undefined
    : `${name} must be a valid email.`
export const dogecoinAddress = name => v =>
  /^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$/.test(v)
    ? undefined
    : `${name} must be a valid Dogecoin address.`
