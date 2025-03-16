import axios from "../axiosAPI";

const URL_API = "/san-pham/loai-ram";

export const getAllLoaiRam = async () => {
    try {
      const response = await axios.get(`${URL_API}/fetch`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Chill, re-check your code :", error);
      return [];
    }
  };