<script setup>
const props = defineProps({
    title: { type: String, required: true },
    textInfo: { type: String, required: true },
});

const emit = defineEmits(["closeWarning"]);

/**
 * Xử lý đóng pop up warning
 * Created by: NHGiang - (20/02/23)
 */
const handleClosePopUp = () => {
    try {
        emit("closeWarning");
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý đóng form hiện tại
 * Created by: NHGiang - (20/02/23)
 */
const handleCloseForm = () => {
    try {
        emit("closeForm");
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý submit form hiện tại
 * Created by: NHGiang - (20/02/23)
 */
const handleSubmitForm = () => {
    try {
        emit("submitForm", {
            toastMessage: " Nhân viên đã được xóa.",
            statusMessage: "Thành công!",
            status: 0,
        });
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
                            'url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -598px -463px',
                        width: '36px',
                        height: '37px',
                    }"
                ></div>
            </div>
            <div class="modal-confirm__content-text">{{ textInfo }}</div>
        </div>
        <div class="modal-footer modal-confirm__footer" style="justify-content: flex-end">
            <button
                type="submit"
                class="btn btn-secondary modal-btn__secondary btn-wraning"
                tabindex="0"
                @click="handleCloseForm"
            >
                Không
            </button>
            <button type="submit" class="btn btn-danger" tabindex="0" @click="handleSubmitForm">
                Có
            </button>
        </div>
    </div>
</template>

<style scoped>
.btn-wraning {
    margin-left: 0;
}
</style>
