import axios from "axios";

const URL_API = "http://localhost:8080/san-pham/san-pham-chi-tiet";

export const getAllSpct = async () => {
  try {
    const response = await axios.get(`${URL_API}/list`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Chill, re-check your code :", error);
    return [];
  }
};

export const getAllRam = async () => {
  const response = await axios.get(`${URL_API}/ram`);
  console.log(response);
  return response.data;
};

export const getAllManHinh = async () => {
  const response = await axios.get(`${URL_API}/man-hinh`);
  console.log(response);
  return response.data;
};

export const getAllOCung = async () => {
  const response = await axios.get(`${URL_API}/o-cung`);
  console.log(response);
  return response.data;
};

export const getAllMauSac = async () => {
  const response = await axios.get(`${URL_API}/mau-sac`);
  console.log(response);
  return response.data;
};

export const getAllPin = async () => {
  const response = await axios.get(`${URL_API}/pin-sac`);
  console.log(response);
  return response.data;
};

export const getAllCpu = async () => {
  const response = await axios.get(`${URL_API}/cpu`);
  console.log(response);
  return response.data;
};

export const getAllGpu = async () => {
  const response = await axios.get(`${URL_API}/gpu`);
  console.log(response);
  return response.data;
};

/*cpu*/
export const addCpu = async (cpuData) => {
  await axios.post(`${URL_API}/cpu/add`, cpuData);
};

export const updateCpu = async (id, cpuData) => {
  await axios.put(`${URL_API}/cpu/update/${id}`, cpuData);
};

export const deleteCpu = async (id) => {
  await axios.delete(`${URL_API}/cpu/delete/${id}`);
};