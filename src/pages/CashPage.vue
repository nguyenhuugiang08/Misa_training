<script setup>
import { ref, inject, watch } from "vue";
import MToast from "../components/MToast.vue";
import MInputMoney from "../components/MInputMoney.vue";

const { state, setListToast } = inject("diy");

const salary = ref(10000);

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

watch(
    () => salary.value,
    (newValue) => {
        try {
            console.log(newValue);
        } catch (error) {
            console.log(error);
        }
    }
);
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
        <m-input-money v-model="salary" fieldText="Lương" @update:modelValue="salary = $event" />
    </div>
</template>

<style scoped></style>
