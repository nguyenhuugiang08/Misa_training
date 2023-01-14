<script setup>
import { ref, inject, watch } from "vue";
import { MISA_ENUM } from "../base/enum";

const selected = ref(props.default ? props.default : null);
const open = ref(false);
const isFocus = ref(false);
const { state, setEmployeeSelected } = inject("diy");
const { employeeSelected } = state;
const optionSearch = ref([]);
const indexOptionSelected = ref(0);

const props = defineProps({
    options: Array,
    default: String,
    tabindex: Number,
    textLabel: String,
    required: Boolean,
    isTop: Boolean,
    width: String,
});

optionSearch.value = [...props.options];

const emit = defineEmits(["select"]);
/**
 * Xử lý lấy giá trị khi chọn
 * CreatedBy: NHGiang
 */
const handleShowSelectedValue = (option, index) => {
    try {
        selected.value = option.optionName ? option.optionName : optionSearch.value[0].optionName;
        indexOptionSelected.value = index;
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
        const optionSelected = optionSearch.value.filter(
            (option) => option?.optionId === departmentId
        );
        return optionSelected[0]?.optionName;
    } catch (error) {
        console.log(error);
    }
};
if (employeeSelected.DepartmentId) {
    selected.value = handleDefaultValue(employeeSelected.DepartmentId);
    indexOptionSelected.value = optionSearch.value.findIndex(
        (option) => option?.optionId === employeeSelected.DepartmentId
    );
}
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

/**
 * Xử lý tìm kiếm lựa chọn
 */
const handleSearchOption = (keyword) => {
    try {
        indexOptionSelected.value = 0;
        open.value = true;
        selected.value = keyword;
    } catch (error) {
        console.log(error);
    }
};
watch(
    () => selected.value,
    (newValue) => {
        try {
            optionSearch.value = props.options.filter((option) =>
                option.optionName.toLowerCase().includes(newValue.toLowerCase())
            );
        } catch (error) {
            console.log(error);
        }
    }
);

/**
 * Xử lý chọn option khi sử dụng keyboard
 * CreatedBy: NHGiang
 */
const handleInputKeydown = (event) => {
    try {
        const maxLength = optionSearch.value.length;
        switch (event.keyCode) {
            case MISA_ENUM.KEY_CODE.DOWN_ARROW:
                if (indexOptionSelected.value < maxLength - 1) {
                    indexOptionSelected.value++;
                } else {
                    indexOptionSelected.value = 0;
                }
                break;
            case MISA_ENUM.KEY_CODE.UP_ARROW:
                if (indexOptionSelected.value > 0) {
                    indexOptionSelected.value--;
                } else {
                    indexOptionSelected.value = maxLength - 1;
                }
                break;
            case MISA_ENUM.KEY_CODE.ENTER:
                handleShowSelectedValue(
                    optionSearch.value[indexOptionSelected.value],
                    indexOptionSelected.value
                );
                break;
            default:
                break;
        }
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
            <div
                class="modal-icon textfield__icon drop-department"
                style="display: flex; justify-content: center; align-items: center"
                :style="{
                    top: `${isTop && '4px !important'}`,
                    borderColor: `${isFocus ? '#50B83C' : ''}`,
                }"
                @click="
                    open = !open;
                    optionSearch = [...options];
                "
                @keydown="handleInputKeydown"
                tabindex="0"
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
            </div>
        </label>
        <input
            type="text"
            class="textfield__input modal-textfield__input"
            id="employee-department"
            :value="selected"
            :style="width && { minWidth: width, width: width }"
            @focus="isFocus = true"
            @blur="isFocus = false"
            @input="handleSearchOption($event.target.value)"
            autocomplete="off"
            @keydown="handleInputKeydown"
        />
        <!-- <p class="text-error">Tên không được để trống</p> -->
        <ul
            class="textfield-list modal-list list-departments"
            :style="isTop && { top: 'unset', bottom: '48px' }"
            v-if="open"
        >
            <li
                v-for="(option, index) of optionSearch"
                :key="index"
                @click="handleShowSelectedValue(option, index)"
                class="textfield-item"
                :class="indexOptionSelected === index ? 'textfield-item--active' : ''"
            >
                {{ option.optionName }}
            </li>
        </ul>
        <!-- <p class="textfield-error">{{ textError }}</p> -->
    </div>
</template>

<style scoped></style>
