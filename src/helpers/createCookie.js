const createCookie = (name, data, expireTime) => {
  const currentTime = new Date();
  currentTime.setTime(currentTime.getTime() + expireTime * 60 * 1000);
  document.cookie = `${name}=${data}; SameSite=None; Secure;  expires=` + currentTime.toUTCString();
};

export default createCookie;
