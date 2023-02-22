<script setup>
import { ref, inject, watch } from "vue";
import MToast from "../components/MToast.vue";
import MInputMoney from "../components/MInputMoney.vue";
import MTable from "../components/MTable.vue";
import MRow from "../components/MRow.vue";

const { state, setListToast } = inject("diy");
const salary = ref(100000);
</script>

<template>
    <div class="content">
        <div class="content__header">
            <div class="content__header-text">Tiền mặt</div>
        </div>
        <div>
            <m-input-money
                v-model="salary"
                fieldText="Lương"
                @update:modelValue="salary = $event"
            />
            <strong>Lương của nhân viên: {{ salary }}</strong>
        </div>
    </div>
</template>

<style scoped></style>
