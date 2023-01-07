<script setup>
import MTable from "../components/MTable.vue";
import MPagination from "../components/MPagination.vue";
import MPopUp from "../components/MPopUp.vue";
import MLoading from "../components/MLoading.vue";
import { ref, inject } from "vue";
import { useEmployee } from "../composable/useEmployee";
import { useRoute } from "vue-router";

const {
    listEmployees,
    listAllEmployees,
    searchEmployees,
    totalPage,
    handleFilterPage,
    getAllEmployees,
} = useEmployee();
const {
    state,
    setListEmployees,
    setTitleForm,
    setIsForm,
    setEmployeeSelected,
    setTotalPage,
    setIdentityForm,
    setlistAllEmployee,
} = inject("diy");
const keyword = ref("");
const isLoading = ref(false);
const isFocus = ref(false);

const route = useRoute();
const { query } = route;

getAllEmployees();
setlistAllEmployee(listAllEmployees);

/**
 * Xử lý tìm kiếm nhân viên theo tên, mã nhân viên
 */
const debounceSearch = async (val) => {
    isLoading.value = true;
    await searchEmployees(val);
    setListEmployees(listEmployees);
    setTotalPage(totalPage);
    isLoading.value = false;
};

/**
 * Xử lý khi kết thúc việc sửa nhân  viên
 * CreatedBy: NHGiang
 */
const handleEndEditEmployee = async () => {
    try {
        await handleFilterPage();
        setListEmployees(listEmployees);
        setIsForm(false);
        isLoading.value = false;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý khi kết thúc việc sửa nhân  viên
 * CreatedBy: NHGiang
 */
const handleEndDeleteEmployee = async () => {
    try {
        await handleFilterPage();
        setListEmployees(listEmployees);
        isLoading.value = false;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý refresh lại bảng dữ liệu
 * CreatedBy: NHGiang
 */
const handleRefresh = async () => {
    try {
        isLoading.value = true;
        await handleFilterPage();
        setListEmployees(listEmployees);
        isLoading.value = false;
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="content">
        <div class="content__header">
            <div class="content__header-text">Nhân viên</div>
            <button
                class="btn btn-primary btn-add-emp"
                @click="
                    setIsForm();
                    setTitleForm('Thêm nhân viên');
                    setEmployeeSelected({});
                    setIdentityForm(0);
                "
            >
                Thêm mới nhân viên
            </button>
        </div>
        <div class="content-wrapper">
            <div class="content-wrapper__action">
                <div class="textfield">
                    <label for="" class="textfield__label">
                        <div
                            class="textfield__icon"
                            :style="{ borderColor: `${isFocus ? '#50B83C' : ''}` }"
                        >
                            <div
                                :style="{
                                    background:
                                        'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -317px -148px',
                                    width: '17px',
                                    height: '16px',
                                }"
                            ></div>
                        </div>
                    </label>
                    <input
                        type="text"
                        class="textfield__input"
                        id="search-input"
                        placeholder="Tìm kiếm mã, tên nhân viên"
                        v-debounce:600="debounceSearch"
                        autocomplete="off"
                        @focus="isFocus = true"
                        @blur="isFocus = false"
                    />
                </div>
                <div
                    class="sidebar-item__icon content-wrapper__action-refresh"
                    :style="{
                        background:
                            'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -425px -201px',
                    }"
                    @click="handleRefresh"
                ></div>
            </div>
            <M-table @startDelete="isLoading = true" @endDelete="handleEndDeleteEmployee" />
            <m-pagination />
            <m-pop-up
                v-if="state.isForm"
                @hideModal="setIsForm"
                :title="state.titleForm"
                @startEdit="isLoading = true"
                @endEdit="handleEndEditEmployee"
            />
            <div v-if="isLoading" class="modal-loading">
                <m-Loading />
            </div>
        </div>
    </div>
</template>

<style>
.modal-loading {
    background-color: #0000004d;
    position: fixed;
    z-index: 99;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
