<script setup>
import { ref, onMounted, watch } from "vue";

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
    bottom: String,
    fullWidth: Boolean,
    placeHolderAlign: String,
    onlyNumber: Boolean,
    disable: Boolean,
    maxLength: { type: Number, default: 255 },
});

// biến giúp tham chiếu đến element Input trong DOM
const refInput = ref(null);

// Định nghĩa các hàm emit ra ngoài
const emit = defineEmits(["inputValue", "changeValue"]);

onMounted(() => {
    try {
        if (props.value) {
            emit("inputValue", props.value);
        }
    } catch (error) {
        console.log(error);
    }
});

watch(
    () => props.value,
    (newValue) => {
        try {
            emit("inputValue", newValue);
        } catch (error) {
            console.log(error);
        }
    }
);

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
const handleFocusInput = () => {
    try {
        if (refInput.value) {
            refInput.value.focus();
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý chỉ cho nhập số
 * CreatedBy: NHGiang
 */
const handleCheckIsNumber = (evt) => {
    try {
        if (props.onlyNumber) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        }
    } catch (error) {
        console.log(error);
    }
};

defineExpose({ handleFocusInput });
</script>

<template>
    <div :class="{ textfield: true, 'textfield--fullwidth': fullWidth }">
        <label for="" class="textfield__label modal-label">
            {{ fieldText }} <span v-if="required" class="required">*</span>
        </label>
        <input
            :type="type"
            class="textfield__input"
            :class="{ 'textfield--error-input': status, 'textfield-readonly': disable }"
            :style="{
                minWidth: width,
                width: width,
                marginRight: marginRight,
                marginBottom: bottom ? `${bottom}` : '0',
                textAlign: placeHolderAlign,
            }"
            :value="value"
            @input="handleEmitInputValue($event.target.value)"
            @keydown="handleCheckIsNumber($event)"
            :placeHolder="placeHolder"
            ref="refInput"
            :disabled="disable"
            :maxlength="maxLength"
        />
        <div class="textfield-tooltip" v-if="tooltip">
            <span>{{ tooltip }}</span>
        </div>
        <div
            v-if="status"
            class="error-input"
            :style="{
                left: width === '100%' ? '50%' : '0',
                transform: width === '100%' ? 'translateX(-50%)' : 'translateX(0)',
            }"
        >
            {{ textError }}
        </div>
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
    background: #f65d5d;
    color: #fff;
    border-radius: 4px;
    z-index: 99;
    text-align: center;
    width: 200px;
    top: 52px;
    display: none;
}

.error-input::before {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    border: 8px solid;
    border-color: transparent transparent #f65d5d transparent;
    top: -13px;
    left: 50%;
    transform: translateX(-50%);
}

.textfield .textfield__input:hover ~ .error-input {
    display: block;
}

.textfield-error__detail {
    position: absolute;
    color: #fff;
}
</style>
