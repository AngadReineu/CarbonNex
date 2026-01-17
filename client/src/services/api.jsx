import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Centralized API methods
export const api = {
  // Auth
  login: (data) => API.post("/auth/login", data),
  register: (data) => API.post("/auth/register", data),

  // Entities
  getEntities: () => API.get("/entities"),
  createEntity: (data) => API.post("/entities", data),

  // Activities (FIXED ENDPOINT)
  getUserActivities: () => API.get("/activities/my-activities"),
};

export default API;
