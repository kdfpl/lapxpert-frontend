<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  tabs: Array, // Danh sách tab (label + key)
  activeTab: String, // Đồng bộ với component cha
});

const emit = defineEmits(["update:activeTab"]);

const activeTab = ref(props.activeTab || props.tabs[0]?.key || "");

// Cập nhật activeTab khi component cha thay đổi
watch(() => props.activeTab, (newVal) => {
  activeTab.value = newVal;
});

// Hàm cập nhật tab
const setActiveTab = (key) => {
  activeTab.value = key;
  emit("update:activeTab", key); // Phát sự kiện để đồng bộ với component cha
};

defineExpose({ setActiveTab });
</script>

<template>
  <div class="w-full">
    <div class="relative flex items-center justify-center w-full">
      <div class="absolute left-0 top-1/2 h-1 w-full bg-gray-300 -z-10"></div>
      
      <div
        v-for="(tab, index) in tabs"
        :key="tab.key"
        class="relative flex flex-col items-center w-1/4"
      >
        <div
          class="flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all"
          :class="{
            'text-white bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl backdrop-blur-md bg-opacity-80 border border-white/30 transition-all duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md': activeTab === tab.key,
            'bg-white border-gray-400 text-gray-500': activeTab !== tab.key
          }"
          @click="setActiveTab(tab.key)"
        >
          {{ index + 1 }}
        </div>

        <span
          class="mt-2 text-sm transition-all"
          :class="{ 'font-bold text-gray-900': activeTab === tab.key, 'text-gray-400': activeTab !== tab.key }"
        >
          {{ tab.label }}
        </span>
      </div>
    </div>

    <!-- Content Panel -->
    <div class="p-6 mt-6 rounded-lg shadow-md bg-white">
      <slot :name="activeTab"></slot>
    </div>
  </div>
</template>
