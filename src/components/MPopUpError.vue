<script setup>
const props = defineProps({
    title: { type: String, required: true },
    textError: { type: String, required: true },
});

const emit = defineEmits(["closeError"]);

//Xử lý đóng thông báo lỗi
const handleClosePopUp = () => {
    try {
        emit("closeError");
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="modal-confirm">
        <div class="modal-confirm__title">{{ title }}</div>
        <div class="modal-confirm__close-btn modal__close-btn">
            <div
                :style="{
                    background:
                        'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -147px -147px',
                    width: '18px',
                    height: '18px',
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
        <div class="modal-confirm__line"></div>
        <div class="modal-footer modal-confirm__footer modal-footer--error">
            <button class="btn btn-primary" @click="handleClosePopUp">Đóng</button>
        </div>
    </div>
</template>

<style scoped></style>
