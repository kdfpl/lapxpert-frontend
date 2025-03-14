import axios from "axios";

const URL_API = "http://localhost:8080/san-pham";

export const getAllSP = async () => {
  try {
    const response = await axios.get(`${URL_API}/list`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Chill, re-check your code :", error);
    return [];
  }
};

export const getAllLoaiSanPham = async () => {
  const response = await axios.get(`${URL_API}/loai-san-pham`);
  console.log(response);
  return response.data;
};

export const getAllHeDieuHanh = async () => {
  const response = await axios.get(`${URL_API}/he-dieu-hanh`);
  console.log(response);
  return response.data;
};

export const getAllThuongHieu = async () => {
  const response = await axios.get(`${URL_API}/thuong-hieu`);
  console.log(response);
  return response.data;
};
