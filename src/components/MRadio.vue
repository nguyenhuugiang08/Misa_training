<script setup>
import { ref } from "vue";

// Định nghĩa cá props nhận vào
const props = defineProps({
    value: Number,
    id: String,
    labelText: String,
    defaultValue: Number,
    marginLeft: String,
    marginRight: String,
});

// định nghĩa các hàm emit ra ngoài
const emit = defineEmits(["radio"]);

const refRadio = ref(null);

/**
 * Xử lý emit giá trị được chọn ra ngoài
 * @param {*} value -- giá trị ô radio được chọn
 * Created by: NHGiang - (20/02/23)
 */
const handleEmitRadioValue = (value) => {
    try {
        console.log(value);
        emit("radio", Number(value));
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <label
        :for="id"
        class="modal__gender-item"
        tabindex="0"
        @keydown.enter="handleEmitRadioValue(refRadio.value)"
    >
        <input
            type="radio"
            ref="refRadio"
            :value="value"
            :id="id"
            :checked="value === defaultValue"
            @change="handleEmitRadioValue($event.target.value)"
        />
        <div
            :style="{
                background: 'url(../../src/assets/icon/radio-checked.png) no-repeat center',
                height: '16px',
                width: '16px',
                backgroundSize: 'contain',
            }"
        ></div>
    </label>
    <span :style="{ marginLeft: marginLeft, marginRight: marginRight }">{{ labelText }}</span>
</template>
