<script setup>
import { ref } from "vue";
import MCheckbox from "./MCheckbox.vue";

const props = defineProps({
    standard: Object,
    index: Number,
    checked: Boolean,
    selected: Number,
});

const isChecked = ref(props.checked);
const emit = defineEmits(["select", "onCheckInput"]);
const isShowTooltip = ref(false);

if (props.selected || props.selected === 0) {
    props.standard.default = props.selected;
}
</script>

<template>
    <div class="row account-track__left-row" style="width: 50%; float: left">
        <div class="row-left" :style="{ marginLeft: index % 2 !== 0 ? '32px' : '0' }">
            <label
                :for="`subject_${index}`"
                class="modal__header-left-wrapper account-checkbox"
                tabindex="0"
                @change="
                    isChecked = !isChecked;
                    emit('onCheckInput', { identity: standard.identity, isChecked });
                "
            >
                <input type="checkbox" :id="`subject_${index}`" :checked="isChecked" />
                <div class="check-icon"></div>
            </label>
            <span
                class="track-text"
                @mouseover="isShowTooltip = true"
                @mouseleave="isShowTooltip = false"
            >
                {{ standard.trackText }}
                <div class="track-text__tooltip" v-if="standard.tooltip && isShowTooltip">
                    {{ standard.tooltip }}
                </div>
            </span>
        </div>
        <div
            v-if="standard.isComboBox"
            class="checkbox-wrapper"
            :style="{ width: '50%', marginRight: index % 2 === 0 ? '32px' : '0' }"
        >
            <m-checkbox
                width="100%"
                :default="standard.default"
                :options="standard.options"
                :disabled="!isChecked"
                @select="emit('select', { identity: standard.identity, option: $event })"
            />
        </div>
    </div>
</template>

<style>
.track-text {
    position: relative;
}

.track-text__tooltip {
    position: absolute;
    width: max-content;
    z-index: 999;
    top: 30px;
    background-color: #434242;
    color: #fff;
    padding: 2px 6px;
    border-radius: 2px;
    animation: identifier 0.3s ease-in;
}
</style>
