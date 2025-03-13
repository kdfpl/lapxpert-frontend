import axios from "axios";

const API_URL = "http://localhost:8080/api/khach-hang";

const customerService = {
  getAllCustomers() {
    return axios.get(`${API_URL}/list`);
  },

  getCustomerById(id) {
    return axios.get(`${API_URL}/getOne/${id}`);
  },

  addCustomer(customer) {
    return axios.post(`${API_URL}/add`, customer);
  },

  updateCustomer(customerId, customerData) {
    return axios.put(`${API_URL}/edit/${customerId}`, customerData);
  },

  deleteCustomer(id) {
    return axios.delete(`${API_URL}/${id}`);
  },

  checkDuplicate(email, sdt) {
    return axios.get(`${API_URL}/check-duplicate`, {
      params: { email, sdt },
    });
  },
};

export default customerService;
