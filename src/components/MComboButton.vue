<script setup>
import { ref } from "vue";

const props = defineProps({
    options: { type: Array, default: [] },
    default: String,
    isCurved: Boolean,
    marginTop: String,
});

const emit = defineEmits(["clickBtn"]);

const isOpen = ref(false); // Trạng thái Đóng/Mở của ô chọn
const contentBtn = ref(props.default); // Giá trị mặc định của nút
</script>

<template>
    <button
        :class="{ 'btn btn-primary': true, 'cbo-btn': true, 'btn-curved--left': isCurved }"
        :style="{ marginTop: marginTop && marginTop }"
        @click="emit('clickBtn')"
    >
        <span>{{ contentBtn }}</span>
    </button>
    <div
        :class="{ 'cbo-icon': true, 'btn-curved--right': isCurved }"
        :style="{ marginTop: marginTop && marginTop }"
        @click="isOpen = !isOpen"
    >
        <div class="cbo-btn-icon"></div>
    </div>
    <ul class="cbo-list" v-if="isOpen">
        <li
            v-for="(option, index) in options"
            :key="index"
            class="cbo-item"
            @click="
                isOpen = false;
                contentBtn = option.optionName;
            "
        >
            {{ option.optionName }}
        </li>
    </ul>
</template>

<style scoped></style>
