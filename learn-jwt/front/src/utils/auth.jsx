export const getToken = () => sessionStorage.getItem("token");

export const isAuthenticated = () => !!getToken();

export const logout = () => sessionStorage.removeItem("token");
