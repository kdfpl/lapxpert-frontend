import axios from 'axios';

const API_URL ="http://localhost:8080/api/nhan-vien"

export default {
    getAllStaff() {
      return axios.get(`${API_URL}/list`);
    },
    getStaffById(id) {
      return axios.get(`${API_URL}/${id}`);
    },
    addCustomer(customer) {
      return axios.post(API_URL, customer);
    },
    updateCustomer( customer) {
      return axios.put(`${API_URL}/edit`, customer);
    },
    deleteCustomer(id) {
      return axios.delete(`${API_URL}/${id}`);
    }
  };
  