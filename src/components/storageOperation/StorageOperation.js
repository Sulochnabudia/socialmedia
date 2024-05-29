//Auth
export const storageUsers = () => JSON.parse(localStorage.getItem("users")) || []
export const loggedInUser = () => JSON.parse(localStorage.getItem("loggedInUser"))
export const setStorageUsers = (users) => localStorage.setItem("users", JSON.stringify(users))
export const setLoggedInUser = (user) => localStorage.setItem("loggedInUser", JSON.stringify(user))
export const removeLoggedInUser = () => localStorage.removeItem("loggedInUser")