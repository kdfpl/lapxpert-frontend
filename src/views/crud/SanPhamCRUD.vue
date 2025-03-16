<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
    getAllSP, getAllLoaiSanPham, getAllHeDieuHanh, getAllThuongHieu, addSanPham, updateSanPham
} from "../../service/SanPhamService.js";
import RichTextEditor from "../../components/RichTextEditor.vue";

const route = useRoute();
const router = useRouter();

const loaiSanPhamList = ref([]);
const heDieuHanhList = ref([]);
const thuongHieuList = ref([]);

const fetchDropdownData = async () => {
    loaiSanPhamList.value = await getAllLoaiSanPham();
    heDieuHanhList.value = await getAllHeDieuHanh();
    thuongHieuList.value = await getAllThuongHieu();
};

const sanPhamData = ref({
    loai: 0,
    heDieuHanh: 0,
    thuongHieu: 0,
    maSp: "",
    tenSp: "",
    moTa: "",
    baoHanhThang: 0,
    trangThai: "",
    maChiTietSP: "",
    hinhAnh: "",
});
const isEditing = ref(false);

onMounted(async () => {
    if (route.params.id) { // Chỉ khi có id mới thực hiện sửa
        isEditing.value = true;
        const sanPhamList = await getAllSP();
        const selectedSanPham = sanPhamList.find((sanPham) => sanPham.id == route.params.id);
        if (selectedSanPham) {
            sanPhamData.value = { ...selectedSanPham };
        }
    }
});

const handleSubmit = async () => {
    try {
        if (isEditing.value) {
            await updateSanPham(sanPhamData.value.id, sanPhamData.value);
            alert("Cập nhật Sản Phẩm thành công!");
        } else {
            await addSanPham(sanPhamData.value);
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
                <div class="flex-2 w200">
                    <select class="border p-2 w-full mb-2" v-model="sanPhamData.loai">
                        <option v-for="l in loaiSanPhamList" :key="l.id" :value="l">
                            {{ l.tenLoai }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2" v-model="sanPhamData.heDieuHanh">
                        <option value="" disabled selected>Hệ điều hành</option>
                        <option v-for="hdh in heDieuHanhList" :key="hdh.id" :value="hdh">
                            {{ hdh.tenHeDieuHanh }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2" v-model="sanPhamData.thuongHieu">
                        <option value="" disabled selected>Thương hiệu</option>
                        <option v-for="th in thuongHieuList" :key="th.id" :value="th">
                            {{ th.tenThuongHieu }}
                        </option>
                    </select>
                    <input v-model="sanPhamData.maSp" placeholder="Mã Sản Phẩm" class="border p-2 w-full mb-2"
                        required />
                    <input v-model="sanPhamData.tenSp" placeholder="Tên Sản Phẩm" class="border p-2 w-full mb-2"
                        required />
                    <input v-model="sanPhamData.hinhAnh" placeholder="Hình ảnh" class="border p-2 w-full mb-2"
                        required />
                    <input v-model="sanPhamData.moTa" placeholder="Mô tả" class="border p-2 w-full mb-2" required />
                    <input v-model="sanPhamData.baoHanhThang" placeholder="Bảo hành (tháng)"
                        class="border p-2 w-full mb-2" required />
                    <select v-model="sanPhamData.trangThai" class="border p-2 w-full mb-2" required>
                        <option value="true" selected>Đang bán</option>
                        <option value="false">Ngừng bán</option>
                    </select>
                </div>
            </div>
            <button @click="handleSubmit" class="px-4 py-2 bg-blue-600 text-white rounded-lg w-full">
                {{ isEditing ? "Sửa" : "Thêm" }}
            </button>
        </div>
    </div>
</template>
