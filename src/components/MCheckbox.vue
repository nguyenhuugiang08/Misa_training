<script setup>
import { ref, inject, watch, onMounted } from "vue";
import { MISA_ENUM } from "../base/enum";

const selected = ref(props.default ? props.default : null); // Giá trị của item được lựa chọn.
const isOpen = ref(false); // trạng thái đóng/mở của danh sách chứa các lựa chọn.
const isFocus = ref(false); // trạng thái Focus vào ô input.
const { state, setEmployeeSelected } = inject("diy"); // Lấy dữ liệu trong store.
const { employeeSelected } = state; // Lấy ra biến employeeSelected từ object state trong store.
const optionSearch = ref([]); // Mảng lưu các lựa chọn phù hợp khi thực hiện tìm kiếm.
const indexOptionSelected = ref(0); // Chỉ số của lựa chọn đã được chọn trong mảng danh sách các lựa chọn.

// Định nghĩa các props nhận vào.
const props = defineProps({
    options: { type: Array, default: [] },
    default: String,
    textLabel: String,
    required: Boolean,
    isTop: { type: Boolean, default: false },
    width: String,
    status: Boolean,
    statusPublic: Boolean,
    isAbsolute: Boolean,
    bottom: String,
    textError: String,
    marginRight: String,
    disabled: Boolean,
});

const refCheckBox = ref(null);
const refList = ref(null);
const isShowError = ref(false);

// Gán giá trị ban của mảng optionSearch là danh sách tất cả các lựa chọn.
optionSearch.value = [...props.options];

// Emit các sự kiện ra ngoài component cha
const emit = defineEmits(["select", "changeValue"]);

/**
 * Hiển thị tên option được chọn lên giao diện.
 * @param {*} option -- Object lưu { ID của lựa chọn, Tên của lựa chọn }
 * @param {*} index -- Chỉ số của option trong danh sách tất cả các option.
 */
const handleShowSelectedValue = (option, index) => {
    try {
        selected.value = option.optionName ? option.optionName : optionSearch.value[0].optionName;
        indexOptionSelected.value = index;
        isOpen.value = false;
        emit("select", { optionId: option.optionId, optionName: selected.value });
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý hiển thị giá trị mặc định của combobox
 * - Nếu có Id -> hiển thị tên option lên giao diện
 *  - Nếu không có Id -> không hiển thị gì lên giao diện
 * @param {*} optionId -- Id của option
 * Created by: NHGiang
 */
const handleDefaultValue = (optionId) => {
    try {
        const optionSelected = optionSearch.value.filter((option) => option?.optionId === optionId);
        return optionSelected[0]?.optionName;
    } catch (error) {
        console.log(error);
    }
};

/**
 * - Nếu có ID của giá trị mặc định -> Hiển thị tên của option lên giao diện
 * - Nếu không có -> gán indexOptionSelected = -1
 */
if (props.disabled) {
    selected.value = "";
    indexOptionSelected.value = -1;
} else {
    if (props.default) {
        selected.value = handleDefaultValue(props.default);
        indexOptionSelected.value = optionSearch.value.findIndex(
            (option) => option?.optionId === props.default
        );
    } else {
        indexOptionSelected.value = optionSearch.value.findIndex(
            (option) => option?.optionName === selected.value
        );
    }
}

/**
 * Xử lý click outside element
 * CreatedBy: NHGiang - (20/02/23)
 */
const handleClickOutside = () => {
    try {
        isOpen.value = false;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý tìm kiếm option khi thay đổi giá trị ô input
 * @param {*} keyword -- Từ khóa mỗi khi giá trị ô input thay đổi
 * Created by: NHGiang - (20/02/23)
 */
const handleSearchOption = (keyword) => {
    try {
        emit("changeValue", true);
        indexOptionSelected.value = 0;
        isOpen.value = true;
        selected.value = keyword;

        // thực hiện tìm kiếm option theo từ khóa nhập
        optionSearch.value = props.options.filter((option) =>
            option.optionName.toLowerCase().includes(keyword.toLowerCase())
        );

        /**
         * - Nếu giá trị nhập trùng với 1 option -> gửi giá trị nhập -> hợp lệ
         * - Nếu không trùng -> gửi giá trị nhập -> không có trong danh mục
         */
        if (optionSearch.value.length === 1) {
            const newOptionId = props.options.find(
                (option) => option.optionName === keyword
            )?.optionId;
            emit("select", { optionId: newOptionId, optionName: keyword });
        } else {
            emit("select", {
                optionId: props.options[indexOptionSelected.value].optionId,
                optionName: keyword,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý tác vụ liên quan đến keyboard
 * @param {*} event -- object event
 * Created by: NHGiang - (20/02/23)
 */
const handleInputKeydown = (event) => {
    try {
        const maxLength = optionSearch.value.length;
        switch (event.keyCode) {
            case MISA_ENUM.KEY_CODE.DOWN_ARROW: // Khi ấn phím mũi tên xuống
                if (indexOptionSelected.value < maxLength - 1) {
                    if (isOpen.value === true) {
                        indexOptionSelected.value++;
                    }
                } else {
                    indexOptionSelected.value = 0;
                }
                isOpen.value = true;
                break;
            case MISA_ENUM.KEY_CODE.UP_ARROW: // Khi ấn phím mũi tên lên
                if (indexOptionSelected.value > 0) {
                    indexOptionSelected.value--;
                } else {
                    indexOptionSelected.value = maxLength - 1;
                }
                break;
            case MISA_ENUM.KEY_CODE.ENTER: // Khi ấn phím enter
                handleShowSelectedValue(
                    optionSearch.value[indexOptionSelected.value],
                    indexOptionSelected.value
                );
                break;
            case MISA_ENUM.KEY_CODE.TAB: // Khi ấn phím enter
                isOpen.value = false;
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
    <label
        for=""
        class="textfield__label modal-label label-checkbox"
        :style="{
            minWidth: width && `${width}`,
            width: width && `${width}`,
            position: isAbsolute ? `absolute` : 'relative',
            marginRight: marginRight,
        }"
    >
        {{ textLabel }} <span v-if="required" class="required">*</span>
        <div
            class="modal-icon textfield__icon drop-department"
            style="display: flex; justify-content: center; align-items: center"
            :style="{
                top: `${
                    isTop ? '-16px !important' : !textLabel ? '4px !important' : '22px !important'
                }`,
                borderColor: `${
                    status ? 'var(--error-color)' : isFocus ? 'var(--primary-color)' : ''
                }`,
            }"
            @click="
                isOpen = !disabled ? !isOpen : false;
                optionSearch = [...options];
            "
            @keydown="handleInputKeydown"
            v-click-outside-element="handleClickOutside"
        >
            <div
                :style="{
                    background:
                        'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -564px -365px',
                    width: '8px',
                    height: '5px',
                    transform: `${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}`,
                }"
            ></div>
        </div>
        <ul
            class="textfield-list modal-list list-departments"
            :style="{
                top: isTop ? 'unset' : !textLabel && '38px',
                bottom: isTop && '24px',
                width: width && `${width}`,
            }"
            v-if="isOpen"
            ref="refList"
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
        <div
            v-if="status"
            class="error-checkbox"
            :style="{ display: isShowError ? 'block' : 'none' }"
        >
            {{ textError }}
        </div>
    </label>
    <input
        ref="refCheckBox"
        type="text"
        :disabled="disabled"
        class="textfield__input modal-textfield__input"
        :class="(status ? 'checkbox--error-input' : '', disabled ? 'textfield-readonly' : '')"
        id="employee-department"
        :value="selected"
        :style="{
            minWidth: width && `${width}`,
            width: width && `${width}`,
            marginBottom: bottom ? `${bottom}` : '0',
            marginRight: marginRight,
        }"
        @focus="
            isFocus = status ? false : true;
            emit('changeValue', true);
            isOpen = true;
        "
        @blur="isFocus = false"
        @input="handleSearchOption($event.target.value)"
        autocomplete="off"
        @keydown="handleInputKeydown"
        @mouseover="isShowError = true"
        @mouseleave="isShowError = false"
    />
</template>
<style scoped>
.label-checkbox {
    width: 414px;
    position: relative;
}

.drop-department {
    position: absolute;
    z-index: 92;
    cursor: pointer;
}

.drop-department:hover {
    background-color: #ebebeb;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    border: 1px solid var(--border-color);
    border-left: none;
}

.checkbox--error-input {
    border: 1px solid var(--error-color);
}

.error-checkbox {
    position: absolute;
    padding: 4px 8px;
    background: #f65d5d;
    color: #fff;
    border-radius: 4px;
    z-index: 99;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    top: 64px;
    font-weight: 400;
    display: none;
}

.error-checkbox::before {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    border: 8px solid;
    border-color: transparent transparent #f65d5d transparent;
    top: -13px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
