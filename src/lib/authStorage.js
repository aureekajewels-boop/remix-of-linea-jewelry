export const setTempAuth = (token, phone) => {
  sessionStorage.setItem("temporary_token", token);
  sessionStorage.setItem("phone", phone);
};

export const getTempAuth = () => ({
  token: sessionStorage.getItem("temporary_token"),
  phone: sessionStorage.getItem("phone"),
});

export const clearTempAuth = () => {
  sessionStorage.removeItem("temporary_token");
  sessionStorage.removeItem("phone");
};

export const setAuthToken = (token) => {
  localStorage.setItem("auth_token", token);
};

export const getAuthToken = () => {
  return localStorage.getItem("auth_token");
};

export const logout = () => {
  localStorage.removeItem("auth_token");
  clearTempAuth();
};
