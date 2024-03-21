import axios from "axios";
export const axiosWrapper = async (method, body, endpoint) => {
  const config = {
    baseURL: `${import.meta.env.VITE_BASE_URL}${endpoint}/`,
    method: method,
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(config);
  const result = await axios(config);
  return result;
};
