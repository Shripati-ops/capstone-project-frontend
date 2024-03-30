import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Create an instance of Axios with default configuration
const axiosPrivateInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // Add any other default configuration options here
});

console.log(import.meta.env.VITE_BASE_URL);

// Add a request interceptor
axiosPrivateInstance.interceptors.request.use(
  function (config) {
    // Check if access token is present and not expired
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      // Set the Authorization header with the access token
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Handle request errors
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosPrivateInstance.interceptors.response.use(
  function (response) {
    // Modify the response data before it is returned
    // For example, you can parse the response or perform logging
    console.log("Response intercepted:", response);
    return response;
  },
  async function (error) {
    // Handle response errors
    console.error("Response error:", error);

    // Check if the error status is 401 (Unauthorized)
    if (error.response && error.response.status === 403) {
      try {
        // Call an API to refresh the access token using the refresh token
        const refreshToken = localStorage.getItem("refresh_token");
        const decodedToken = await jwtDecode(refreshToken);
        const { userData } = decodedToken;
        const { _id } = userData;
        console.log(_id);
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}users/refresh`,
          { refresh_token: refreshToken, user_id: _id }
        );

        console.log(response.data.data.accessToken);
        const newAccessToken = response.data.data.accessToken;

        // Update the access token in local storage
        localStorage.setItem("access_token", newAccessToken);

        // Retry the original request with the new access token
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios.request(error.config);
      } catch (refreshError) {
        const navigate = useNavigate();
        // Handle refresh token error
        navigate("/signin");
        return Promise.reject(refreshError);
      }
    }

    // For other errors, reject the promise
    return Promise.reject(error);
  }
);

export default axiosPrivateInstance;
