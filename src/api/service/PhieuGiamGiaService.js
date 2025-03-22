import api from "../axiosAPI";

const API_URL ="/phieu-giam-gia"

const VoucherService = {
  async getAllVoucher() {
    try {
      const response = await api.get(`${API_URL}/fetch`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phiếu giảm giá:", error);
      throw error;
    }
  },
    async deleteVoucher(id) {
      try {
        const response = await api.delete(`${API_URL}/delete/${id}`);
        return response.data;
      } catch (error) {
        console.error("Lỗi khi xóa phiếu giảm giá:", error);
        throw error;
      }
    }
  };

export default VoucherService;
  