import createCookie from "./createCookie.js";

const refreshTokenFunc = async (refreshToken) => {
  const response = await fetch("http://localhost:3000/auth/refreshToken", {
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
