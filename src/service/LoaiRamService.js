import axios from "axios";

const URL_API = "http://localhost:8080/san-pham/loai-ram";

export const getAllLoaiRam = async () => {
    try {
      const response = await axios.get(`${URL_API}/list`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Chill, re-check your code :", error);
      return [];
    }
  };