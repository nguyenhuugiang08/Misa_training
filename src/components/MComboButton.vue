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
const isShowTooltip = ref(false); // Trạng thái ẩn hiện tooltip
const indexTooltip = ref(null); // Index của đối tượng tương ứng với tooltip được show

/**
 * Hàm thực hiện chọn hành động thực hiện (Cất và thêm hoặc Cất và đóng) và lưu lại hành động người dùng chọn
 * @param {} optionName
 * @param {*} index
 * Created by: NHGiang - (25/03/23)
 */
const handleClickAction = (optionName, index, identityAction) => {
    try {
        isOpen.value = false;
        contentBtn.value = optionName;
        localStorage.setItem("actionSelected", index);
        emit("clickBtn", identityAction);
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="cbo-btn-wrapper">
        <button
            :class="{ 'btn btn-primary': true, 'cbo-btn': true, 'btn-curved--left': isCurved }"
            :style="{ marginTop: marginTop && marginTop }"
            @click="emit('clickBtn', localStorage.getItem('actionSelected'))"
        >
            <span>{{ contentBtn }}</span>
        </button>
        <div
            :class="{ 'cbo-icon': true, 'btn-curved--right': isCurved }"
            :style="{ marginTop: marginTop && marginTop }"
            @click="isOpen = !isOpen"
            tabindex="0"
        >
            <div class="cbo-btn-icon"></div>
        </div>
        <ul class="cbo-list" v-if="isOpen">
            <li
                v-for="(option, index) in options"
                :key="index"
                class="cbo-item"
                @click="handleClickAction(option.optionName, index, option.identityAction)"
                @mouseover="
                    isShowTooltip = true;
                    indexTooltip = index;
                "
                @mouseleave="isShowTooltip = false"
            >
                {{ option.optionName }}

                <div class="cbo-item__tooltip" v-if="isShowTooltip && indexTooltip === index">
                    {{ option.tooltip }}
                </div>
            </li>
        </ul>
    </div>
</template>
