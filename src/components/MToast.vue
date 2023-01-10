<script setup>
import { ref } from "vue";
import { MISA_ENUM } from "../base/enum";

const props = defineProps({
    toastMessage: String,
    statusMessage: String,
    status: Number,
});

/**
 * Xử lý đóng toast message
 * CreatedBy: NHGiang
 */
const handleCloseToast = () => {
    try {
        isShow.value = true;
    } catch (error) {
        console.log(error);
    }
};

const isShow = ref(false);

/**
 * Xử lý set thời gian toast message ẩn
 * CreatedBy: NHGiang
 */
setTimeout(() => {
    try {
        isShow.value = true;
    } catch (error) {
        console.log(error);
    }
}, 4500);
</script>

<template>
    <div v-if="!isShow" class="toast">
        <div class="toast-left">
            <div class="toast-icon__wrapper">
                <div
                    v-if="status === MISA_ENUM.STATUS_TOAST.SUCCESS"
                    class="toast-icon__success"
                ></div>
                <div v-if="status === MISA_ENUM.STATUS_TOAST.ERROR" class="toast-icon__error"></div>
                <div
                    v-if="status === MISA_ENUM.STATUS_TOAST.WARNING"
                    class="toast-icon__warning"
                ></div>
                <div v-if="status === MISA_ENUM.STATUS_TOAST.INFO" class="toast-icon__info"></div>
            </div>
            <div
                :class="{
                    'toast-success': status === MISA_ENUM.STATUS_TOAST.SUCCESS,
                    'toast-error': status === MISA_ENUM.STATUS_TOAST.ERROR,
                    'toast-warning': status === MISA_ENUM.STATUS_TOAST.WARNING,
                    'toast-info': status === MISA_ENUM.STATUS_TOAST.INFO,
                }"
            >
                {{ statusMessage }}
            </div>
            {{ toastMessage }}
        </div>
        <div class="toast-close">
            <div class="toast-close__icon" @click="handleCloseToast"></div>
        </div>
    </div>
</template>

<style scoped>
.toast {
    position: relative;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 40px #00000014;
    width: 200px;
    transition: all linear 0.3s;
    animation: slideInLeft ease 0.3s, fadeOut 1s 4s forwards;
    min-width: 450px;
    max-width: 650px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    margin-bottom: 16px;
}

.toast-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.toast-success {
    color: var(--primary-color);
    font-weight: 700;
}

.toast-error {
    color: #de3618;
    font-weight: 700;
}

.toast-warning {
    color: #f49342;
    font-weight: 700;
}

.toast-info {
    color: #009eeb;
    font-weight: 700;
}

.toast-icon__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    width: 24px;
    margin-right: 8px;
}

.toast-icon__success {
    background: url("../assets/img/Sprites.ee5d4fa7.svg") no-repeat -1602px -258px;
    width: 20px;
    height: 20px;
}

.toast-icon__error {
    background: url("../assets/img/Sprites.ee5d4fa7.svg") no-repeat -538px -146px;
    width: 20px;
    height: 20px;
}

.toast-icon__warning {
    background: url("../assets/img/Sprites.ee5d4fa7.svg") no-repeat -1602px -258px;
    width: 20px;
    height: 20px;
}

.toast-icon__info {
    background: url("../assets/img/Sprites.ee5d4fa7.svg") no-repeat -1602px -258px;
    width: 20px;
    height: 20px;
}
.toast-close {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 16px;
    width: 16px;
    cursor: pointer;
}

.toast-close__icon {
    background: url("../assets/img/Sprites.ee5d4fa7.svg") no-repeat -2055px -474px;
    width: 13px;
    height: 13px;
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(calc(100% + 32px));
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(calc(100% + 32px));
    }
}
</style>
