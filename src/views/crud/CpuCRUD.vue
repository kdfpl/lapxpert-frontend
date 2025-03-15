<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAllCpu, addCpu, updateCpu } from "../../service/SPCTService.js";
import RichTextEditor from "../../components/RichTextEditor.vue";

const route = useRoute();
const router = useRouter();
const cpuData = ref({
    maCpu: "",
    hangCpu: "",
    tenCpu: "",
    theHeCpu: "",
    soNhan: 0,
    soLuong: 0,
    xungNhip: 0.0,
});
const isEditing = ref(false);

onMounted(async () => {
    if (route.params.id) { // Chỉ khi có id mới thực hiện sửa
        isEditing.value = true;
        const cpuList = await getAllCpu();
        const selectedCpu = cpuList.find((cpu) => cpu.id == route.params.id);
        if (selectedCpu) {
            cpuData.value = { ...selectedCpu };
        }
    }
});


const handleSubmit = async () => {
    try {
        if (isEditing.value) {
            await updateCpu(cpuData.value.id, cpuData.value);
            alert("Cập nhật CPU thành công!");
        } else {
            await addCpu(cpuData.value);
            alert("Thêm CPU thành công!");
        }
        router.push("/cpu"); // Điều hướng về danh sách CPU
    } catch (error) {
        console.error("Lỗi khi thêm/sửa CPU:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
};

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
            <h1 class="text-3xl font-bold">THÊM/SỬA CPU</h1>
            <button
                class="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl backdrop-blur-md bg-opacity-80 border border-white/30 transition-all duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md">
                <router-link to="/cpu">Danh Sách</router-link>
            </button>
        </div>
    </div>
    <div class="flex">
        <div class="flex-1 mr-5 w-140 bg-gray-50 p-4 rounded-lg bg-white border rounded">
            <h3 class="text-lg font-semibold mb-4">{{ isEditing ? "Sửa CPU" : "Thêm CPU" }}</h3>
            <input v-model="cpuData.maCpu" placeholder="Mã CPU" class="border p-2 w-full mb-2" required />
            <input v-model="cpuData.hangCpu" placeholder="Hãng CPU" class="border p-2 w-full mb-2" required />
            <input v-model="cpuData.tenCpu" placeholder="Tên CPU" class="border p-2 w-full mb-2" required />
            <input v-model="cpuData.theHeCpu" placeholder="Thế hệ CPU" class="border p-2 w-full mb-2" required />
            <input v-model.number="cpuData.soNhan" type="number" placeholder="Số nhân" value=""
                class="border p-2 w-full mb-2" required />
            <input v-model.number="cpuData.soLuong" type="number" placeholder="Số luồng" value=""
                class="border p-2 w-full mb-2" required />
            <input v-model.number="cpuData.xungNhip" type="number" step="0.1" placeholder="Xung nhịp (GHz)" value=""
                class="border p-2 w-full mb-2" required />
            <button @click="handleSubmit" class="px-4 py-2 bg-blue-600 text-white rounded-lg w-full">
                {{ isEditing ? "Sửa" : "Thêm" }}
            </button>
        </div>
    </div>
</template>
