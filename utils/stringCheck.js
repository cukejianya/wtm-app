let validNameCheck = (string) => {
  return /^[a-zA-Z][a-zA-Z-']+$/.test(string);
}

let validEmailCheck = (string) => {
    return /^[/w/d/S]+@[a-zA-Z]+[\./w/w/w]$/
}

export {
  validEmailCheck,
  validNameCheck
}
