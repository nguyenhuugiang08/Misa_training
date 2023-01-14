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
    textError: String,
});

const emit = defineEmits(["inputValue", "changeValue"]);

// Xử lý đẩy value ô input lên component cha
const handleEmitInputValue = (value) => {
    try {
        emit("inputValue", value);
        emit("changeValue", false);
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
        <!-- <p v-if="status" class="textfield-error">{{ textError }}</p> -->
    </div>
</template>

<style>
.textfield-error {
    font-size: 12px;
    color: #de3618;
    height: 12px;
    line-height: 12px;
    margin-top: 4px;
    display: block;
}
</style>
