<script setup>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { onMounted, ref, watch, inject } from "vue";
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
    value: String || Date,
    status: Boolean,
    statusPublic: Boolean,
    textError: String,
    type: { type: String, default: "text" },
    bottom: String,
    disable: Boolean,
    id: String,
});

const { state } = inject("diy");

const date = ref(props.value); // Giá trị ngày tháng được hiển thị
const isFocus = ref(false); // Trạng focus của ô input
const datepicker = ref(null); // Tham chiếu đến component DatePicker
const isOpenDatepicker = ref(false); // Trạng thái Đóng /Mở của date picker
const isShowError = ref(false); // Trạng thái ẩn/hiện message lỗi

// Định nghĩa các hàm emit lên component cha
const emit = defineEmits(["dateField", "changeValue"]);

watch(
    () => props.value,
    (newValue) => {
        try {
            if (props.value) {
                emit("dateField", newValue);

                date.value = newValue;
            }
        } catch (error) {
            console.log(error);
        }
    }
);

watch(
    () => state.today,
    (newValue) => {
        try {
            emit("dateField", newValue);
        } catch (error) {
            console.log(error);
        }
    }
);

const checkValue = (str, max) => {
    if (str.charAt(0) !== "0" || str == "00") {
        var num = parseInt(str);
        if (isNaN(num) || num <= 0 || num > max) num = 1;
        str =
            num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
                ? "0" + num
                : num.toString();
    }
    return str;
};

onMounted(() => {
    const dateInput = document.getElementById(props.id);

    /**
     * Khi thay đổi giá trị ô input
     * - Kiểm tra nếu ngày tháng nhập vào hợp lệ -> gán lại giá trị biến date -> hiển thị lên giao diện
     * - Kiểm tra nếu ngày tháng nhập vào không hợp lệ -> gán lại giá trị biến date là ngày hiện tại -> hiển thị lên giao diện
     * @param {*} value -- Giá trị ô input
     * Created by: NHGiang - (20/02/23)
     */
    if (dateInput) {
        dateInput.addEventListener("input", function (e) {
            if (e.inputType !== "deleteContentBackward") {
                var input = this.value;
                if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
                var values = input.split("/").map(function (v) {
                    return v.replace(/\D/g, "");
                });
                if (values[0]) values[0] = checkValue(values[0], 31);
                if (values[1]) values[1] = checkValue(values[1], 12);
                var output = values.map(function (v, i) {
                    return v.length == 2 && i < 2 ? v + "/" : v;
                });

                this.value = output.join("").substr(0, 10);

                if (this.value.length === 10) {
                    if (handleCheckFormat(MISA_RESOURCE.REGEX.DATE, this.value)) {
                        date.value = new Date(convertDatetime(this.value, true));
                    } else {
                        date.value = new Date();
                    }
                    emit("dateField", date.value);
                }

                if (this.value.length === 0) {
                    datepicker.value.clearValue();
                }
            } else {
                if (this.value.length === 0) {
                    datepicker.value.clearValue();
                }
            }
        });
    }
});

/**
 * Xử lý logic liên quan datepicker
 * CreatedBy: NHGiang - (20/02/23)
 */
const handleDatepicker = () => {
    try {
        if (datepicker && !props.disable) {
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

// /**
//  * Theo dõi giá trị biến date -> emit giá trị ra ngoài
//  * Created by: NHGiang
//  */
watch(
    () => date.value,
    (newValue) => {
        try {
            console.log(newValue);
            emit("dateField", newValue);
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
        if (!props.disable) {
            datepicker.value.clearValue();
        }
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
            :disabled="disable"
        >
            <template #dp-input="{ value }">
                <label for="" class="textfield__label modal-label">
                    {{ fieldText }}
                    <label
                        class="modal-icon textfield__icon datepicker__wrapper"
                        :class="{ datepicker_disable: disable }"
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
                </label>
                <input
                    :id="id"
                    :type="type"
                    :disabled="disable"
                    class="textfield__input"
                    :class="{ 'textfield--error-input': status, 'textfield-readonly': disable }"
                    :style="{
                        minWidth: width,
                        width: width,
                        marginRight: marginRight,
                        marginBottom: bottom ? `${bottom}` : '0',
                    }"
                    placeholder="DD/MM/YYYY"
                    :value="value"
                    @blur="isFocus = false"
                    @focus="
                        isFocus = status ? false : true;
                        emit('changeValue', true);
                    "
                    @mouseover="isShowError = true"
                    @mouseleave="isShowError = false"
                    @keydown.tab="datepicker.closeMenu()"
                    :autocomplete="true"
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

.datepicker_disable {
    background-color: #eff0f2 !important;
    border: 1px solid #babec5 !important;
    border-left: unset !important;
}

.datepicker_disable:hover {
    background-color: #e0e0e0 !important;
}
</style>
