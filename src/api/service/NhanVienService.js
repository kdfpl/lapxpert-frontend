import api from "../axiosAPI";

const API_URL = "/nhan-vien";

const staffService = {
  async getAllStaff() {
    try {
      const response = await api.get(`${API_URL}/fetch`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách nhân viên:", error);
      throw error;
    }
  },

  async getStaffById(id) {
    try {
      const response = await api.get(`${API_URL}/get-one/${id}`);
      return response;
    } catch (error) {
      console.error(`Lỗi khi lấy nhân viên ID ${id}:`, error);
      throw error;
    }
  },

  async addStaff(staff) {
    try {
      const response = await api.post(`${API_URL}/add`, staff);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi thêm nhân viên:", error);
      throw error;
    }
  },

  async updateStaff(staffId, staffData) {
    try {
      const response = await api.put(`${API_URL}/edit/${staffId}`, staffData);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật nhân viên ID ${staffId}:`, error);
      throw error;
    }
  },

  async deleteStaff(id) {
    try {
      const response = await api.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi xóa nhân viên ID ${id}:`, error);
      throw error;
    }
  },

  async checkDuplicate(email, sdt, id) {
    try {
      return await api.get(`${API_URL}/check-duplicate/${id}/${email}/${sdt}`);
    } catch (error) {
      console.error("Lỗi khi kiểm tra trùng lặp:", error.response?.data || error.message);
      throw error;
    }
  },

  async getAddressById(id) {
    try {
      return await api.get(`${API_URL}/dia-chi/get-one/${id}`);
    } catch (error) {
      console.error(`Lỗi khi lấy địa chỉ nhân viên ID ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },
}
export default staffService;
