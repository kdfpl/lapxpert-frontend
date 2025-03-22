import api from "../axiosAPI";

const API_URL = "/khach-hang";

const customerService = {
  async getAllCustomers() {
    try {
      const { data } = await api.get(`${API_URL}/fetch`);
      return data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khách hàng:", error.response?.data || error.message);
      throw error;
    }
  },

  async getCustomerById(id) {
    try {
      return await api.get(`${API_URL}/get-one/${id}`);

    } catch (error) {
      console.error(`Lỗi khi lấy khách hàng ID ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  async getAddressrById(id) {
    try {
      return await api.get(`${API_URL}/dia-chi/get-one/${id}`);

    } catch (error) {
      console.error(`Lỗi khi lấy địa chỉ khách hàng ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  async addCustomer(customer) {
    try {
      return await api.post(`${API_URL}/add`, customer);
    } catch (error) {
      console.error("Lỗi khi thêm khách hàng:", error.response?.data || error.message);
      throw error;
    }
  },

  async updateCustomer(customerId, customerData) {
    try {
      return await api.put(`${API_URL}/edit/${customerId}`, customerData);
    } catch (error) {
      console.error(`Lỗi khi cập nhật khách hàng ID ${customerId}:`, error.response?.data || error.message);
      throw error;
    }
  },

  async deleteCustomer(id) {
    try {
      const { data } = await api.delete(`${API_URL}/${id}`);
      return data;
    } catch (error) {
      console.error(`Lỗi khi xóa khách hàng ID ${id}:`, error.response?.data || error.message);
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

export default customerService;
