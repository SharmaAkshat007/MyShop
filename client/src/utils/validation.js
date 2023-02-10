const validator = (info) => {
  const { first, second } = info;

  const third = info.third !== undefined ? info.third : undefined;
  const fourth = info.fourth !== undefined ? info.fourth : undefined;

  if (first.length === 0) {
    return false;
  }
  if (second.length === 0) {
    return false;
  }

  if (third !== undefined && third.length === 0) {
    return false;
  }

  if (fourth !== undefined && fourth.length === 0) {
    return false;
  }

  return true;
};

export default validator;
