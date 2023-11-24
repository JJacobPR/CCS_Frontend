import createCookie from "./createCookie.js";

const refreshToken = async () => {
  const refreshToken = document.cookie.slice(13, 184);
  console.log("Calling");
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

  createCookie("token", data.accessToken, 1);
};

export default refreshToken;
