<script setup>
import { ref, inject, watch } from "vue";
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
    options: Array,
    default: String,
    tabindex: Number,
    textLabel: String,
    required: Boolean,
    isTop: Boolean,
    width: String,
    status: Boolean,
    statusPublic: Boolean,
    textError: String,
});

// Gán giá trị ban của mảng optionSearch là danh sách tất cả các lựa chọn.
optionSearch.value = [...props.options];

// Emit các sự kiện ra ngoài component cha
const emit = defineEmits(["select"]);

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
        indexOptionSelected.value = 0;
        isOpen.value = true;
        selected.value = keyword;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Theo dõi giá ô input thay đổi khi tìm kiếm hiển thị danh sách các option tướng ứng tìm được
 * Created by: NHGiang - (20/02/23)
 */
watch(
    () => selected.value,
    (newValue) => {
        try {
            optionSearch.value = props.options.filter((option) =>
                option.optionName.toLowerCase().includes(newValue.toLowerCase())
            );

            if (optionSearch.value.length === 1) {
                const newOptionId = props.options.find(
                    (option) => option.optionName === newValue
                )?.optionId;
                emit("select", { optionId: newOptionId, optionName: newValue });
            } else {
                emit("select", {
                    optionId: props.options[indexOptionSelected.value].optionId,
                    optionName: newValue,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
);

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
                    indexOptionSelected.value++;
                } else {
                    indexOptionSelected.value = 0;
                }
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
        @blur="isOpen = false"
        :style="width && { minWidth: width, width: width }"
    >
        <label for="" class="textfield__label modal-label">
            {{ textLabel }} <span v-if="required" class="required">*</span>
            <div
                class="modal-icon textfield__icon drop-department"
                style="display: flex; justify-content: center; align-items: center"
                :style="{
                    top: `${isTop && '4px !important'}`,
                    borderColor: `${
                        status ? 'var(--error-color)' : isFocus ? 'var(--primary-color)' : ''
                    }`,
                }"
                @click="
                    isOpen = !isOpen;
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
            :class="status ? 'textfield--error-input' : ''"
            id="employee-department"
            :value="selected"
            :style="width && { minWidth: width, width: width }"
            @focus="isFocus = status ? false : true"
            @blur="isFocus = false"
            @input="handleSearchOption($event.target.value)"
            autocomplete="off"
            @keydown="handleInputKeydown"
        />
        <p v-if="statusPublic || status" class="textfield-error">{{ textError }}</p>
        <!-- <div v-if="status" class="error-input">{{ textError }}</div> -->
        <ul
            class="textfield-list modal-list list-departments"
            :style="isTop && { top: 'unset', bottom: '48px' }"
            v-if="isOpen"
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
    </div>
</template>

<style scoped></style>
