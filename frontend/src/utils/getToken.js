const getToken = () => {
  const token = sessionStorage.getItem("jwt-token");

  if (token !== null && token.length !== 0) {
    return {
      present: true,
      token: token,
    };
  } else {
    return {
      present: false,
      token: token,
    };
  }
};

export default getToken;
