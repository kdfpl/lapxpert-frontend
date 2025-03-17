import api from "../index";

export const getAllDotGiamGia = async () => {
  try {
    const response = await api.get("/dot-giam-gia/fetch");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách DotGiamGia:", error);
    return [];
  }
};

export const addDotGiamGia = async (dotGiamGiaData: any): Promise<any> => {
  try {
    const response = await api.post("/dot-giam-gia/add", dotGiamGiaData);
    console.log("Đã thêm đợt giảm giá:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm đợt giảm giá:", error);
    throw error;
  }
};


export const deleteDotGiamGia = async (id: number) => {
  if (!confirm("Bạn có chắc muốn xóa?")) return false;

  try {
    await api.delete(`/dot-giam-gia/delete/${id}`);
    alert("Xóa thành công!");
    return true; // Trả về true nếu xóa thành công
  } catch (error) {
    console.error("Lỗi khi xóa:", error);
    alert("Xóa thất bại!");
    return false; // Trả về false nếu xóa thất bại
  }
};

export const getAllDotGiamGiaChiTiet = async () => {
  try {
    const response = await api.get("/dot-giam-gia-chi-tiet/fetch");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách DotGiamGiaCT:", error);
    return [];
  }
};

export const addDotGiamGiaChiTiet = async (dotGiamGiaChiTietList: any[]) => {
  for (const dotGiamGiaChiTietData of dotGiamGiaChiTietList) {
    try {
      const response = await api.post("/dot-giam-gia-chi-tiet/add", dotGiamGiaChiTietData);
      console.log("Đã thêm:", response.data);
    } catch (error) {
      console.error("Lỗi khi thêm:", error);
    }
  }
};

