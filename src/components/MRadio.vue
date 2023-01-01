<script setup>
const props = defineProps({
    value: Number,
    id: String,
    labelText: String,
    defaultValue: Number,
    marginLeft: String,
    marginRight: String,
});

const emit = defineEmits(["radio"]);

//Xử lý emit dữ liệu lên component cha
const handleEmitRadioValue = (value) => {
    try {
        emit("radio", Number(value));
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <label :for="id" class="modal__gender-item" tabindex="0">
        <input
            type="radio"
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
    <span :style="{ marginLeft: '10px', marginRight: '20px' }">{{ labelText }}</span>
</template>

<style scoped></style>
