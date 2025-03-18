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

  async getVoucherById(id) {
    try {
      const response = await api.get(`${API_URL}/get-one/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy phiếu giảm giá ID ${id}:`, error);
      throw error;
    }
  },

  async addVoucher(Voucher) {
    try {
      const response = await api.post(`${API_URL}/add`, Voucher);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi thêm phiếu giảm giá:", error);
      throw error;
    }
  },

  async updateVoucher(VoucherId, VoucherData) {
    try {
      const response = await api.put(`${API_URL}/edit`, VoucherData);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật phiếu giảm giá ID ${VoucherId}:`, error);
      throw error;
    }
  },

  async deleteVoucher(id) {
    try {
      const response = await api.delete(`${API_URL}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi xóa phiếu giảm giá ID ${id}:`, error);
      throw error;
    }
  },

};

export default VoucherService;
  