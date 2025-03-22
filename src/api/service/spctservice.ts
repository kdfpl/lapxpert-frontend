import api from "../axiosAPI";

const URL_API = "/san-pham/san-pham-chi-tiet";

export const getAllSpct = async (): Promise<any> => {
  try {
    const response: any = await api.get(`${URL_API}/fetch`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Chill, re-check your code :", error);
    return [];
  }
};

export const getAllRam = async (): Promise<any> => {
  const response: any = await api.get(`${URL_API}/ram`);
  console.log(response);
  return response.data;
};

export const getAllLoaiRam = async (): Promise<any> => {
  try {
    const response: any = await api.get(`${URL_API}/ram/loai-ram/fetch`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Chill, re-check your code :", error);
    return [];
  }
};

export const getAllManHinh = async (): Promise<any> => {
  const response: any = await api.get(`${URL_API}/man-hinh`);
  console.log(response);
  return response.data;
};

export const getAllOCung = async (): Promise<any> => {
  const response: any = await api.get(`${URL_API}/o-cung`);
  console.log(response);
  return response.data;
};

export const getAllMauSac = async (): Promise<any> => {
  const response: any = await api.get(`${URL_API}/mau-sac`);
  console.log(response);
  return response.data;
};

export const getAllPin = async (): Promise<any> => {
  const response: any = await api.get(`${URL_API}/pin-sac`);
  console.log(response);
  return response.data;
};

export const getAllCpu = async (): Promise<any> => {
  const response: any = await api.get(`${URL_API}/cpu`);
  console.log(response);
  return response.data;
};

export const getAllGpu = async (): Promise<any> => {
  const response: any = await api.get(`${URL_API}/gpu`);
  console.log(response);
  return response.data;
};

export const getAllSeri = async (): Promise<any> => {
  const response: any = await api.get(`${URL_API}/seri`);
  console.log(response);
  return response.data;
};

/*cpu*/
export const getCpuById = async (id: string | number): Promise<any> => {
  try {
    const response: any = await api.get(`${URL_API}/cpu/get-one/${id}`);
    console.log("Phản hồi từ server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin CPU:", error);
    throw error;
  }
};

export const addCpu = async (cpuData: any): Promise<any> => {
  try {
    const response: any = await api.post(`${URL_API}/cpu/add`, cpuData);
    console.log("Phản hồi từ server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm CPU:", error);
    throw error;
  }
};

export const updateCpu = async (id: string | number, cpuData: any): Promise<void> => {
  await api.put(`${URL_API}/cpu/update/${id}`, cpuData);
};

export const deleteCpu = async (id: string | number): Promise<void> => {
  await api.delete(`${URL_API}/cpu/delete/${id}`);
};

/*ram*/
export const addRam = async (ramData: any): Promise<any> => {
  try {
    const response: any = await api.post(`${URL_API}/ram/add`, ramData);
    console.log("Phản hồi từ server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm RAM:", error);
    throw error;
  }
};

export const updateRam = async (id: string | number, ramData: any): Promise<void> => {
  await api.put(`${URL_API}/ram/update/${id}`, ramData);
};

export const deleteRam = async (id: string | number): Promise<void> => {
  await api.delete(`${URL_API}/ram/delete/${id}`);
};

/*gpu*/
export const addGpu = async (gpuData: any): Promise<any> => {
  try {
    const response: any = await api.post(`${URL_API}/gpu/add`, gpuData);
    console.log("Phản hồi từ server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm GPU:", error);
    throw error;
  }
};

export const updateGpu = async (id: string | number, gpuData: any): Promise<void> => {
  await api.put(`${URL_API}/gpu/update/${id}`, gpuData);
};

export const deleteGpu = async (id: string | number): Promise<void> => {
  await api.delete(`${URL_API}/gpu/delete/${id}`);
};

/*manHinh*/
export const addManHinh = async (manHinhData: any): Promise<any> => {
  try {
    const response: any = await api.post(`${URL_API}/man-hinh/add`, manHinhData);
    console.log("Phản hồi từ server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm Screen:", error);
    throw error;
  }
};

export const updateManHinh = async (id: string | number, manHinhData: any): Promise<void> => {
  await api.put(`${URL_API}/man-hinh/update/${id}`, manHinhData);
};

export const deleteManHinh = async (id: string | number): Promise<void> => {
  await api.delete(`${URL_API}/man-hinh/delete/${id}`);
};

/*oCung*/
export const addOCung = async (oCungData: any): Promise<any> => {
  try {
    const response: any = await api.post(`${URL_API}/o-cung/add`, oCungData);
    console.log("Phản hồi từ server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm Drive:", error);
    throw error;
  }
};

export const updateOCung = async (id: string | number, oCungData: any): Promise<void> => {
  await api.put(`${URL_API}/o-cung/update/${id}`, oCungData);
};

export const deleteOCung = async (id: string | number): Promise<void> => {
  await api.delete(`${URL_API}/o-cung/delete/${id}`);
};

/*mauSac*/
export const addMauSac = async (mauSacData: any): Promise<any> => {
  try {
    const response: any = await api.post(`${URL_API}/mau-sac/add`, mauSacData);
    console.log("Phản hồi từ server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm Color:", error);
    throw error;
  }
};

export const updateMauSac = async (id: string | number, mauSacData: any): Promise<void> => {
  await api.put(`${URL_API}/mau-sac/update/${id}`, mauSacData);
};

export const deleteMauSac = async (id: string | number): Promise<void> => {
  await api.delete(`${URL_API}/mau-sac/delete/${id}`);
};

/*pin*/
export const addPin = async (pinData: any): Promise<any> => {
  try {
    const response: any = await api.post(`${URL_API}/pin-sac/add`, pinData);
    console.log("Phản hồi từ server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm Pin:", error);
    throw error;
  }
};

export const updatePin = async (id: string | number, pinData: any): Promise<void> => {
  await api.put(`${URL_API}/pin-sac/update/${id}`, pinData);
};

export const deletePin = async (id: string | number): Promise<void> => {
  await api.delete(`${URL_API}/pin-sac/delete/${id}`);
};

/*spct*/
export const addSPCT = async (spctData: any): Promise<any> => {
  try {
    const response: any = await api.post(`${URL_API}/add`, spctData);
    console.log("Phản hồi từ server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm SPCT:", error);
    throw error;
  }
};

export const updateSPCT = async (id: string | number, spctData: any): Promise<void> => {
  await api.put(`${URL_API}/update/${id}`, spctData);
};

export const deleteSPCT = async (id: string | number): Promise<void> => {
  await api.delete(`${URL_API}/delete/${id}`);
};
