const isEqual = (a, b) => {
  for (const v of Object.keys(a)) {
    console.log({ a: a[v], b: b[v], check: (a[v] !== b[v]) })
    if (a[v] !== b[v]) {
      return false
    }
  }
  return true
}

export default isEqual
