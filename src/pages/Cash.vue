<script setup>
import { ref, inject } from "vue";
import MToast from "../components/MToast.vue";
const { state, setListToast } = inject("diy");

const handleShowToast = () => {
    try {
        const toast = {
            toastMessage: "Công việc đã vị xóa.",
            statusMessage: "Thành công!",
            status: 0,
        };
        setListToast(toast);
        console.log(state.listToast);
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div>
        About
        <button @click="handleShowToast">Show toast</button>

        <m-toast
            v-for="(toast, index) in state.listToast"
            :key="index"
            :toastMessage="toast.toastMessage"
            :statusMessage="toast.statusMessage"
            :status="toast.status"
        />
    </div>
</template>

<style scoped></style>
