const createCookie = (name, data, expireTime) => {
  const currentTime = new Date();
  currentTime.setTime(currentTime.getTime() + expireTime * 10 * 1000);
  document.cookie = `${name}=${data}; SameSite=None;  path=/;  expires=` + currentTime.toUTCString();
};

export default createCookie;
