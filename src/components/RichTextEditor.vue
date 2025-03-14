<template>
  <div class="border border-gray-300 rounded-lg w-full max-w-xl bg-white">
    <div class="flex items-center gap-2 p-2 border-b bg-gray-100">
      <button
        v-for="(item, index) in toolbarItems"
        :key="index"
        @click="execCommand(item.command)"
        class="p-2 rounded-md text-gray-600 hover:bg-gray-200"
      >
        <component :is="item.icon" class="w-5 h-5" />
      </button>
    </div>

    <div
      ref="editor"
      contenteditable="true"
      class="p-3 min-h-[150px] focus:outline-none"
      @input="updateContent"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Bold, Italic, Underline, Strikethrough,AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-vue-next";

// Danh sách công cụ định dạng
const toolbarItems = [
  { command: "bold", icon: Bold },
  { command: "italic", icon: Italic },
  { command: "underline", icon: Underline },
  { command: "strikeThrough", icon: Strikethrough },
  { command: "justifyLeft", icon: AlignLeft },
  { command: "justifyCenter", icon: AlignCenter },
  { command: "justifyRight", icon: AlignRight },
  { command: "justifyFull", icon: AlignJustify },
];

// Tham chiếu đến phần editor
const editor = ref(null);

// Hàm thực thi lệnh định dạng
const execCommand = (command) => {
  if (command === "createLink") {
    const url = prompt("Nhập đường dẫn:");
    if (url) document.execCommand(command, false, url);
  } else {
    document.execCommand(command, false, null);
  }
};

// Cập nhật nội dung khi người dùng nhập
const updateContent = () => {
  console.log("Nội dung hiện tại:", editor.value.innerHTML);
};
</script>

<style scoped>
button:focus {
  @apply outline-none;
}
</style>
