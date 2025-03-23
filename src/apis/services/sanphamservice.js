import api from "../axiosAPI"

const URL_API = "/san-pham"

export const getAllSP = async () => {
  try {
    const response = await api.get(`${URL_API}/fetch`)
    console.log(response)
    return response.data
  } catch (error) {
    console.error("Chill, re-check your code :", error)
    return []
  }
}

export const getAllLoaiSanPham = async () => {
  const response = await api.get(`${URL_API}/loai-san-pham`)
  console.log(response)
  return response.data
}

export const getAllHeDieuHanh = async () => {
  const response = await api.get(`${URL_API}/he-dieu-hanh`)
  console.log(response)
  return response.data
}

export const getAllThuongHieu = async () => {
  const response = await api.get(`${URL_API}/thuong-hieu`)
  console.log(response)
  return response.data
}

export const addSanPham = async sanPhamData => {
  try {
    const response = await api.post(`${URL_API}/add`, sanPhamData)
    console.log("Phản hồi từ server:", response.data)
    return response.data
  } catch (error) {
    console.error("Lỗi khi thêm Sản Phẩm:", error)
    throw error
  }
}

export const updateSanPham = async (id, sanPhamData) => {
  await api.put(`${URL_API}/update/${id}`, sanPhamData)
}

export const deleteSanPham = async id => {
  await api.delete(`${URL_API}/delete/${id}`)
}
