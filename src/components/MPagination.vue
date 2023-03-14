<script setup>
import { defineComponent, watch, inject, ref } from "vue";
import MCheckbox from "./MCheckbox.vue";
import MLoading from "./MLoading.vue";
import Paginate from "vuejs-paginate-next";
import { useRoute, useRouter } from "vue-router";
import { MISA_ENUM } from "../base/enum";

const props = defineProps({
    path: String,
    funcFilter: Function,
});

const { state } = inject("diy");
const pageSize = ref(20);
const page = ref(1);
const router = useRouter();
const route = useRoute();
const { query } = route;

/**
 * Theo dõi sự thay đổi pageSize từ URL
 * Created by: NHGiang - (19/0/23)
 */
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

/**
 * Theo dõi sự thay đổi pageNumber từ URL
 * Created by: NHGiang - (19/0/23)
 */
watch(
    () => route.query.pageNumber,
    (newValue) => {
        page.value = newValue * 1;
        try {
        } catch (error) {
            console.log(error);
        }
    }
);

// Định nghĩa các component được import
const components = defineComponent({
    MCheckbox,
    MLoading,
    Paginate,
});

// Trạng thái ẩn hiện của loading khi thực hiện tác vụ bất đồng bộ
const isLoading = ref(false);

/**
 * Xử lý thay đổi dữ liệu hiển thị trên trang khi thay đổi pageSize
 * @param {*} pageSize -- Số lượng bản ghi trên 1 trang
 * @param {*} pageNumber -- Trang thứ bao nhiêu
 * Created by: NHGiang - (20/02/23)
 */
const handleChangePageSize = async (pageSize, pageNumber = 1) => {
    try {
        router.push({ path: props.path, query: { pageSize: pageSize, pageNumber: pageNumber } });
        isLoading.value = true;
        await props.funcFilter(state.keyword, pageSize, pageNumber);
        isLoading.value = false;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý thay đổi dữ liệu hiển thị trên trang khi thay đổi pageNumber
 * @param {*} pageNumber -- Trang thứ bao nhiêu
 * Created by: NHGiang - (20/02/23)
 */
const handleChangePageNumber = async (pageNumber) => {
    try {
        router.push({
            path: props.path,
            query: { pageSize: pageSize.value, pageNumber: pageNumber },
        });
        isLoading.value = true;
        await props.funcFilter(state.keyword, pageSize.value, pageNumber);
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
            Tổng: <strong>{{ state.totalEntities }}</strong> bản ghi
        </div>
        <div style="display: flex; align-items: center">
            <m-checkbox
                :options="MISA_ENUM.pageSizeOptions"
                :default="MISA_ENUM.pageSizeOptions[1].optionId"
                :is-top="true"
                :width="'200px'"
                :is-absolute="true"
                @select="handleChangePageSize($event.optionId)"
            />
            <paginate
                v-model="page"
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
                hide-prev-next
            >
            </paginate>
        </div>
        <div v-if="isLoading" class="overlay">
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

.page-link {
    color: #111 !important;
}
</style>
