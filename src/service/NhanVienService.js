import axios from 'axios';

const URL_API ="http://localhost:8080/api/nhan-vien"

export const getAll = async () => {
    try {
        const response = await axios.get(`${URL_API}/list`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('ĐỊt mẹ lỗi :', error);
        return [];
    }
};