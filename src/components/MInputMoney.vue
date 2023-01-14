<script setup>
import { ref, watch } from "vue";
import { formatMoney } from "../utilities/formatMoney";
const props = defineProps({
    fieldText: String,
    required: { type: Boolean, default: false },
    width: String,
    marginRight: String,
    status: Boolean,
    modelValue: String,
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
        money = new Intl.NumberFormat().format(money);
        return money;
    } catch (error) {
        return "";
    }
};
const val = ref(props.modelValue);
const valueForDisplay = ref(formatInputMoney(val.value));

/**
 * xử lý update lại salary
 * CreatedBy: NHGiang
 */
const handleUpdateSalary = () => {
    try {
    } catch (error) {
        console.log(error);
    }
};
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
            val.value = Number(newValue.replaceAll(".", ""));

            emit("update:modelValue", val.value);
        } catch (error) {
            console.log(error);
        }
    }
);
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
            :placeHolder="placeHolder"
            v-model="valueForDisplay"
        />
        <div class="textfield-tooltip" v-if="tooltip">
            <span>{{ tooltip }}</span>
        </div>
        <!-- <p v-if="status" class="textfield-error">{{ textError }}</p> -->
    </div>
</template>

<style scoped></style>
