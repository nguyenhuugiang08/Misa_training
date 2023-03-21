<script setup>
import { MISA_ENUM } from "../base/enum";
import { MISA_RESOURCE } from "../base/resource";
import { ref, inject, watch } from "vue";
import { useEmployee } from "../composable/useEmployee";
import { useRoute, useRouter } from "vue-router";
import { handleSetStatusForm } from "../utilities/setDefaultStateForm";
import MTable from "../components/MTable.vue";
import MPagination from "../components/MPagination.vue";
import MPopUp from "../components/MPopUp.vue";
import MLoading from "../components/MLoading.vue";
import MToast from "../components/MToast.vue";
import MPopUpWarning from "../components/MPopUpWarning.vue";

const {
    listEmployees,
    listAllEmployees,
    totalPage,
    totalRecord,
    getAllEmployees,
    handleFilterPage,
    handlExportExcel,
    handleBulkDelete,
} = useEmployee();
const {
    state,
    setEntities,
    setTitleForm,
    setIsForm,
    setEmployeeSelected,
    setTotalPage,
    setTotalEntities,
    setIdentityForm,
    setListItemChecked,
    setListPageChecked,
    setListToast,
    setKeyword,
} = inject("diy");

const isLoading = ref(false);
const isFocus = ref(false);
const pageSize = ref(20);
const isOpen = ref(false);

const route = useRoute();
/**
 * Lấy ra số lượng bản ghi trên 1 trang sử dụng vue-router
 * created by : NHGiang
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
 * Lấy danh sách tất cả nhân viên thực hiện check mã nhân viên
 * CreatedBy: NHGiang - (16/02/23)
 */
getAllEmployees();
setEntities(listAllEmployees);

handleFilterPage("", route.query.pageSize, MISA_ENUM.PAGENUMBER_DEFAULT);
setEntities(listEmployees);
setTotalEntities(totalRecord);
setTotalPage(totalPage);
const router = useRouter();
router.push({ path: "/", query: { pageSize: pageSize.value, pageNumber: MISA_ENUM.PAGENUMBER_DEFAULT } });

/**
 * Xử lý hiển thị toast message thông báo
 * CreatedBy: NHGiang - (16/02/23)
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
        setKeyword(val);
        router.push({ path: "/", query: { pageSize: pageSize.value, pageNumber: MISA_ENUM.PAGENUMBER_DEFAULT } });
        isLoading.value = true;
        setTimeout(async () => {
            await handleFilterPage(val, pageSize.value, MISA_ENUM.PAGENUMBER_DEFAULT);
            setEntities(listEmployees);
            setTotalPage(totalPage);
            isLoading.value = false;
        }, 500);
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
        await handleFilterPage("", pageSize.value, MISA_ENUM.PAGENUMBER_DEFAULT);
        setEntities(listEmployees);
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
 * CreatedBy: NHGiang -
 */
const handleEndAddEmployee = async (event) => {
    try {
        const { isCloseForm, ...toastInfo } = event;
        await handleFilterPage("", pageSize.value, MISA_ENUM.PAGENUMBER_DEFAULT);
        setEntities(listEmployees);
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
        setEntities(newListEmpolyees);
        if (state.listItemChecked.includes(id)) {
            const newListChecked = state.listItemChecked.filter((item) => item !== id);
            setListItemChecked(newListChecked);
        }
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
        router.push({ path: "/", query: { pageSize: pageSize.value, pageNumber: MISA_ENUM.PAGENUMBER_DEFAULT } });
        setTimeout(async () => {
            await handleFilterPage(state.keyword, pageSize.value, MISA_ENUM.PAGENUMBER_DEFAULT);
            setEntities(listEmployees);
            setTotalPage(totalPage);
            isLoading.value = false;
        }, 500);
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

/**
 * Xử lý xuất ra Excel
 * Created by: NHGiang
 */
const onClickButtonExport = async () => {
    try {
        const config = {
            keyword: state.keyword,
            dataCount: totalRecord.value,
            pageNumber: 1,
        };
        isLoading.value = true;
        await handlExportExcel(config);
        isLoading.value = false;
    } catch (error) {
        console.log(error);
    }
};

/**
 * hàm thực hiện hàng loạt
 * created by: NHGiang
 */
const handleBatchExecution = async () => {
    try {
        isLoading.value = true;
        await handleBulkDelete(state.listItemChecked);
        setListItemChecked([]);
        setListPageChecked([]);
        router.push({ path: "/", query: { pageSize: pageSize.value, pageNumber: MISA_ENUM.PAGENUMBER_DEFAULT } });
        handleFilterPage("", route.query.pageSize, MISA_ENUM.PAGENUMBER_DEFAULT);
        setEntities(listEmployees);
        setTotalEntities(totalRecord);
        setTotalPage(totalPage);
        isLoading.value = false;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm hiển thị pop up cảnh báo khi thực hiện xóa hàng loạt
 * @param {*} e -- Object event
 * Created by: NHGiang - (21/02/23)
 */
const handleDisplayWraningPopUp = (e) => {
    try {
        e.stopPropagation();
        isOpen.value = true;
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
        <div class="toast-container">
            <m-toast
                v-for="(toast, index) in state.listToast"
                :key="index"
                :toastMessage="toast.toastMessage"
                :statusMessage="toast.statusMessage"
                :status="toast.status"
            />
        </div>
        <div class="content-wrapper">
            <div class="content-wrapper__action">
                <div class="batch-execution" v-if="state.listItemChecked.length">
                    <div>Đã chọn: {{ state.listItemChecked.length }}</div>
                    <div
                        class="unchecked"
                        @click="
                            setListItemChecked([]);
                            setListPageChecked([]);
                        "
                    >
                        Bỏ chọn
                    </div>
                    <button
                        class="btn btn-secondary btn-delete-multiple"
                        @click.self="handleDisplayWraningPopUp"
                    >
                        <div class="btn-delete-multiple__icon"></div>
                        Xóa
                    </button>
                </div>
                <div class="textfield">
                    <label for="" class="textfield__label">
                        <div
                            class="textfield__icon"
                            :style="{ borderColor: `${isFocus ? '#50B83C' : ''}` }"
                        >
                            <div
                                :style="{
                                    background:
                                        'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -992px -360px',
                                    width: '16px',
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
                <div class="sidebar-item__icon export" @click="onClickButtonExport">
                    <div class="export-icon"></div>
                </div>
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
            <div class="modal-error" v-if="isOpen">
                <m-pop-up-warning
                    v-if="isOpen"
                    :title="'Xác nhận xóa'"
                    :text-info="`Bạn có thực sự muốn xóa ${state.listItemChecked.length} nhân viên đã được chọn?`"
                    @closeWarning="isOpen = !isOpen"
                    @closeForm="isOpen = !isOpen"
                    @submitForm="
                        handleBatchExecution();
                        isOpen = !isOpen;
                    "
                />
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

.batch-execution {
    margin-right: auto;
    position: relative;
    top: 4px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
}

.unchecked {
    color: #ff3939;
    margin: 0 25px 0 16px;
    cursor: pointer;
}

.btn-delete-multiple__icon {
    background: url("../../src/assets/img/Sprites.ee5d4fa7.svg") no-repeat -464px -313px;
    width: 15px;
    height: 15px;
    margin-right: 8px;
}
</style>
