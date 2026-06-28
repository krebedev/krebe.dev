const validateFormField = (field, value) => {
  switch (field) {
    case 'name':
      return value.length > 1
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    case 'message':
      return value.length > 9
  }
}

export default validateFormField
