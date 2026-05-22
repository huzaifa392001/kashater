// import secureLocalStorage from "react-secure-storage"

export function isAuthenticated() {
  // const storedUser = JSON.parse(localStorage.getItem("scannerUserData"))
  // const authToken = storedUser?.authToken

  // return authToken !== null ? true : false
  const storedUser = JSON.parse(localStorage.getItem("adminUserData"))
  const authToken = storedUser?.authToken
  return authToken !== null && authToken !== undefined
}
