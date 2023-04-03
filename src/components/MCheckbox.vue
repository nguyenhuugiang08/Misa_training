<script setup>
import { MISA_RESOURCE } from "../base/resource";
import { ref, watchEffect, defineExpose, watch } from "vue";
import { MISA_ENUM } from "../base/enum";
import MTableCombobox from "./MTableCombobox.vue";

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
    hasDisplayDataDisable: Boolean, // hiển thị dữ liệu khi ở trạng thái disable
    isTable: Boolean,
    columns: { type: Array, default: [] },
    tooltip: String,
    left: { type: String, default: "0px" },
    isShiftTab: { type: Boolean, default: false },
});

const selected = ref(null); // Giá trị của item được lựa chọn.
const isOpen = ref(false); // trạng thái đóng/mở của danh sách chứa các lựa chọn.
const isFocus = ref(false); // trạng thái Focus vào ô input.
const optionSearch = ref(props.options ? props.options : []); // Mảng lưu các lựa chọn phù hợp khi thực hiện tìm kiếm.
const indexOptionSelected = ref(0); // Chỉ số của lựa chọn đã được chọn trong mảng danh sách các lựa chọn.
const topTableCombobox = ref(0); // khoảng cách combobox dạng table đến top của trình duyệt
const count = ref(0);

const refCheckBox = ref(null);
const refList = ref(null);
const isShowError = ref(false);
const refItem = ref(null);

// Gán giá trị ban của mảng optionSearch là danh sách tất cả các lựa chọn.
watch(
    () => props.options.length,
    () => {
        try {
            optionSearch.value = [...props.options];
        } catch (error) {
            console.log(error);
        }
    }
);
const dataShow = props.columns.find((option) => option.dataShow === true)?.identityOption;

// Emit các sự kiện ra ngoài component cha
const emit = defineEmits(["select", "changeValue", "focusBtn", "handleTab"]);

/**
 * Hiển thị tên option được chọn lên giao diện.
 * @param {*} option -- Object lưu { ID của lựa chọn, Tên của lựa chọn }
 * @param {*} index -- Chỉ số của option trong danh sách tất cả các option.
 */
const handleShowSelectedValue = (option, index) => {
    try {
        if (props.isTable) {
            selected.value = option[`${dataShow}`]
                ? option[`${dataShow}`]
                : optionSearch.value[0]?.[`${dataShow}`];
        } else {
            selected.value = option.optionName
                ? option.optionName
                : optionSearch.value[0]?.optionName;
        }
        indexOptionSelected.value = index;
        isOpen.value = false;
        emit("select", {
            optionId: option.optionId,
            optionSelected: selected.value,
            optionName: option.optionName,
            optionGrade: option.optionGrade,
            optionAddress: option.optionAddress,
            optionCode: option.optionCode,
        });
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
        if (props.isTable) {
            return optionSelected[0]?.[`${dataShow}`];
        }
        return optionSelected[0]?.optionName;
    } catch (error) {
        console.log(error);
    }
};

/**
 * - Nếu có ID của giá trị mặc định -> Hiển thị tên của option lên giao diện
 * - Nếu không có -> gán indexOptionSelected = -1
 */
watchEffect(() => {
    try {
        if (props.default || props.default === 0) {
            const defaultValue = handleDefaultValue(props.default);
            if (props.default === MISA_RESOURCE.GUID_EMPTY && count.value < 1) {
                selected.value = null;
                count.value++;
            }

            if (defaultValue && count.value < 1) {
                selected.value = defaultValue;
                count.value++;
            }

            indexOptionSelected.value = optionSearch.value.findIndex(
                (option) => option?.optionId === props.default
            );
        } else {
            indexOptionSelected.value = optionSearch.value.findIndex(
                (option) => option?.optionName === selected.value
            );
        }
    } catch (error) {
        console.log(error);
    }
});

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

        if (props.isTable) {
            // thực hiện tìm kiếm option theo từ khóa nhập
            const optionSearchTable = [];
            let optionIdTable = [];
            let optionShowData = "";

            props.columns.forEach((column) => {
                if (column.dataShow) optionShowData = column.identityOption;
                props.options.forEach((option) => {
                    if (
                        option[`${column.identityOption}`]
                            .toLowerCase()
                            .includes(keyword.toLowerCase()) &&
                        !optionIdTable.includes(option.optionId)
                    ) {
                        optionSearchTable.push(option);
                        optionIdTable = optionSearchTable.map((opt) => opt.optionId);
                    }
                });
            });

            optionSearch.value = optionSearchTable;

            if (optionSearch.value.length > 0) {
                emit("select", { ...optionSearch.value[0], [optionShowData]: keyword });
            }

            if (keyword === "") {
                emit("select", {
                    ...optionSearch.value[0],
                    [optionShowData]: keyword,
                    optionId: MISA_RESOURCE.GUID_EMPTY,
                    optionGrade: 0,
                });
            }
        } else {
            // thực hiện tìm kiếm option theo từ khóa nhập
            optionSearch.value = props.options.filter((option) =>
                option.optionName.toLowerCase().includes(keyword.toLowerCase())
            );
            /**
             * - Nếu giá trị nhập trùng với 1 option -> gửi giá trị nhập -> hợp lệ
             * - Nếu không trùng -> gửi giá trị nhập -> không có trong danh mục
             */
            if (optionSearch.value.length > 0) {
                const newOptionId = props.options.find(
                    (option) => option.optionName === keyword
                )?.optionId;
                emit("select", { optionId: newOptionId, optionName: keyword });
            } else {
                emit("select", { optionId: -1, optionName: keyword });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

watch(
    () => indexOptionSelected.value,
    (newValue) => {
        if (props.isTable && newValue) {
            if (refItem.value) {
                const liH = refItem.value?.[`${newValue}`]?.clientHeight;
                refList.value.scrollTop = liH * indexOptionSelected.value;
            }
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
                emit("handleTab", event);
                break;
            default:
                break;
        }

        // Khi ấn shift tab
        if (props.isShiftTab && event.shiftKey && event.keyCode === MISA_ENUM.KEY_CODE.TAB) {
            event.preventDefault();
            emit("focusBtn");
        }
    } catch (error) {
        console.log(error);
    }
};
/**
 * Hàm xử lý hiển thị vị trí combobox dạng table
 * @param {*} e
 * Created by: NHGiang - (19/03/23)
 */
const handleClickDropButton = (e) => {
    try {
        isOpen.value = !props.disabled ? !isOpen.value : false;
        optionSearch.value = [...props.options];
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý focus ô input
 * created by: NHGiang - (24/03/23)
 */
const handleFocusCombobox = () => {
    try {
        if (refCheckBox.value) {
            refCheckBox.value.focus();
        }
    } catch (error) {
        console.log(error);
    }
};

defineExpose({ refList, refItem, handleFocusCombobox });
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
            :class="{ 'drop-disable': disabled }"
            style="display: flex; justify-content: center; align-items: center"
            :style="{
                top: `${
                    isTop ? '-12px !important' : !textLabel ? '2px !important' : '20px !important'
                }`,
                borderColor: `${
                    status ? 'var(--error-color)' : isFocus ? 'var(--primary-color)' : ''
                }`,
            }"
            @click="handleClickDropButton"
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
                top: isTop ? 'unset' : !textLabel && '30px',
                bottom: isTop && '14px',
                width: width && `${width}`,
            }"
            v-if="!isTable && isOpen"
            ref="refList"
        >
            <li
                ref="refItem"
                v-for="(option, index) of optionSearch"
                :key="index"
                @click="handleShowSelectedValue(option, index)"
                class="textfield-item"
                :class="indexOptionSelected === index ? 'textfield-item--active' : ''"
            >
                {{ option.optionName }}
            </li>
        </ul>
        <MTableCombobox
            v-if="isTable && isOpen"
            :style="{ top: `${topTableCombobox}px`, left: left }"
            class="cbo-table-list"
            :options="optionSearch"
            :columns="columns"
            :index-selected="indexOptionSelected"
            @select="handleShowSelectedValue($event.option, $event.index)"
        />
        <div
            v-if="status"
            class="error-checkbox"
            :class="{ 'error-checkbox__has-label': textLabel }"
            :style="{ display: isShowError ? 'block' : 'none' }"
        >
            {{ textError }}
        </div>
    </label>
    <div class="textfield-tooltip" v-if="tooltip">
        <span>{{ tooltip }}</span>
    </div>
    <input
        ref="refCheckBox"
        type="text"
        :disabled="disabled"
        class="textfield__input modal-textfield__input"
        :class="{ 'checkbox--error-input': status, 'textfield-readonly': disabled }"
        id="employee-department"
        :value="!disabled ? selected : hasDisplayDataDisable ? selected : ''"
        :style="{
            minWidth: width && `${width}`,
            width: width && `${width}`,
            marginBottom: bottom ? `${bottom}` : '0',
            marginRight: marginRight,
        }"
        @focus="
            isFocus = status ? false : true;
            emit('changeValue', true);
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

.drop-disable:hover {
    background-color: #e0e0e0 !important;
    border: 1px solid #babec5 !important;
    border-left: unset !important;
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
    width: max-content;
    top: 32px;
    font-weight: 400;
    display: none;
    white-space: normal;
}

.error-checkbox::before {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    border: 8px solid;
    border-color: transparent transparent #f65d5d transparent;
    top: -11px;
    left: 50%;
    transform: translateX(-50%);
}

.error-checkbox__has-label {
    position: absolute;
    padding: 4px 8px;
    background: #f65d5d;
    color: #fff;
    border-radius: 4px;
    z-index: 99;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    top: 52px;
    font-weight: 400;
    display: none;
    white-space: normal;
}

.error-checkbox__has-label::before {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    border: 8px solid;
    border-color: transparent transparent #f65d5d transparent;
    top: -11px;
    left: 50%;
    transform: translateX(-50%);
}

.cbo-table-list {
    position: absolute;
    top: 48px !important;
    z-index: 99;
}
</style>
