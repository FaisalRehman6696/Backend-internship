import { jwtDecode } from "jwt-decode";
export const handleToken = () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Please Login");
  }
  try {
    const decodeToken = jwtDecode(token);
    return decodeToken;
  } catch (error) {
    sessionStorage.removeItem("token");
    throw new Error("Login with correct Credential");
  }
};
