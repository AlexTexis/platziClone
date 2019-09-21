export const redirectByUnauthorized = () => {
  document.cookie = 'id=;'
  document.cookie = 'email=;'
  document.cookie = 'avatar=;'
  document.cookie = 'name=;'
  document.cookie = 'token=;'
  window.location.href = '/'
}