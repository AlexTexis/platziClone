export const getCookie = (name) => {
  let cookie = null
  let arrayCookies = document.cookie.split(';')
  for(let i = 0; i < arrayCookies.length;i++) {
    let cookiePar = arrayCookies[i].split('=') //[name,value]
    if(name === cookiePar[0].trim()) return cookie = decodeURIComponent( cookiePar[1] )
  }

  return cookie
}