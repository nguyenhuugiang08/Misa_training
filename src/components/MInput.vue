<script setup>
import { ref } from "vue";

// Định nghĩa các props nhận vào
const props = defineProps({
    fieldText: String,
    required: { type: Boolean, default: false },
    width: String,
    marginRight: String,
    value: String,
    status: Boolean,
    statusPublic: Boolean,
    type: { type: String, default: "text" },
    tooltip: String,
    placeHolder: String,
    autofoucus: Boolean,
    textError: String,
});

// biến giúp tham chiếu đến element Input trong DOM
const refInput = ref(null);

// Định nghĩa các hàm emit ra ngoài
const emit = defineEmits(["inputValue", "changeValue"]);

/**
 * Xử lý gửi giá trị thay đổi của ô input ra ngoài
 * @param {*} value -- giá trị của ô input
 * Created by: NHGiang
 */
const handleEmitInputValue = (value) => {
    try {
        emit("inputValue", value);
        emit("changeValue", false);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý focus ô input
 * created by: NHGiang
 */
const handleFocus = () => {
    try {
        if (refInput.value) {
            refInput.value.focus();
        }
    } catch (error) {
        console.log(error);
    }
};

defineExpose({ handleFocus });
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
            ref="refInput"
        />
        <div class="textfield-tooltip" v-if="tooltip">
            <span>{{ tooltip }}</span>
        </div>
        <p
            v-if="statusPublic || status"
            class="textfield-error"
            :style="{ minWidth: width, width: width }"
        >
            {{ textError }}
        </p>
        <!-- <div v-if="status" class="error-input">{{ textError }}</div> -->
    </div>
</template>

<style>
.textfield-error {
    font-size: 12px;
    color: #de3618;
    height: 14px;
    line-height: 12px;
    margin-top: 4px;
    display: block;
    position: relative;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.error-input {
    position: absolute;
    padding: 4px 8px;
    background: #111;
    color: #fff;
    border-radius: 2px;
    z-index: 99;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    top: 64px;
    display: none;
}

.error-input::before {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    border: 8px solid;
    border-color: transparent transparent #111 transparent;
    top: -13px;
    left: 50%;
    transform: translateX(-50%);
}

.textfield .textfield__input:hover ~ .error-input {
    display: block;
}
</style>
