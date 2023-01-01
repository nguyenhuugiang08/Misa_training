<script setup>
import { inject, ref } from "vue";
import MCheckbox from "./MCheckbox.vue";
import { useEmployee } from "../composable/useEmployee";

const { state } = inject("diy");
const filterOptions = ref([
    {
        optionId: 10,
        optionName: "10 bản ghi trên 1 trang",
    },
    {
        optionId: 20,
        optionName: "20 bản ghi trên 1 trang",
    },
    {
        optionId: 30,
        optionName: "30 bản ghi trên 1 trang",
    },
    {
        optionId: 50,
        optionName: "50 bản ghi trên 1 trang",
    },
    {
        optionId: 100,
        optionName: "100 bản ghi trên 1 trang",
    },
]);

const { handleFilterPage } = useEmployee();
</script>

<template>
    <div class="content-footer">
        <div class="empolyee-quantity">
            Tổng: <strong>{{ state.listEmployees.length }}</strong> bản ghi
        </div>
        <div style="display: flex; align-items: center">
            <m-checkbox
                :options="filterOptions"
                :default="filterOptions[1].optionName"
                :is-top="true"
                :width="'200px'"
                style="position: relative; top: 4px"
            />
            <div class="pagination">
                <div class="pagination-prev">Trước</div>
                <ul class="pagination-list">
                    <li class="pagination-item">1</li>
                    <li class="pagination-item">2</li>
                    <li class="pagination-item">3</li>
                    <li class="pagination-item">...</li>
                    <li class="pagination-item">52</li>
                </ul>
                <strong class="pagination-next">Sau</strong>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
