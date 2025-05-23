import api from "./api";

class Service {
  static async getCurrentUser(token) {
    const response = await api.get("/api/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}
export default Service;
