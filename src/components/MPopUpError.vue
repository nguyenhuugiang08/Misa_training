<script setup>
import { MISA_ENUM } from "../base/enum";
import { onMounted, onUnmounted } from "vue";

// Định nghĩa các props nhận vào
const props = defineProps({
    title: { type: String, required: true },
    textError: { type: String, required: true },
});

// Định nghĩa các hàm được emit ra ngoài
const emit = defineEmits(["closeError"]);

/**
 * Xử lý đóng pop up error
 * Created by: NHGiang - (20/02/23)
 */
const handleClosePopUp = () => {
    try {
        emit("closeError");
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm xử lỹ phím tắt
 * @param {*} e
 * Created by: NHGiang - (24/02/23)
 */
const docKeyDown = (e) => {
    // Đóng popup error với phím tắt ESC
    if (e.keyCode === MISA_ENUM.KEY_CODE.ESCAPE) {
        handleClosePopUp();
    }
};

/**
 * Hàm thêm event keydown
 * Created by: NHGiang - (24/02/23)
 */
onMounted(() => {
    document.addEventListener("keydown", docKeyDown, false);
});

/**
 * Hàm xử lý remove event
 * Created by: NHGiang - (24/02/23)
 */
onUnmounted(() => {
    document.removeEventListener("keydown", docKeyDown);
});
</script>

<template>
    <div class="modal-confirm">
        <div class="modal-confirm__title">{{ title }}</div>
        <div class="modal-confirm__close-btn modal__close-btn">
            <div
                :style="{
                    background:
                        'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -1178px -362px',
                    width: '12px',
                    height: '12px',
                }"
                @click="handleClosePopUp"
            ></div>
        </div>
        <div class="modal-confirm__content">
            <div class="modal-confirm__content-icon">
                <div
                    :style="{
                        background:
                            'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -752px -462px',
                        width: '36px',
                        height: '36px',
                    }"
                ></div>
            </div>
            <div class="modal-confirm__content-text">{{ textError }}</div>
        </div>
        <div class="modal-footer modal-confirm__footer modal-footer--error">
            <button class="btn btn-primary" @click="handleClosePopUp">Đóng</button>
        </div>
    </div>
</template>

<style scoped></style>
