import api from "../axiosAPI";

const API_URL = "/san-pham/san-pham-chi-tiet";

const productDetailService = {
  async getAllSpct() {
    return await api.get(`${API_URL}/list`).then(res => res.data).catch(err => { throw err; });
  },
  
  async getAllRam() {
    return await api.get(`${API_URL}/ram`).then(res => res.data).catch(err => { throw err; });
  },
  
  async getAllManHinh() {
    return await api.get(`${API_URL}/man-hinh`).then(res => res.data).catch(err => { throw err; });
  },
  
  async getAllOCung() {
    return await api.get(`${API_URL}/o-cung`).then(res => res.data).catch(err => { throw err; });
  },
  
  async getAllMauSac() {
    return await api.get(`${API_URL}/mau-sac`).then(res => res.data).catch(err => { throw err; });
  },
  
  async getAllPin() {
    return await api.get(`${API_URL}/pin-sac`).then(res => res.data).catch(err => { throw err; });
  },
  
  async getAllCpu() {
    return await api.get(`${API_URL}/cpu`).then(res => res.data).catch(err => { throw err; });
  },
  
  async getAllGpu() {
    return await api.get(`${API_URL}/gpu`).then(res => res.data).catch(err => { throw err; });
  },
  
  async addCpu(cpuData) {
    return await api.post(`${API_URL}/cpu/add`, cpuData).then(res => res.data).catch(err => { throw err; });
  },
  
  async updateCpu(id, cpuData) {
    return await api.put(`${API_URL}/cpu/update/${id}`, cpuData).then(res => res.data).catch(err => { throw err; });
  },
  
  async deleteCpu(id) {
    return await api.delete(`${API_URL}/cpu/delete/${id}`).then(res => res.data).catch(err => { throw err; });
  }
};

export default productDetailService;
