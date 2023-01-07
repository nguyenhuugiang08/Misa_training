<script setup>
const props = defineProps({
    fieldText: String,
    required: { type: Boolean, default: false },
    width: String,
    marginRight: String,
    value: String,
    status: Boolean,
    type: { type: String, default: "text" },
    tooltip: String,
    placeHolder: String,
    autofoucus: Boolean,
});

const emit = defineEmits(["inputValue"]);

// Xử lý đẩy value ô input lên component cha
const handleEmitInputValue = (value) => {
    try {
        emit("inputValue", value);
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
            :value="value"
            @input="handleEmitInputValue($event.target.value)"
            :placeHolder="placeHolder"
        />
        <div class="textfield-tooltip" v-if="tooltip">
            <span>{{ tooltip }}</span>
        </div>
    </div>
</template>

<style scoped></style>
