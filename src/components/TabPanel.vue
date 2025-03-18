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
    <!-- Tabs -->
    <div class="relative flex items-center justify-center w-full">
      <div class="absolute left-0 top-1/2 h-1 w-full bg-base-300 -z-10"></div>

      <div
        v-for="(tab, index) in tabs"
        :key="tab.key"
        class="relative flex flex-col items-center w-1/4"
      >
        <div
          class="flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all"
          :class="{
            'text-base-content bg-base-200 shadow-lg border-base-300 hover:bg-base-300 active:scale-95': activeTab === tab.key,
            'bg-base-100 border-base-300 text-base-content opacity-60': activeTab !== tab.key
          }"
          @click="setActiveTab(tab.key)"
        >
          {{ index + 1 }}
        </div>

        <span
          class="mt-2 text-sm transition-all"
          :class="{ 'font-semibold text-base-content': activeTab === tab.key, 'text-base-content opacity-60': activeTab !== tab.key }"
        >
          {{ tab.label }}
        </span>
      </div>
    </div>

    <!-- Content Panel -->
    <div class="p-6 mt-6 rounded-lg shadow-md bg-base-100 border border-base-300">
      <slot :name="activeTab"></slot>
    </div>
  </div>
</template>