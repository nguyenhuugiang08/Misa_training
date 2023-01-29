<script setup>
import MTable from "../components/MTable.vue";
import MPagination from "../components/MPagination.vue";
import MPopUp from "../components/MPopUp.vue";
import MLoading from "../components/MLoading.vue";
import { ref, inject, watch } from "vue";
import { useEmployee } from "../composable/useEmployee";
import { useRoute, useRouter } from "vue-router";
import { handleSetStatusForm } from "../utilities/setDefaultStateForm";
import MToast from "../components/MToast.vue";
import { MISA_ENUM } from "../base/enum";
import { MISA_RESOURCE } from "../base/resource";

const {
    listEmployees,
    listAllEmployees,
    searchEmployees,
    totalPage,
    totalRecord,
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
    setTotalEmployee,
    setIdentityForm,
    setlistAllEmployee,
    setListToast,
} = inject("diy");
const keyword = ref("");
const isLoading = ref(false);
const isFocus = ref(false);
const pageSize = ref(20);

const route = useRoute();
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

getAllEmployees();
setlistAllEmployee(listAllEmployees);

handleFilterPage(route.query.pageSize, 1);
setListEmployees(listEmployees);
setTotalEmployee(totalRecord);
setTotalPage(totalPage);
const router = useRouter();
router.push({ path: "/", query: { pageSize: pageSize.value, pageNumber: 1 } });

/**
 * Xử lý hiển thị toast message thành công
 * CreatedBy: NHGiang
 */
const handleShowToast = (toast) => {
    try {
        setListToast(toast);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý tìm kiếm nhân viên theo tên, mã nhân viên
 */
const debounceSearch = async (val) => {
    try {
        isLoading.value = true;
        await searchEmployees(val);
        setListEmployees(listEmployees);
        setTotalPage(totalPage);
        isLoading.value = false;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý khi kết thúc việc sửa nhân  viên
 * CreatedBy: NHGiang
 */
const handleEndEditEmployee = async (event) => {
    try {
        const { isCloseForm, ...toastInfo } = event;
        await handleFilterPage(pageSize.value, 1);
        setListEmployees(listEmployees);
        if (isCloseForm) {
            setIsForm();
        } else {
            if (toastInfo.status === MISA_ENUM.STATUS_TOAST.SUCCESS) {
                await setIsForm();
                handleHideFormAdd();
            }
        }
        setTotalPage(totalPage);
        isLoading.value = false;
        handleShowToast(toastInfo);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý khi kết thúc việc thêm nhân  viên
 * CreatedBy: NHGiang
 */
const handleEndAddEmployee = async (event) => {
    try {
        const { isCloseForm, ...toastInfo } = event;
        await handleFilterPage(pageSize.value, 1);
        setListEmployees(listEmployees);
        if (isCloseForm) {
            setIsForm();
        } else {
            if (toastInfo.status === MISA_ENUM.STATUS_TOAST.SUCCESS) {
                await setIsForm();
                handleHideFormAdd();
            }
        }
        setTotalPage(totalPage);
        isLoading.value = false;
        handleShowToast(toastInfo);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý khi kết thúc việc xóa nhân  viên
 * CreatedBy: NHGiang
 */
const handleEndDeleteEmployee = async ({ event, id }) => {
    try {
        const newListEmpolyees = listEmployees.value.filter((emp) => emp.EmployeeId !== id);
        setListEmployees(newListEmpolyees);
        isLoading.value = false;
        handleShowToast(event);
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
        await handleFilterPage(pageSize.value, 1);
        setListEmployees(listEmployees);
        setTotalPage(totalPage);
        isLoading.value = false;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý mở form thêm mới
 * Created by: NHGiang
 */
const handleHideFormAdd = () => {
    try {
        setIsForm();
        setTitleForm(MISA_RESOURCE.FORM_TITLE.ADD);
        setEmployeeSelected({});
        setIdentityForm(MISA_ENUM.FORM_MODE.ADD);
        handleSetStatusForm();
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="content">
        <div class="content__header">
            <div class="content__header-text">Nhân viên</div>
            <button class="btn btn-primary btn-add-emp" @click="handleHideFormAdd">
                Thêm mới nhân viên
            </button>
        </div>
        <di class="toast-container">
            <m-toast
                v-for="(toast, index) in state.listToast"
                :key="index"
                :toastMessage="toast.toastMessage"
                :statusMessage="toast.statusMessage"
                :status="toast.status"
            />
        </di>
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
            <m-table @startDelete="isLoading = true" @endDelete="handleEndDeleteEmployee($event)" />
            <m-pagination />
            <m-pop-up
                v-if="state.isForm"
                @hideModal="setIsForm"
                :title="state.titleForm"
                @startEdit="isLoading = true"
                @endEdit="handleEndEditEmployee($event)"
                @endAdd="handleEndAddEmployee($event)"
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

.toast-container {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 999;
}
</style>
