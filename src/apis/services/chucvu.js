const API_URL = "/chuc-vu";

const roleService = {
  async getAllRoles() {
    try {
      return await api.get(`${API_URL}/list`);
    } catch (error) {
      console.error(
        "Lỗi khi lấy danh sách vai trò:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default roleService;