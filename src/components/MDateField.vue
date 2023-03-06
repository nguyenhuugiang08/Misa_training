<script setup>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { computed, ref, watch } from "vue";
import { formatDate } from "../utilities/formatDate";
import { MISA_RESOURCE } from "../base/resource";
import { convertDatetime } from "../utilities/convertDatetime";
import { handleCheckFormat } from "../utilities/validateForm";

// Định nghĩa các props nhận vào
const props = defineProps({
    fieldText: String,
    required: { type: Boolean, default: false },
    width: String,
    marginRight: String,
    value: String,
    status: Boolean,
    statusPublic: Boolean,
    textError: String,
    type: { type: String, default: "text" },
    bottom: String,
});

const date = ref(convertDatetime(props.value)); // Giá trị ngày tháng được hiển thị
const isFocus = ref(false); // Trạng focus của ô input
const datepicker = ref(null); // Tham chiếu đến component DatePicker
const isOpenDatepicker = ref(false); // Trạng thái Đóng /Mở của date picker
const isShowError = ref(false); // Trạng thái ẩn/hiện message lỗi

// Định nghĩa các hàm emit lên component cha
const emit = defineEmits(["dateField", "changeValue"]);

/**
 * Khi thay đổi giá trị ô input
 * - Kiểm tra nếu ngày tháng nhập vào hợp lệ -> gán lại giá trị biến date -> hiển thị lên giao diện
 * - Kiểm tra nếu ngày tháng nhập vào không hợp lệ -> gán lại giá trị biến date là ngày hiện tại -> hiển thị lên giao diện
 * @param {*} value -- Giá trị ô input
 * Created by: NHGiang - (20/02/23)
 */
const handleEmitInputValue = (value) => {
    try {
        if (value.length === 10) {
            if (handleCheckFormat(MISA_RESOURCE.REGEX.DATE, value)) {
                date.value = convertDatetime(value);
            } else {
                date.value = convertDatetime(formatDate(new Date()));
            }
            emit("dateField", value);
        }

        if (value.length === 0) {
            datepicker.value.clearValue();
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý logic liên quan datepicker
 * CreatedBy: NHGiang - (20/02/23)
 */
const handleDatepicker = () => {
    try {
        if (datepicker) {
            isOpenDatepicker.value = !isOpenDatepicker.value;
            if (!isOpenDatepicker.value) {
                datepicker.value.openMenu();
            } else {
                datepicker.value.closeMenu();
            }
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Theo dõi giá trị biến date -> emit giá trị ra ngoài
 * Created by: NHGiang
 */
watch(
    () => date.value,
    (newValue) => {
        try {
            emit("dateField", formatDate(newValue));
        } catch (error) {
            console.log(error);
        }
    }
);

/**
 * Hàm thực hiện reset lại value datepicker
 * Created by: NHGiang - (23/02/23)
 */
const handleClearValue = () => {
    try {
        datepicker.value.clearValue();
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="textfield modal-textfield" :style="{ minWidth: '166px', width: '166px' }">
        <Datepicker
            v-model="date"
            ref="datepicker"
            auto-apply
            format="dd/MM/yyyy"
            text-input
            show-now-button=""
            locale="vi"
            :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']"
        >
            <template #dp-input="{ value }">
                <label for="" class="textfield__label modal-label">
                    {{ fieldText }}
                    <label
                        v-if="!value"
                        class="modal-icon textfield__icon datepicker__wrapper"
                        @click.self="handleDatepicker"
                        :style="{
                            borderColor: `${
                                status
                                    ? 'var(--error-color)'
                                    : isFocus
                                    ? 'var(--primary-color)'
                                    : ''
                            }`,
                        }"
                    >
                        <div class="datepicker__wrapper-icon"></div>
                    </label>
                    <label
                        v-if="value"
                        class="modal-icon textfield__icon datepicker__wrapper"
                        @click="handleClearValue"
                        :style="{
                            borderColor: `${
                                status
                                    ? 'var(--error-color)'
                                    : isFocus
                                    ? 'var(--primary-color)'
                                    : ''
                            }`,
                        }"
                    >
                        <div class="datepicker__wrapper-icon-close"></div>
                    </label>
                </label>
                <input
                    :type="type"
                    class="textfield__input"
                    :class="status ? 'textfield--error-input' : ''"
                    :style="{
                        minWidth: width,
                        width: width,
                        marginRight: marginRight,
                        marginBottom: bottom ? `${bottom}` : '0',
                    }"
                    placeholder="DD/MM/YYYY"
                    :value="value"
                    @input="handleEmitInputValue($event.target.value)"
                    @focus="
                        isFocus = status ? false : true;
                        emit('changeValue', true);
                    "
                    @blur="isFocus = false"
                    @mouseover="isShowError = true"
                    @mouseleave="isShowError = false"
                    @keydown.tab="datepicker.closeMenu()"
                />
            </template>
            <template #month="{ text }">
                {{ MISA_RESOURCE.MONTH_DATEPICKER[text] }}
            </template>
            <template #now-button="{ selectCurrentDate }">
                <span @click="selectCurrentDate()" title="Select current date"> Hôm nay </span>
            </template>
        </Datepicker>
        <div v-if="status" class="error-input" :style="{ display: isShowError ? 'block' : 'none' }">
            {{ textError }}
        </div>
    </div>
</template>

<style>
.datepicker__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.datepicker__wrapper-icon {
    background: url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -128px -312px;
    width: 16px;
    height: 16px;
}

.datepicker__wrapper-icon-close {
    background: url("../../src/assets/img/Sprites.ee5d4fa7.svg") no-repeat -84px -316px;
    width: 8px;
    height: 8px;
}

.dp__button {
    display: none;
}

.dp__action_row {
    display: none;
}

.dp__cell_inner {
    border-radius: 50%;
    background-color: #fff;
    border: none;
}

.dp__today {
    color: #50b83c;
}

.dp__active_date {
    background-color: #dcf1d8;
    color: #50b83c;
}

.dp__cell_inner:hover {
    border: 1px solid #50b83c;
    background-color: #fff;
}

.dp__active_date:hover {
    background-color: #dcf1d8 !important;
}

.dp__calendar_header_separator {
    display: none;
}

.dp__now_wrap {
    color: var(--primary-color);
    height: 47px;
    border-top: 1px solid var(--dp-border-color);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>
