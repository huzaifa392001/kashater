// import secureLocalStorage from "react-secure-storage"

export function isAuthenticated() {
  // return null !== null ? true : false
  const storedUser = JSON.parse(localStorage.getItem("webAppUserData"));
  const authToken = storedUser?.authToken;
  return authToken !== null && authToken !== undefined;
}
