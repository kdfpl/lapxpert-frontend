import api from "../index";

const API_URL = '/hoa-don'; 

export default {
    getAllHoaDons() {
        return api.get(API_URL);
    },

    getHoaDonById(id) {
        return api.get(`${API_URL}/${id}`);
    },

    createHoaDon(hoaDon) {
        return api.post(API_URL, hoaDon);
    },

    updateHoaDon(id, hoaDon) {
        return api.put(`${API_URL}/${id}`, hoaDon);
    },

    softDeleteHoaDon(id) {
        return api.delete(`${API_URL}/soft-delete/${id}`, {
            tinh_trang: false 
        });
    }
};