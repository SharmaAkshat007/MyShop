const validator = (info) => {
  const { email, password } = info;

  const firstName = info.firstName !== undefined ? info.firstName : undefined;
  const lastName = info.lastName !== undefined ? info.lastName : undefined;

  if (email.length === 0) {
    return false;
  }
  if (password.length === 0) {
    return false;
  }

  if (firstName !== undefined && firstName.length === 0) {
    return false;
  }

  if (lastName !== undefined && lastName.length === 0) {
    return false;
  }

  return true;
};

export default validator;
