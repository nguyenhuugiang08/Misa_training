<script setup>
import { ref, inject, watch } from "vue";
import MToast from "../components/MToast.vue";
import MInputMoney from "../components/MInputMoney.vue";
import MTable from "../components/MTable.vue";
import MRow from "../components/MRow.vue";

const { state, setListToast } = inject("diy");
const salary = ref(100000);

const handleShowToast = () => {
    try {
        const toast = {
            toastMessage: "Công việc đã vị xóa.",
            statusMessage: "Thành công!",
            status: 0,
        };
        setListToast(toast);
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
        <m-input-money v-model="salary" fieldText="Lương" @update:modelValue="salary = $event" />
        <strong>Lương của nhân viên: {{ salary }}</strong>
    </div>
</template>

<style scoped></style>
