export const required = name => v => (v ? undefined : `${name} is required.`)
export const number = name => v =>
  Number.isNaN(Number(v)) ? `${name} must be a number.` : undefined
export const email = name => v =>
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
    v
  )
    ? undefined
    : `${name} must be a valid email.`
