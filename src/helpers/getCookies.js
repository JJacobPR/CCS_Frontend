const getCookies = () => {
    const cookies = document.cookie;
    let a = "b"
    const divider = cookies.indexOf(";")
    if(cookies.length === 363) {
        const refreshToken = cookies.slice(13,184)
        const token = cookies.slice(192)
        return {token, refreshToken}
    }
    else if(cookies.length === 177)
    {
        const token = cookies.slice(6)
        return {token, refreshToken: ""}
    } else {
        const refreshToken = cookies.slice(13)
        return {token:"", refreshToken}
    }
 
}



export default getCookies