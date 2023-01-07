<script setup>
import { ref, inject } from "vue";

const selected = ref(props.default ? props.default : null);
const open = ref(false);
const isFocus = ref(false);
const { state } = inject("diy");
const { employeeSelected } = state;

const props = defineProps({
    options: Array,
    default: String,
    tabindex: Number,
    textLabel: String,
    required: Boolean,
    isTop: Boolean,
    width: String,
});

const emit = defineEmits(["select"]);

/**
 * Xử lý lấy giá trị khi chọn
 * CreatedBy: NHGiang
 */
const handleShowSelectedValue = (option) => {
    try {
        selected.value = option.optionName ? option.optionName : props.options[0].optionName;
        open.value = false;
        emit("select", option.optionId);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý default value
 * Createdby: NHGiang
 */
const handleDefaultValue = (departmentId) => {
    try {
        const optionSelected = props.options.filter((option) => option?.optionId === departmentId);
        return optionSelected[0]?.optionName;
    } catch (error) {
        console.log(error);
    }
};
/**
 * Xử lý clich outside
 * CreatedBy: NHGiang
 */
const handleClickOutside = () => {
    try {
        open.value = false;
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div
        class="textfield modal-textfield"
        style="padding-bottom: 12px"
        :tabindex="tabindex"
        @blur="open = false"
        :style="width && { minWidth: width, width: width }"
    >
        <label for="" class="textfield__label modal-label">
            {{ textLabel }} <span v-if="required" class="required">*</span>
            <label
                class="modal-icon textfield__icon drop-department"
                style="display: flex; justify-content: center; align-items: center"
                :style="{
                    top: `${isTop && '4px !important'}`,
                    borderColor: `${isFocus ? '#50B83C' : ''}`,
                }"
                @click="open = !open"
                v-click-outside-element="handleClickOutside"
            >
                <div
                    :style="{
                        background:
                            'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -564px -365px',
                        width: '8px',
                        height: '5px',
                    }"
                ></div>
            </label>
        </label>
        <input
            type="text"
            class="textfield__input modal-textfield__input"
            id="employee-department"
            :value="
                employeeSelected.DepartmentId
                    ? handleDefaultValue(employeeSelected.DepartmentId)
                    : selected
            "
            :style="width && { minWidth: width, width: width }"
            @focus="isFocus = true"
            @blur="isFocus = false"
        />
        <!-- <p class="text-error">Tên không được để trống</p> -->
        <ul
            class="textfield-list modal-list list-departments"
            :style="isTop && { top: 'unset', bottom: '48px' }"
            v-if="open"
        >
            <li
                v-for="(option, index) of options"
                :key="index"
                @click="handleShowSelectedValue(option)"
                class="textfield-item"
                :class="selected === option.optionName ? 'textfield-item--active' : ''"
            >
                {{ option.optionName }}
            </li>
        </ul>
    </div>
</template>

<style scoped></style>
