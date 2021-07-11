const getToken = () => {
  const token = localStorage.getItem("jwt-token");

  if (token !== null && token.length !== 0) {
    return true;
  } else {
    return false;
  }
};

export default getToken;
