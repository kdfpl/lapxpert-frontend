import api from "../axiosAPI";

const URL_API = "/san-pham";

export const getAllSP = async (): Promise<any[]> => {
  try {
    const response = await api.get(`${URL_API}/fetch`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Chill, re-check your code :", error);
    return [];
  }
};

export const getAllLoaiSanPham = async (): Promise<any[]> => {
  const response = await api.get(`${URL_API}/loai-san-pham`);
  console.log(response);
  return response.data;
};

export const getAllHeDieuHanh = async (): Promise<any[]> => {
  const response = await api.get(`${URL_API}/he-dieu-hanh`);
  console.log(response);
  return response.data;
};

export const getAllThuongHieu = async (): Promise<any[]> => {
  const response = await api.get(`${URL_API}/thuong-hieu`);
  console.log(response);
  return response.data;
};

export const addSanPham = async (sanPhamData: any): Promise<any> => {
  try {
    const response = await api.post(`${URL_API}/add`, sanPhamData);
    console.log("Phản hồi từ server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm Sản Phẩm:", error);
    throw error;
  }
};


export const updateSanPham = async (id: string | number, sanPhamData: any): Promise<void> => {
  await api.put(`${URL_API}/update/${id}`, sanPhamData);
};

export const deleteSanPham = async (id: string | number): Promise<void> => {
  await api.delete(`${URL_API}/delete/${id}`);
};

