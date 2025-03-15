<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
    getAllSpct, getAllRam, getAllCpu, getAllGpu, getAllSeri,
    getAllManHinh, getAllOCung, getAllPin, getAllMauSac,
    addSPCT, updateSPCT
} from "../../service/SPCTService.js";
import {
    getAllSP, getAllLoaiSanPham, getAllHeDieuHanh, getAllThuongHieu
} from "../../service/SanPhamService.js"; import RichTextEditor from "../../components/RichTextEditor.vue";

const route = useRoute();
const router = useRouter();

const loaiSanPhamList = ref([]);
const heDieuHanhList = ref([]);
const thuongHieuList = ref([]);
const ramList = ref([]);
const gpuList = ref([]);
const cpuList = ref([]);
const manHinhList = ref([]);
const oCungList = ref([]);
const mauSacList = ref([]);
const pinList = ref([]);
const seriList = ref([]);

const fetchDropdownData = async () => {
    loaiSanPhamList.value = await getAllLoaiSanPham();
    heDieuHanhList.value = await getAllHeDieuHanh();
    thuongHieuList.value = await getAllThuongHieu();
    ramList.value = await getAllRam();
    gpuList.value = await getAllGpu();
    cpuList.value = await getAllCpu();
    manHinhList.value = await getAllManHinh();
    oCungList.value = await getAllOCung();
    mauSacList.value = await getAllMauSac();
    pinList.value = await getAllPin();
    seriList.value = await getAllSeri();
};

const spctData = ref({
    idSp: 0,
    idRam: 0,
    idManHinh: 0,
    idPin: 0,
    idMau: 0,
    idGpu: 0,
    idCpu: 0,
    idOCung: 0,
    idSeri: 0,
    maChiTietSP: "",
    giaBan: 0.0,
    hoTroToiDa: 0,
});
const isEditing = ref(false);

onMounted(async () => {
    if (route.params.id) { // Chỉ khi có id mới thực hiện sửa
        isEditing.value = true;
        const spctList = await getAllRam();
        const selectedSpct = spctList.find((spct) => spct.id == route.params.id);
        if (selectedSpct) {
            spctData.value = { ...selectedSpct };
        }
    }
});


const handleSubmit = async () => {
    try {
        if (isEditing.value) {
            await updateSPCT(spctData.value.id, spctData.value);
            alert("Cập nhật Sản Phẩm thành công!");
        } else {
            await addSPCT(spctData.value);
            alert("Thêm Sản Phẩm thành công!");
        }
        router.push("/san-pham"); // Điều hướng về danh sách
    } catch (error) {
        console.error("Lỗi khi thêm/sửa Sản Phẩm:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
};
onMounted(fetchDropdownData);
</script>

<template>
    <div class="relative w-full mt-5">
        <!-- Banner -->
        <div class="w-full h-50 overflow-hidden rounded-lg">
            <img class="w-full h-full object-cover" src="../../assets/img/RamBanner.jpg" alt="Banner" />
        </div>

        <!-- Thẻ thông tin đè lên -->
        <div
            class="absolute bottom-[-40px] bg-white/90 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[70%] shadow-lg rounded-xl p-5 flex justify-between space-x-4">
            <h1 class="text-3xl font-bold">THÊM/SỬA SẢN PHẨM</h1>
            <button
                class="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl backdrop-blur-md bg-opacity-80 border border-white/30 transition-all duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md">
                <router-link to="/san-pham">Danh Sách</router-link>
            </button>
        </div>
    </div>
    <div class="flex">
        <div class="flex-1 mr-5 w-140 bg-gray-50 p-4 rounded-lg bg-white border rounded">
            <h3 class="text-lg font-semibold mb-4">{{ isEditing ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm" }}</h3>
            <div class="flex">
                <div class="flex-1 w100 mr-5">
                    <input type="text" placeholder="Tên" class="border p-2 w-full mb-2" />
                    <input type="text" placeholder="Mã Sản Phẩm" class="border p-2 w-full mb-2" />
                    <input type="text" placeholder="Mô tả" class="border p-2 w-full mb-2" />
                    <input type="number" placeholder="Bảo hành tháng" class="border p-2 w-full mb-2" />
                    <input type="file" placeholder="Hình ảnh" class="border p-2 w-full mb-2" />
                    <select class="border p-2 w-full mb-2">
                        <option value="" disabled selected>Loại máy</option>
                        <option v-for="loai in loaiSanPhamList" :key="loai.id" :value="loai.id">
                            {{ loai.tenLoai }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2">
                        <option value="" disabled selected>Trạng thái</option>
                        <option>Đang Bán</option>
                        <option>Ngừng Bán</option>
                    </select>
                    <select class="border p-2 w-full mb-2">
                        <option value="" disabled selected>Hãng</option>
                        <option v-for="th in thuongHieuList" :key="th.id" :value="th.id">
                            {{ th.tenThuongHieu }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2">
                        <option value="" disabled selected>Hệ điều hành</option>
                        <option v-for="hdh in heDieuHanhList" :key="hdh.id" :value="hdh.id">
                            {{ hdh.tenHeDieuHanh }}
                        </option>
                    </select>
                </div>
                <div class="flex-2 w200">
                    <select class="border p-2 w-full mb-2" v-model="spctData.idRam">
                        <option value="" disabled selected>Ram</option>
                        <option v-for="ram in ramList" :key="ram.id" :value="ram.id">
                            {{ ram.idLoaiRam.tenLoaiRam }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2" v-model="spctData.idManHinh">
                        <option value="" disabled selected>Màn hình</option>
                        <option v-for="manHinh in manHinhList" :key="manHinh.id" :value="manHinh">
                            {{ manHinh.maManHinh }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2" v-model="spctData.idPin">
                        <option value="" disabled selected>Pin</option>
                        <option v-for="pin in pinList" :key="pin.id" :value="pin">
                            {{ pin.maPin }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2" v-model="spctData.idMau">
                        <option value="" disabled selected>Màu sắc</option>
                        <option v-for="mau in mauSacList" :key="mau.id" :value="mau">
                            {{ mau.tenMau }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2" v-model="spctData.idGpu">
                        <option value="" disabled selected>Gpu</option>
                        <option v-for="gpu in gpuList" :key="gpu.id" :value="gpu">
                            {{ gpu.tenGpu }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2" v-model="spctData.idCpu">
                        <option value="" disabled selected>Cpu</option>
                        <option v-for="cpu in cpuList" :key="cpu.id" :value="cpu">
                            {{ cpu.tenCpu }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2" v-model="spctData.idOCung">
                        <option value="" disabled selected>Ổ Cứng</option>
                        <option v-for="oCung in oCungList" :key="oCung.id" :value="oCung">
                            {{ oCung.loaiOCung }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2" v-model="spctData.idSeri">
                        <option value="" disabled selected>Seri</option>
                        <option v-for="seri in seriList" :key="seri.id" :value="seri">
                            {{ seri.maSeri }}
                        </option>
                    </select>
                    <input v-model="spctData.maChiTietSP" placeholder="Mã chi tiết Sản Phẩm"
                        class="border p-2 w-full mb-2" required />
                    <input v-model.number="spctData.giaBan" placeholder="Giá bán" class="border p-2 w-full mb-2"
                        required />
                </div>
            </div>
            <button @click="handleSubmit" class="px-4 py-2 bg-blue-600 text-white rounded-lg w-full">
                {{ isEditing ? "Sửa" : "Thêm" }}
            </button>
        </div>
    </div>
</template>
