<script setup>
import { MISA_ENUM } from "../base/enum";
import { ref, inject } from "vue";

const props = defineProps({
    options: { type: Array, default: [] },
    default: String,
    isCurved: Boolean,
    marginTop: String,
});

const emit = defineEmits(["clickBtn"]);
const { state } = inject("diy");

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
        if (!state.editable) {
            isOpen.value = false;
            contentBtn.value = optionName;
            localStorage.setItem("actionSelected", index);
            emit("clickBtn", identityAction);
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm click button
 * Created by: NHGiang - (28/03/23)
 */
const handleClickButton = () => {
    try {
        if (!state.editable) {
            const indexAction =
                localStorage.getItem("actionSelected") || MISA_ENUM.ACTION_SELECTED_DEFAULT;
            emit("clickBtn", props.options?.[indexAction].identityAction);
        }
    } catch (error) {
        console.log(error);
    }
};

const handleClickOutside = () => {
    try {
        isOpen.value = false;
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="cbo-btn-wrapper">
        <button
            :class="{
                'btn btn-primary': true,
                'cbo-btn': true,
                'btn-curved--left': isCurved,
                'cbo-disable': state.editable,
            }"
            :style="{ marginTop: marginTop && marginTop }"
            @click="handleClickButton"
        >
            <span>{{ contentBtn }}</span>
        </button>
        <div
            :class="{
                'cbo-icon': true,
                'btn-curved--right': isCurved,
                'cbo-disable': state.editable,
            }"
            :style="{ marginTop: marginTop && marginTop }"
            @click="isOpen = !state.editable ? !isOpen : false"
            v-click-outside-element="handleClickOutside"
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
