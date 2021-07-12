const getToken = () => {
  const token = sessionStorage.getItem("jwt-token");

  if (token === undefined) {
    return undefined;
  } else if (token === null) {
    return undefined;
  } else {
    return token;
  }
};

export default getToken;
