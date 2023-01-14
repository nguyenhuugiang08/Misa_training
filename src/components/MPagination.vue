<script setup>
import { defineComponent, watch, inject, ref } from "vue";
import MCheckbox from "./MCheckbox.vue";
import { useEmployee } from "../composable/useEmployee";
import MLoading from "./MLoading.vue";
import Paginate from "vuejs-paginate/src/components/Paginate.vue";
import { useRoute, useRouter } from "vue-router";
import { MISA_ENUM } from "../base/enum";

const { state, setListEmployees, setTotalPage } = inject("diy");
const pageSize = ref(20);
const router = useRouter();
const route = useRoute();
const { query } = route;
watch(
    () => route.query.pageSize,
    (newValue) => {
        pageSize.value = newValue;
        try {
        } catch (error) {
            console.log(error);
        }
    }
);

const components = defineComponent({
    MCheckbox,
    MLoading,
    Paginate,
});

const isLoading = ref(false);

const { handleFilterPage, listEmployees, totalPage } = useEmployee();

/**
 * Xử lý thay đổi số lượng bản ghi hiển thị trên trang
 * CreatedBy: NHGiang
 */
const handleChangePageSize = async (pageSize, pageNumber = 1) => {
    try {
        router.push({ path: "/", query: { pageSize: pageSize, pageNumber: pageNumber } });
        isLoading.value = true;
        await handleFilterPage(pageSize, pageNumber);
        setListEmployees(listEmployees);
        setTotalPage(totalPage);
        isLoading.value = false;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý thay đổi trang
 * CreatedBy: NHGiang
 */
const handleChangePageNumber = async (pageNumber) => {
    try {
        router.push({ path: "/", query: { pageSize: pageSize.value, pageNumber: pageNumber } });
        isLoading.value = true;
        await handleFilterPage(pageSize.value, pageNumber);
        setListEmployees(listEmployees);
        isLoading.value = false;
    } catch (error) {
        console.log(error);
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="content-footer">
        <div class="empolyee-quantity">
            Tổng: <strong>{{ state.totalEmployee }}</strong> bản ghi
        </div>
        <div style="display: flex; align-items: center">
            <m-checkbox
                :options="MISA_ENUM.pageSizeOptions"
                :default="MISA_ENUM.pageSizeOptions[1].optionName"
                :is-top="true"
                :width="'200px'"
                style="position: relative; top: 4px"
                @select="handleChangePageSize($event)"
            />
            <paginate
                :page-count="state.totalPageValue"
                :page-range="3"
                :margin-pages="1"
                :prev-text="'Trước'"
                :next-text="'Sau'"
                :container-class="'pagination'"
                :page-class="'page-item'"
                :prev-class="'prev-btn'"
                :next-class="'next-btn'"
                :click-handler="handleChangePageNumber"
            >
                ></paginate
            >
        </div>
        <div v-if="isLoading" class="modal-loading">
            <m-Loading />
        </div>
    </div>
</template>

<style>
.pagination {
    list-style: none;
}

.page-item {
    padding: 0 0.5rem;
}

.prev-btn {
    margin-right: 13px;
}

.next-btn {
    margin-left: 13px;
}

.page-item.active {
    border: 1px solid #e0e0e0;
    font-weight: 700;
}
</style>
