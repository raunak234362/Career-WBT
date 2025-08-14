/* eslint-disable no-unused-vars */
import api from "./api";

class AuthService {
  static async login({ role, userId, password }) {
    try {
      const formData = new URLSearchParams();
      formData.append("userId", userId.toUpperCase());
      formData.append("password", password);
      const response = await api.post("/user/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.status === 400) {
        throw new Error("Invalid Credentials");
      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error("Invalid Credentials");
      } else {
        console.log("Error in login", error);
      }
    }
  }
  static async logout(token) {
    try {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      console.log("User logged out");
    } catch (error) {
      console.log("Error in logging out the user", error);
      throw new Error("Error in logging out", error);
    }
  }
}

export default AuthService;
