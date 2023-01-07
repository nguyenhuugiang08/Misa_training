<script setup>
const props = defineProps({
    title: { type: String, required: true },
    textInfo: { type: String, required: true },
});

const emit = defineEmits(["closeInfo"]);

//Xử lý đóng thông báo
const handleClosePopUp = () => {
    try {
        emit("closeInfo");
    } catch (error) {
        console.log(error);
    }
};

// Xử lý đóng form
const handleCloseForm = () => {
    try {
        emit("closeForm");
    } catch (error) {
        console.log(error);
    }
};

// Xử lý submit form
const handleSubmitForm = () => {
    try {
        emit("submitForm");
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
                            'url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -832px -462px',
                        width: '36px',
                        height: '36px',
                    }"
                ></div>
            </div>
            <div class="modal-confirm__content-text">{{ textInfo }}</div>
        </div>
        <div class="modal-footer modal-confirm__footer">
            <label
                for="show-modal"
                class="btn btn-secondary modal-btn-cancel"
                @click="handleClosePopUp"
                >Hủy</label
            >
            <div class="modal-footer__wrapper">
                <button
                    type="submit"
                    class="btn btn-secondary modal-btn__secondary"
                    tabindex="0"
                    @click="handleCloseForm"
                >
                    Không
                </button>
                <button
                    type="submit"
                    class="btn btn-primary"
                    tabindex="0"
                    @click="handleSubmitForm"
                >
                    Có
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
