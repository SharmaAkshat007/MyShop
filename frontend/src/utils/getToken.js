const getToken = () => {
  const token = sessionStorage.getItem("jwt-token");

 
    return token;
  
};

export default getToken;
