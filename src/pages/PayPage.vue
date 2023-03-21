<script setup>
import { ref, inject, watch } from "vue";
import { MISA_RESOURCE } from "../base/resource";
import MTable from "../components/MTable.vue";
import MPagination from "../components/MPagination.vue";
import MTableDetail from "../components/MTableDetail.vue";
import VueResizable from "vue-resizable";
import { MISA_ENUM } from "../base/enum";
import { useRoute, useRouter } from "vue-router";
import { usePayment } from "../composable/usePayment";
import MPopUpWarning from "../components/MPopUpWarning.vue";
import MToast from "../components/MToast.vue";
import { handleSetStatusForm } from "../utilities/setDefaultStateForm";

const isFocus = ref(false); // Trạng thái focus vào ô tìm kiếm
const heightMaster = ref(MISA_ENUM.HEIGHT_PAYMENT_CONTENT); // Chiều cao phần master
const heightDetail = ref(MISA_ENUM.HEIGHT_PAYMENT_DETAIL); // Chiều cao mặc định của phần detail
const vueResizeRef = ref(null); // ref của component vue-resize
const pageSize = ref(20); // số bản ghi trên 1 trang
const pageNumber = ref(1); // trang thứ bao nhiêu
const isShowAction = ref(false); // trạng thái đóng mở action xóa hàng loạt
const isShowPopupWarningDelete = ref(false); // trạng thái đóng mở popup cảnh báo khi thực hiện xóa hàng loạt
const totalPayment = ref(0);

const router = useRouter();
const route = useRoute();
router.push({ path: "/cash/pay", query: { pageSize: pageSize.value, pageNumber: MISA_ENUM.PAGENUMBER_DEFAULT } });

const { getPaymentsByFilter, handlExportExcel, handleBulkDelete, getPayments, getNewRefNo } =
    usePayment();
getPaymentsByFilter();
getPayments();

const { state, setEntitySelected, setIdentityForm } = inject("diy");

watch(
    () => state.listAllEntities,
    (newValue) => {
        try {
            totalPayment.value = newValue?.reduce((result, cur) => {
                try {
                    return (result += cur.TotalAmount);
                } catch (error) {
                    console.log(error);
                }
            }, 0);
        } catch (error) {
            console.log(error);
        }
    }
);

const fakeDataDetail = [
    {
        PaymentId: 1,
        Explain: "Chi tiền cho Nguyễn Hữu Giang",
        AccountDebt: "111",
        AccountHas: "111",
        Money: 1000000,
        SubjectId: "KH001",
        SubjectName: "Công ty cổ phần văn phòng phẩm Hồng Hà tại Hà Nội",
    },
    {
        PaymentId: 2,
        Explain: "Chi tiền cho Nguyễn Hữu Giang",
        AccountDebt: "111",
        AccountHas: "111",
        Money: 1000000,
        SubjectId: "KH001",
        SubjectName: "Công ty cổ phần văn phòng phẩm Hồng Hà tại Hà Nội",
    },
];

/**
 * Hàm thực hiện thay đổi chiều cao phần detail khi resize
 * @param {*} event
 * Created by: NHGiang - (07/03/23)
 */
const handleChangeHeight = (event) => {
    try {
        heightDetail.value = MISA_ENUM.HEIGHT_PAYMENT_CONTENT - event.height;
        heightMaster.value = event.height;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Thực hiện hiển thị form chi tiết phiếu chi
 * Created by: NHGiang - (15/03/23)
 */
const handleShowPaymentDetail = async () => {
    try {
        setEntitySelected({});
        await getNewRefNo();
        setIdentityForm(MISA_ENUM.FORM_MODE.ADD);
        handleSetStatusForm();
        router.push("/pay/pay-detail");
    } catch (error) {
        console.log(error);
    }
};

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
 * Lấy ra trang thứ bao nhiêu sử dụng vue-router
 * created by : NHGiang
 */
watch(
    () => route.query.pageNumber,
    (newValue) => {
        pageNumber.value = newValue;
        try {
        } catch (error) {
            console.log(error);
        }
    }
);

/**
 * Hàm xử lý tìm kiếm phiếu chi
 * @param {*} value -- Từ khỏa tìm kiếm
 * Created By: NHGiang - (10/02/23)
 */
const debounceSearch = async (value) => {
    try {
        await getPaymentsByFilter(value, pageSize.value, pageNumber.value);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lấy lại dữ liệu
 * Created by: NHGiang - (15/03/23)
 */
const handleRefreshData = async () => {
    {
        try {
            await getPaymentsByFilter(state.keyword, pageSize.value, pageNumber.value);
        } catch (error) {
            console.log(error);
        }
    }
};

/**
 * Xử lý xuất ra Excel
 * Created by: NHGiang
 */
const onClickButtonExport = async () => {
    try {
        const config = {
            keyword: state.keyword || "",
            dataCount: state.totalEntities,
            pageNumber: 1,
        };
        await handlExportExcel(config);
    } catch (error) {
        console.log(error);
    }
};

watch(
    () => state.listItemChecked.length,
    (newValue) => {
        try {
            if (newValue <= 1) {
                isShowAction.value = false;
            }
        } catch (error) {
            console.log(error);
        }
    }
);

/**
 * Hàm thực hiện xóa nhiều bản ghi
 * Created by: NHGiang - (16/03/23)
 */
const handleDeleteMultiple = async () => {
    try {
        await handleBulkDelete(state.listItemChecked);
        await getPaymentsByFilter(state.keyword, pageSize.value, pageNumber.value);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm thực hiện click outside button thực hiện hàng loạt
 * Created by: NHGiang - (16/03/23)
 */
const handleClickOutsideButtonBulkDelete = () => {
    try {
        isShowAction.value = false;
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="content-wrapper content-wrapper-payment">
        <vue-resizable
            ref="vueResizeRef"
            :active="['b']"
            :maxHeight="660"
            :height="heightMaster"
            @resize:move="handleChangeHeight($event)"
        >
            <div class="content-wrapper__action">
                <div class="m-icon check-all"><div class="arrow-check-all"></div></div>
                <div
                    class="pay-bulk-delete"
                    :class="{ 'pay-bulk-delete--active': state.listItemChecked.length > 1 }"
                    @click="isShowAction = !isShowAction"
                    v-click-outside-element="handleClickOutsideButtonBulkDelete"
                >
                    Thực hiện hàng loạt
                    <div class="m-icon"><div class="pay-bulk-delete__icon"></div></div>
                </div>
                <div
                    class="pay-bulk-delete__action"
                    v-if="isShowAction && state.listItemChecked.length > 1"
                    @click="isShowPopupWarningDelete = true"
                >
                    Xóa
                </div>
                <div class="textfield">
                    <label for="" class="textfield__label">
                        <div
                            class="textfield__icon"
                            :style="{ borderColor: `${isFocus ? '#50B83C' : ''}` }"
                        >
                            <div class="search-icon"></div>
                        </div>
                    </label>
                    <input
                        type="text"
                        class="textfield__input"
                        id="search-input"
                        placeholder="Tìm kiếm"
                        autocomplete="off"
                        @focus="isFocus = true"
                        @blur="isFocus = false"
                        v-debounce:600="debounceSearch"
                    />
                </div>
                <div
                    class="sidebar-item__icon content-wrapper__action-refresh refresh-icon"
                    @click="handleRefreshData"
                ></div>
                <div class="sidebar-item__icon export" @click="onClickButtonExport">
                    <div class="export-icon"></div>
                </div>
                <button class="btn btn-primary btn-pay" @click="handleShowPaymentDetail">
                    Chi tiền
                </button>
            </div>
            <m-table
                :columns="MISA_RESOURCE.COLUMNS_NAME_TABLE_PAY"
                hasCheckbox
                :entities="state.payments"
                :max-height="heightMaster"
                :total-payment="totalPayment"
            />
            <m-pagination path="/cash/pay" :func-filter="getPaymentsByFilter" />
        </vue-resizable>
        <div class="detail-payment" :style="{ height: heightDetail + 'px' }">
            <div class="detail-payment__title">Chi tiết</div>
            <m-table-detail
                :columns="MISA_RESOURCE.COLUMNS_NAME_PAYMENT_DETAIL"
                :entities="fakeDataDetail"
            />
            <div class="detail-payment__paging"><m-pagination /></div>
        </div>
        <div class="overlay" v-if="state.isLoading"><m-loading /></div>
        <div class="modal-error" v-if="isShowPopupWarningDelete">
            <m-pop-up-warning
                :title="'Xác nhận xóa'"
                :text-info="`Bạn có muốn xóa những chứng từ này không?`"
                @closeWarning="isShowPopupWarningDelete = !isShowPopupWarningDelete"
                @closeForm="isShowPopupWarningDelete = !isShowPopupWarningDelete"
                @submitForm="
                    handleDeleteMultiple();
                    isShowPopupWarningDelete = !isShowPopupWarningDelete;
                "
            />
        </div>
        <div class="toast-container">
            <m-toast
                v-if="state.listToast.length"
                v-for="(toast, index) in state.listToast"
                :key="index"
                :toastMessage="toast.toastMessage"
                :statusMessage="toast.statusMessage"
                :status="toast.status"
            />
        </div>
    </div>
</template>

<style>
.resizable-component {
    width: 100% !important;
}

.resizable-b {
    height: 13px !important;
    position: absolute !important;
    bottom: 0px !important;
    border-radius: 2px;
    margin: 0 -12px 0 -12px;
    width: calc(100% + 24px) !important;
}

.resizable-b:hover {
    cursor: row-resize !important;
    background: #e0e0e0 !important;
}

.resizable-b::before {
    content: "\f0d7";
    font-family: FontAwesome;
    position: absolute;
    left: calc(50% - 30px);
    width: 48px;
    height: 13px;
    background: #d4d7dc;
    border: 1px solid #d4d7dc;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.pay-bulk-delete--active {
    border: 1px solid #3b3c3f;
    color: #111;
}

.btn-pay {
    position: relative;
    top: 4px;
    margin-left: 8px;
}
</style>
