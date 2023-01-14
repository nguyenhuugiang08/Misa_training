<script setup>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { computed, ref, watch } from "vue";
import { formatDate } from "../utilities/formatDate";
import { MISA_RESOURCE } from "../base/resource";
import { convertDatetime } from "../utilities/convertDatetime";
import { handleCheckDatetime } from "../utilities/validateForm";

const props = defineProps({
    fieldText: String,
    required: { type: Boolean, default: false },
    width: String,
    marginRight: String,
    value: String,
    type: { type: String, default: "text" },
});

const date = ref(convertDatetime(props.value));
const isFocus = ref(false);
const datepicker = ref(null);
const isOpenDatepicker = ref(false);
const emit = defineEmits(["dateField"]);

/**
 *  Xử lý đẩy value ô input lên component cha
 * CreatedBy: NHGiang
 */
const handleEmitInputValue = (value) => {
    try {
        if (value.length === 10) {
            if (handleCheckDatetime(value)) {
                date.value = convertDatetime(value);
            }
            emit("dateField", value);
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý logic liên quan datepicker
 * CreatedBy: NHGiang
 */
const handleDatepicker = () => {
    try {
        if (datepicker) {
            // if (!isOpenDatepicker.value) {
            //     datepicker.value.openMenu();
            //     isOpenDatepicker.value = true;
            // } else {
            //     datepicker.value.closeMenu();
            //     isOpenDatepicker.value = false;
            // }

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
watch(
    () => date.value,
    (newValue) => {
        try {
            emit("dateField", formatDate(date.value));
        } catch (error) {
            console.log(error);
        }
    }
);
</script>

<template>
    <div class="textfield modal-textfield" :style="{ minWidth: '166px', width: '166px' }">
        <!-- <label for="" class="textfield__label modal-label">
            {{ fieldText }}
            <label
                class="modal-icon textfield__icon"
                style="display: flex; justify-content: center; align-items: center"
                @click="handleDatepicker"
                :style="{ borderColor: `${isFocus ? '#50B83C' : ''}` }"
            >
                <div
                    :style="{
                        background:
                            'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -128px -312px',
                        width: '16px',
                        height: '16px',
                    }"
                ></div>
            </label>
        </label>
        <input
            :type="type"
            class="textfield__input"
            :style="{ minWidth: width, width: width, marginRight: marginRight }"
            placeholder="DD/MM/YYYY"
            :value="value"
            @input="handleEmitInputValue($event.target.value)"
            @focus="isFocus = true"
            @blur="isFocus = false"
        /> -->
        <Datepicker
            v-model="date"
            ref="datepicker"
            auto-apply
            format="dd/MM/yyyy"
            show-now-button=""
            :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']"
        >
            <template #dp-input="{ value }">
                <label for="" class="textfield__label modal-label">
                    {{ fieldText }}
                    <label
                        class="modal-icon textfield__icon"
                        style="display: flex; justify-content: center; align-items: center"
                        @click="handleDatepicker"
                        :style="{ borderColor: `${isFocus ? '#50B83C' : ''}` }"
                    >
                        <div
                            :style="{
                                background:
                                    'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -128px -312px',
                                width: '16px',
                                height: '16px',
                            }"
                        ></div>
                    </label>
                </label>
                <input
                    :type="type"
                    class="textfield__input"
                    :style="{ minWidth: width, width: width, marginRight: marginRight }"
                    placeholder="DD/MM/YYYY"
                    :value="value"
                    @input="handleEmitInputValue($event.target.value)"
                    @focus="isFocus = true"
                    @blur="isFocus = false"
                />
            </template>
            <template #month="{ text }">
                {{ MISA_RESOURCE.MONTH_DATEPICKER[text] }}
            </template>
            <template #now-button="{ selectCurrentDate }">
                <span @click="selectCurrentDate()" title="Select current date"> Hôm nay </span>
            </template>
        </Datepicker>
    </div>
</template>

<style>
/* .dp__input_wrap {
    position: absolute;
    top: 24px;
} */

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
