import api from "../index";

export const fetchDotGiamGiaList = async () => {
  try {
    const response = await api.get("/dotgiamgia/fetch");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách DotGiamGia:", error);
    return [];
  }
};

export const submitSaleoff = async (formData: any) => {
  try {
    const response = await api.post("/dotgiamgia/add", formData);
    console.log("Đã thêm đợt giảm giá:", response.data);
    alert("Thêm thành công!");
  } catch (error) {
    console.error("Lỗi khi thêm đợt giảm giá:", error);
    alert("Thêm thất bại!");
  }
};

export const deleteDotGiamGia = async (id: number) => {
  if (!confirm("Bạn có chắc muốn xóa?")) return false;

  try {
    await api.delete(`/dotgiamgia/delete/${id}`);
    alert("Xóa thành công!");
    return true;  // Trả về true nếu xóa thành công
  } catch (error) {
    console.error("Lỗi khi xóa:", error);
    alert("Xóa thất bại!");
    return false; // Trả về false nếu xóa thất bại
  }
};
