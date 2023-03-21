<script setup>
import { ref, watch } from "vue";
import { formatMoney } from "../utilities/formatMoney";
const props = defineProps({
    fieldText: String,
    required: { type: Boolean, default: false },
    width: String,
    marginRight: String,
    status: Boolean,
    modelValue: [String, Number],
    type: { type: String, default: "text" },
    tooltip: String,
    placeHolder: String,
    autofoucus: Boolean,
    textError: String,
});

const emit = defineEmits(["update:modelValue"]);
/**
 * Xử lý định dạng tiền
 * CreatedBy: NHGiang
 */
const formatInputMoney = (money) => {
    try {
        if (money || money === 0) {
            money = new Intl.NumberFormat().format(money);
            return money;
        }
    } catch (error) {
        return "";
    }
};
const val = ref(props.modelValue);
const valueForDisplay = ref(formatInputMoney(val.value));

watch(
    () => val.value,
    (newValue) => {
        try {
            valueForDisplay.value = formatInputMoney(newValue);
        } catch (error) {
            console.log(error);
        }
    }
);
watch(
    () => valueForDisplay.value,
    (newValue) => {
        try {
            if (newValue) {
                val.value = Number(newValue.replaceAll(".", ""));
            } else {
                val.value = 0;
            }
            emit("update:modelValue", val.value);
        } catch (error) {
            console.log(error);
        }
    }
);

/**
 * Xử lý chỉ cho nhập số
 * CreatedBy: NHGiang
 */
const handleCheckIsNumber = (e) => {
    try {
        if (
            (e.keyCode < 48 || e.keyCode > 57) &&
            (e.keycode < 96 || e.keyCode > 105) &&
            e.keyCode !== 8 &&
            e.keyCode !== 144
        ) {
            e.preventDefault();
        }
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="textfield">
        <label for="" class="textfield__label modal-label">
            {{ fieldText }} <span v-if="required" class="required">*</span>
        </label>
        <input
            :type="type"
            class="textfield__input"
            :class="status ? 'textfield--error-input' : ''"
            :style="{ minWidth: width, width: width, marginRight: marginRight }"
            style="text-align: right"
            v-model="valueForDisplay"
            @keydown="handleCheckIsNumber"
        />
        <div class="textfield-tooltip" v-if="tooltip">
            <span>{{ tooltip }}</span>
        </div>
        <!-- <p v-if="status" class="textfield-error">{{ textError }}</p> -->
    </div>
</template>

<style scoped></style>
