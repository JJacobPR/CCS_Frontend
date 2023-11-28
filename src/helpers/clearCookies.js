const clearCookies = () => {
  document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  document.cookie = "refreshToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
};

export default clearCookies;
