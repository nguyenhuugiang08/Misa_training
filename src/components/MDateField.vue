<script setup>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

const props = defineProps({
    fieldText: String,
    required: { type: Boolean, default: false },
    width: String,
    marginRight: String,
    value: String,
    type: { type: String, default: "text" },
});

const date = ref(new Date());
const emit = defineEmits(["dateField"]);

/**
 *  Xử lý đẩy value ô input lên component cha
 * CreatedBy: NHGiang
 */
const handleEmitInputValue = (value) => {
    try {
        emit("dateField", value);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý hiển thị datepicker
 * CreatedBy: NHGiang
 */
const handleShowDatepicker = () => {
    try {
        console.log(child.value.a);
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="textfield modal-textfield" :style="{ minWidth: '166px', width: '166px' }">
        <label for="" class="textfield__label modal-label">
            {{ fieldText }}
            <label
                class="modal-icon textfield__icon"
                style="display: flex; justify-content: center; align-items: center"
                @click="handleShowDatepicker"
            >
                <div
                    class="sidebar-item__icon"
                    :style="{
                        background:
                            'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -128px -312px',
                        marginRight: 0,
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
        />
        <!-- <Datepicker v-model="date" locale="vi"></Datepicker> -->
    </div>
</template>

<style scoped></style>
