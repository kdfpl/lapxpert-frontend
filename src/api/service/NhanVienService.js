import api from "../axiosAPI";

const API_URL ="/nhan-vien"

const staffService = {
  async getAllStaff() {
    try {
      const response = await api.get(`${API_URL}/list`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách nhân viên:", error);
      throw error;
    }
  },

  async getStaffById(id) {
    try {
      const response = await api.get(`${API_URL}/getOne/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy nhân viên ID ${id}:`, error);
      throw error;
    }
  },

  async addStaff(customer) {
    try {
      const response = await api.post(`${API_URL}/add`, customer);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi thêm nhân viên:", error);
      throw error;
    }
  },

  async updateStaff(customerId, customerData) {
    try {
      const response = await api.put(`${API_URL}/edit/${customerId}`, customerData);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật nhân viên ID ${customerId}:`, error);
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

  async checkDuplicate(email, sdt, id = null) {
    try {
      return await api.get(`${API_URL}/check-duplicate/${id}/${email}/${sdt}`);
    } catch (error) {
      console.error("Lỗi khi kiểm tra trùng lặp:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default staffService;
  