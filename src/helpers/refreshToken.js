import createCookie from "./createCookie.js";

const refreshTokenFunc = async (refreshToken) => {
  const response = await fetch("https://fileuploader-ccs.onrender.com/auth/refreshToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });
  const data = await response.json();
  createCookie("token", data.accessToken, 30);
};

export default refreshTokenFunc;
