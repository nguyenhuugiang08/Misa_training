<script setup>
import { ref, inject, watch, watchEffect, onMounted, onUnmounted } from "vue";
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
import { usePaymentDeatil } from "../composable/usePaymentDetail";
import MLoading from "../components/MLoading.vue";

const isFocus = ref(false); // Trạng thái focus vào ô tìm kiếm
const heightMaster = ref(MISA_ENUM.HEIGHT_PAYMENT_MASTER); // Chiều cao phần master
const heightDetail = ref(MISA_ENUM.HEIGHT_PAYMENT_DETAIL); // Chiều cao mặc định của phần detail
const vueResizeRef = ref(null); // ref của component vue-resize
const pageSize = ref(20); // số bản ghi trên 1 trang
const pageNumber = ref(1); // trang thứ bao nhiêu
const isShowAction = ref(false); // trạng thái đóng mở action xóa hàng loạt
const isShowPopupWarningDelete = ref(false); // trạng thái đóng mở popup cảnh báo khi thực hiện xóa hàng loạt
const totalPayment = ref(0);

const router = useRouter();
const route = useRoute();
router.push({
    path: "/cash/pay",
    query: { pageSize: pageSize.value, pageNumber: MISA_ENUM.PAGENUMBER_DEFAULT },
});

const { getPaymentsByFilter, handlExportExcel, handleBulkDelete, getPayments, getNewRefNo } =
    usePayment();
getPaymentsByFilter();
getPayments();

const { getPaymentDetailsByPaymentId } = usePaymentDeatil();

const {
    state,
    setEntitySelected,
    setIdentityForm,
    setPaymentDetailsDefault,
    setPaymentDetail,
    setObjectSelected,
    setEditable,
} = inject("diy");

watchEffect(async () => {
    try {
        await getPaymentDetailsByPaymentId(state.payments?.[0]?.PaymentId);
    } catch (error) {
        console.log(error);
    }
});

/**
 * Hàm tính tổng tiền tất cả các phiếu chi
 * @param {*} payments - danh sách các phiếu chi
 * Created by: NHGiang - (24/03/23)
 */
const CaculateTotalPayment = (payments) => {
    try {
        totalPayment.value = payments?.reduce((result, cur) => {
            try {
                result += cur.TotalAmount;
                return result;
            } catch (error) {
                console.log(error);
            }
        }, 0);
    } catch (error) {
        console.log(error);
    }
};

watchEffect(() => {
    try {
        CaculateTotalPayment(state.listAllEntities);
    } catch (error) {
        console.log(error);
    }
});

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
        setObjectSelected({});
        await getNewRefNo();
        setIdentityForm(MISA_ENUM.FORM_MODE.ADD);
        handleSetStatusForm();
        router.push("/pay/pay-detail");
        setPaymentDetailsDefault();
        setPaymentDetail({
            PaymentId: "",
            ObjectId: "",
            ObjectCode: "",
            ObjectName: "",
            Amount: 0,
            DebitAccount: "",
            DebitAccountName: "",
            CreditAccount: "",
            CreditAccountName: "",
            Description: "",
        });
        setEditable(false);
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
        router.push({
            path: "/cash/pay",
            query: { pageSize: pageSize.value, pageNumber: MISA_ENUM.PAGENUMBER_DEFAULT },
        });
        await getPaymentsByFilter(value, pageSize.value, MISA_ENUM.PAGENUMBER_DEFAULT);
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

/**
 * hàm xử lý nếu chọn nhiều hơn 1 phiếu chi mới enable chức năng xóa nhiều phiếu chi
 * Created by: NHGiang - (25/03/23)
 */
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

/**
 * Hàm xử lý ẩn hiện phần UI detail
 * Created by: NHGiang - (25/03/23)
 */
const handleHideDetail = () => {
    try {
        if (heightMaster.value === MISA_ENUM.HEIGHT_PAYMENT_CONTENT) {
            heightMaster.value = MISA_ENUM.HEIGHT_PAYMENT_MASTER;
        } else {
            heightMaster.value = MISA_ENUM.HEIGHT_PAYMENT_CONTENT;
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm xử lỹ phím tắt
 * @param {*} e
 * Created by: NHGiang - (24/02/23)
 */
const docKeyDown = (e) => {
    // Mở form với phím tắt ctrl + 1
    if (e.ctrlKey && e.key === "1") {
        e.preventDefault();
        e.stopPropagation();
        handleShowPaymentDetail();
    }
};

/**
 * Hàm thêm event keydown
 * Created by: NHGiang - (24/02/23)
 */
onMounted(() => {
    document.addEventListener("keydown", docKeyDown, false);
});

/**
 * Hàm xử lý remove event
 * Created by: NHGiang - (24/02/23)
 */
onUnmounted(() => {
    document.removeEventListener("keydown", docKeyDown);
});
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
            <m-pagination
                path="/cash/pay"
                :func-filter="getPaymentsByFilter"
                :total-page="state.totalPageValue"
                :total-record="state.totalEntities"
            />
        </vue-resizable>
        <div class="detail-payment" :style="{ height: heightDetail + 'px' }">
            <div class="detail-payment__title">Chi tiết</div>
            <m-table-detail
                :columns="MISA_RESOURCE.COLUMNS_NAME_PAYMENT_DETAIL"
                :entities="state.paymentDetails"
            />
            <div class="detail-payment__paging">
                <m-pagination
                    :total-page="state.totalPagePaymentDetail"
                    :total-record="state.totalRecordPaymentDetail"
                    :func-filter="getPaymentDetailsByPaymentId"
                    :keyword="state.paymentIdFilter"
                />
            </div>
            <div class="collapse-btn" @click="handleHideDetail">
                <div
                    class="collapse-btn__icon"
                    :style="{
                        transform: `${
                            heightMaster === MISA_ENUM.HEIGHT_PAYMENT_CONTENT
                                ? 'rotate(180deg)'
                                : 'rotate(0deg)'
                        }`,
                    }"
                ></div>
            </div>
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
    align-items: center;
    cursor: pointer;
    display: none;
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

.collapse-btn {
    position: absolute;
    left: calc(50% - 30px);
    top: -13px;
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
.collapse-btn__icon {
    background: url("../../src/assets/img/Sprites.svg") no-repeat -564px -365px;
    width: 8px;
    height: 5px;
}
</style>
