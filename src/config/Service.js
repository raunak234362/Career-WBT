import api from "./api";

class Service {
  static async getCurrentUser() {
    const response = await api.get("/api/v1/admin/user", {
      headers: {
        "Content-Type": "Application/json",
      },
    });
    console.log("Response from getCurrentUser:", response);
    return response.data.data;
  }

  //to call all contest
  static async getAllContests() {
    const response = await api.get("/api/v1/admin/contest/all", {
      headers: {
        "Content-Type": "Application/json",
      },
    });
    return response.data.data;
  }
  // to call all contestbyId
  static async getContestById(contestId) {
    const response = await api.get(`/api/v1/admin/contest/${contestId}`, {
      headers: {
        "Content-Type": "Application/json",
      },
    });
    return response?.data?.data
  }

  //to get all questions
  static async getAllQuestions() {
    const response = await api.get("/api/v1/admin/question/all", {
      headers: {
        "Content-Type": "Application/json",
      },
    });
    return response.data.data;
  }
  //to update question
  static async updateQuestion(questionId, questionData) {
    const response = await api.put(`/api/v1/admin/question/update/${index}/${questionId}`,
      questionData,
      {
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    return response.data.data;
  }
  //to register
  static async registerUser(userData) {
    const response = await api.post("/api/v1/user/register", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Response from registerUser:", response);
    return response.data.data;
  }
}
export default Service;
