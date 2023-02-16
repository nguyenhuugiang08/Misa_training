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
    searchEmployees,
    listAllEmployees,
    getAllEmployees,
    totalPage,
    totalRecord,
    handleFilterPage,
    handlExportExcel,
    handleBulkDelete,
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
    setListItemChecked,
    setListToast,
} = inject("diy");
const keyword = ref("");
const isLoading = ref(false);
const isFocus = ref(false);
const pageSize = ref(20);
const isShowBtnExcute = ref(false);
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
        keyword.value = val;
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

/**
 * Xử lý xuất ra Excel
 * Created by: NHGiang
 */
const onClickButtonExport = async () => {
    try {
        const config = {
            keyword: keyword.value,
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
        handleFilterPage(route.query.pageSize, 1);
        setListEmployees(listEmployees);
        setTotalEmployee(totalRecord);
        setTotalPage(totalPage);
        isLoading.value = false;
    } catch (error) {
        console.log(error);
    }
};

const handleDisplayWraningPopUp = (e) => {
    try {
        e.stopPropagation();
        isOpen.value = true;
        isShowBtnExcute.value = false;
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
                <div
                    class="batch-execution"
                    :class="state.listItemChecked.length > 1 ? 'batch-execution--active' : ''"
                    @click="state.listItemChecked.length > 1 && (isShowBtnExcute = true)"
                >
                    <span class="batch-execution__text">Thực hiện hàng loạt</span>
                    <div class="batch-execution__warapper">
                        <div
                            :class="
                                state.listItemChecked.length > 1
                                    ? 'batch-execution__icon--active'
                                    : 'batch-execution__icon'
                            "
                        ></div>
                    </div>
                    <ul class="batch-execution__delete" v-show="isShowBtnExcute">
                        <li
                            class="batch-execution__delete-item"
                            @click.self="handleDisplayWraningPopUp"
                        >
                            Xóa
                        </li>
                    </ul>
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
                    :text-info="`Bạn có thực sự muốn xóa các nhân viên đã được chọn?`"
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

.toast-container {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 999;
}

.export {
    position: relative;
    top: 4px;
    margin-left: 8px;
}

.export::before {
    content: "Xuất ra Excel";
    position: absolute;
    width: max-content;
    z-index: 999;
    top: 32px;
    background-color: #434242;
    color: #fff;
    padding: 2px 6px;
    border-radius: 4px;
    animation: identifier 0.3s ease-in;
    display: none;
}

.export:hover::before {
    display: block;
}

.export-icon {
    background: url("../../src/assets/img/Sprites.ee5d4fa7.svg") no-repeat -705px -202px;
    width: 23px;
    height: 20px;
}

.batch-execution {
    margin-right: auto;
    border: 1px solid #b1b2b3;
    height: 28px;
    border-radius: 3px;
    position: relative;
    top: 4px;
    padding: 0 16px;
    color: #afafaf;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
}
.batch-execution--active {
    color: #111;
    border: 1px solid #3b3c3f;
    cursor: pointer;
}

.batch-execution__text {
    margin-right: 4px;
}

.batch-execution__warapper {
    height: 16px;
    width: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.batch-execution__icon {
    background: url("../../src/assets/img/Sprites.ee5d4fa7.svg") no-repeat -1756px -317px;
    width: 8px;
    height: 5px;
}

.batch-execution__icon--active {
    background: url("../../src/assets/img/Sprites.ee5d4fa7.svg") no-repeat -564px -365px;
    width: 8px;
    height: 5px;
}

.batch-execution__delete {
    position: absolute;
    padding: 2px 1px;
    border-radius: 2px;
    font-weight: 400;
    border: 1px solid #babec5;
    background: #fff;
    list-style: none;
    z-index: 99;
    top: 31px;
    right: 0;
    transition: all 0.2s ease-in;
    color: #111;
}

.batch-execution__delete-item {
    padding: 5px 10px;
    cursor: pointer;
    min-width: 100px;
    display: flex;
    align-items: center;
}

.batch-execution__delete-item:hover {
    color: var(--primary-color);
    background: #ebedf0;
}
</style>
