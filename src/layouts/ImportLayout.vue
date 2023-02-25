<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const identityStep = ref(1);

const handleNextStep = (e) => {
    try {
        if (identityStep.value < 3) identityStep.value = identityStep.value + 1;
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="import">
        <div class="import-header">
            <span class="import-header__text">Nhập nhân viên từ Excel</span>
            <div class="import-header__icon"></div>
        </div>
        <div class="import-step">
            <div class="step">
                <div class="step-number step-number--active">1</div>
                <div class="step-label step-label--active">chọn tệp nguồn</div>
            </div>
            <div class="step">
                <div class="step-number">2</div>
                <div class="step-label">kiểm tra dữ liệu</div>
            </div>
            <div class="step">
                <div class="step-number">3</div>
                <div class="step-label">kết quả</div>
            </div>
            <progress class="step-line" value="50" max="100"></progress>
        </div>
        <div class="import-content">
            <router-view></router-view>
        </div>
        <div class="import-footer">
            <button class="btn btn-secondary btn-import-prev">
                <router-link to="/">Hủy</router-link>
            </button>
            <button class="btn btn-primary" @click="handleNextStep">Tiếp tục</button>
        </div>
    </div>
</template>
