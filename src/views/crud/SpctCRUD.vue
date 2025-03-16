<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
    getAllSpct, getAllRam, getAllCpu, getAllGpu, getAllSeri,
    getAllManHinh, getAllOCung, getAllPin, getAllMauSac,
    addSPCT, updateSPCT
} from "../../api/service/SPCTService.js";
import { getAllSP } from "../../api/service/SanPhamService.js";
import RichTextEditor from "../../components/RichTextEditor.vue";

const route = useRoute();
const router = useRouter();

const ramList = ref([]);
const gpuList = ref([]);
const cpuList = ref([]);
const manHinhList = ref([]);
const oCungList = ref([]);
const mauSacList = ref([]);
const pinList = ref([]);
const seriList = ref([]);
const spList = ref([]);

const fetchDropdownData = async () => {
    ramList.value = await getAllRam();
    gpuList.value = await getAllGpu();
    cpuList.value = await getAllCpu();
    manHinhList.value = await getAllManHinh();
    oCungList.value = await getAllOCung();
    mauSacList.value = await getAllMauSac();
    pinList.value = await getAllPin();
    seriList.value = await getAllSeri();
    spList.value = await getAllSP();
};

const spctData = ref({
    sanPham: 0,
    ram: 0,
    manHinh: 0,
    pin: 0,
    mau: 0,
    gpu: 0,
    cpu: 0,
    ocung: 0,
    seri: 0,
    maChiTietSp: "",
    giaBan: 0.0,
});
const isEditing = ref(false);

onMounted(async () => {
    if (route.params.id) { // Chỉ khi có id mới thực hiện sửa
        isEditing.value = true;
        const spctList = await getAllSpct();
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
            alert("Cập nhật Sản Phẩm Chi Tiết thành công!");
        } else {
            await addSPCT(spctData.value);
            alert("Thêm Sản Phẩm Chi Tiết thành công!");
        }
        router.push("/san-pham-chi-tiet"); // Điều hướng về danh sách
    } catch (error) {
        console.error("Lỗi khi thêm/sửa Sản Phẩm Chi Tiết:", error);
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
            <h1 class="text-3xl font-bold">THÊM/SỬA PHIÊN BẢN SẢN PHẨM</h1>
            <button
                class="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl backdrop-blur-md bg-opacity-80 border border-white/30 transition-all duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md">
                <router-link to="/san-pham-chi-tiet">Danh Sách</router-link>
            </button>
        </div>
    </div>
    <div class="flex mt-5">
        <div class="flex-1 mr-5 w-140 bg-gray-50 p-4 rounded-lg bg-white border rounded">
            <h3 class="text-lg font-semibold mb-4">{{ isEditing ? "Sửa Sản Phẩm Chi Tiết" : "Thêm Sản Phẩm Chi Tiết" }}</h3>
            <div class="flex">
                <div class="flex-2 w200">
                    <select class="border p-2 w-full mb-2" v-model="spctData.sanPham">
                        <option value="" disabled selected>Sản Phẩm</option>
                        <option v-for="sp in spList" :key="sp.id" :value="sp">
                            {{ sp.tenSp }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2" v-model="spctData.ram">
                        <option value="" disabled selected>Ram</option>
                        <option v-for="r in ramList" :key="r.id" :value="r">
                            {{ r.idLoaiRam.tenLoaiRam }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2" v-model="spctData.manHinh">
                        <option value="" disabled selected>Màn hình</option>
                        <option v-for="mh in manHinhList" :key="mh.id" :value="mh">
                            {{ mh.maManHinh }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2" v-model="spctData.pin">
                        <option value="" disabled selected>Pin</option>
                        <option v-for="p in pinList" :key="p.id" :value="p">
                            {{ p.maPin }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2" v-model="spctData.mau">
                        <option value="" disabled selected>Màu sắc</option>
                        <option v-for="m in mauSacList" :key="m.id" :value="m">
                            {{ m.tenMau }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2" v-model="spctData.gpu">
                        <option value="" disabled selected>Gpu</option>
                        <option v-for="g in gpuList" :key="g.id" :value="g">
                            {{ g.tenGpu }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2" v-model="spctData.cpu">
                        <option value="" disabled selected>Cpu</option>
                        <option v-for="c in cpuList" :key="c.id" :value="c">
                            {{ c.tenCpu }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2" v-model="spctData.ocung">
                        <option value="" disabled selected>Ổ Cứng</option>
                        <option v-for="oc in oCungList" :key="oc.id" :value="oc">
                            {{ oc.loaiOCung }}
                        </option>
                    </select>
                    <select class="border p-2 w-full mb-2" v-model="spctData.seri">
                        <option value="" disabled selected>Seri</option>
                        <option v-for="s in seriList" :key="s.id" :value="s">
                            {{ s.maSeri }}
                        </option>
                    </select>
                    <input v-model="spctData.maChiTietSp" placeholder="Mã chi tiết Sản Phẩm"
                        class="border p-2 w-full mb-2" required />
                    <input v-model.number="spctData.giaBan" type="number" placeholder="Giá bán" class="border p-2 w-full mb-2"
                        required />
                </div>
            </div>
            <button @click="handleSubmit" class="px-4 py-2 bg-blue-600 text-white rounded-lg w-full">
                {{ isEditing ? "Sửa" : "Thêm" }}
            </button>
        </div>
    </div>
</template>
