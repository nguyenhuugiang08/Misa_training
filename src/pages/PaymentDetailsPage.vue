<script setup>
import { MISA_RESOURCE } from "../base/resource";
import MCheckbox from "../components/MCheckbox.vue";
import MInput from "../components/MInput.vue";
import MDateField from "../components/MDateField.vue";
import { formatMoney } from "../utilities/formatMoney";
import MTableDetail from "../components/MTableDetail.vue";
import MComboButton from "../components/MComboButton.vue";
import { useObject } from "../composable/useObject";
import { useEmployee } from "../composable/useEmployee";
import { usePayment } from "../composable/usePayment";
import { inject, reactive, onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { MISA_ENUM } from "../base/enum";
import { error, useValidate } from "../utilities/validateForm";
import MToast from "../components/MToast.vue";

const { state, setObjectSelected } = inject("diy");
const router = useRouter();
const refTableDetail = ref(null);
const disable = ref(false);
const today = ref(null);

onMounted(() => {
    try {
        today.value = new Date();
    } catch (error) {
        console.log(error);
    }
});

const payment = reactive({
    Address: state.entitySelected?.Address || "",
    Attachment: state.entitySelected?.Attachment || "",
    EmployeeId: state.entitySelected?.EmployeeId || MISA_RESOURCE.GUID_EMPTY,
    ObjectCode: state.entitySelected?.ObjectCode || "",
    ObjectId: state.entitySelected?.ObjectId || MISA_RESOURCE.GUID_EMPTY,
    ObjectName: state.entitySelected?.ObjectName || "",
    PostedDate: state.entitySelected?.PostedDate ? state.entitySelected?.PostedDate : new Date(),
    Reason: state.entitySelected?.Reason || MISA_RESOURCE.REASON_PAYMENT_DEFAULT,
    ReasonType: state.entitySelected?.ReasonType || 6,
    Receiver: state.entitySelected?.Receiver || "",
    RefDate: state.entitySelected?.RefDate ? state.entitySelected?.RefDate : new Date(),
    RefNo: state.entitySelected?.RefNo || "",
    TotalAmount: state.entitySelected?.TotalAmount || 0,
});

const paymentDetails = ref([
    {
        PaymentId: "",
        ObjectId: "",
        ObjectCode: state.objectSelected?.optionCode || "",
        ObjectName: state.objectSelected?.optionName || "",
        Amount: "",
        DebitAccount: "",
        CreditAccount: "",
        Description: "",
    },
]);

const { getObjects } = useObject();
getObjects();

const { getAllEmployees } = useEmployee();
getAllEmployees();

const { addPayment, getPaymentsByFilter } = usePayment();

/**
 * Hàm đóng form chi tiết phiếu chi
 * Created by: NHGiang - (16/03/23)
 */
const handleCloseForm = () => {
    try {
        router.go(-1);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm xử lý submit
 * Created by: NHGiang - (16/03/23)
 */
const handleSubmit = async (identityButton) => {
    try {
        const status = useValidate({ payment });

        if (!status) {
            // xử lý thêm tài khoản
            if (
                state.identityForm === MISA_ENUM.FORM_MODE.ADD ||
                state.identityForm === MISA_ENUM.FORM_MODE.DUPLICATE
            ) {
                await addPayment(payment).then(() => {
                    if (identityButton === MISA_ENUM.STATUS_SAVE_PAYMENT.SAVE) {
                        // disable.value = true;
                    }
                });
                // .catch((isOpenError.value = true));
            }

            if (state.identityForm === MISA_ENUM.FORM_MODE.EDIT) {
                await editAccount(accountRest, state.entitySelected.AccountId);
                // .then(async () => {
                //     await getAccountsByFilter();
                // })
                // .catch((isOpenError.value = true));
            }
        } else {
            // isOpenError.value = true;
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý focus input employee code
 * Created by: NHGiang - (20/02/23)
 */
onMounted(() => {
    try {
        // refAccountNumber.value.handleFocus();
    } catch (error) {
        console.log(error);
    }
});

/**
 * Xử lý set lại tabindex khi hết
 * @param {*} e event object
 * Created by: NHGiang - (20/02/23)
 */
const handleSetTabindex = (e) => {
    try {
        if (e.keyCode === MISA_ENUM.KEY_CODE.TAB) {
            e.preventDefault();
            // refAccountNumber.value.handleFocus();
        }
        if (e.shiftKey && e.keyCode === MISA_ENUM.KEY_CODE.TAB) {
            // refSaveAndAddBtn.value.focus();
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
    // Cất form với phím tắt ctrl + S
    if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
    }

    // Cất form và mở form thêm với phím tắt ctrl + shift + S
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
    }

    // Đóng form với phím tắt ESC
    if (e.keyCode === MISA_ENUM.KEY_CODE.ESCAPE) {
        handleCloseForm();
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

/**
 * Hàm set lại Tabindex khi nhấn Shift + Tab
 * Created by: NHGiang - (26/02/23)
 */
const handleSetReverseTabindex = (e) => {
    try {
        if (e.shiftKey && e.keyCode === MISA_ENUM.KEY_CODE.TAB) {
            e.preventDefault();
            // refCancelBtn.value.focus();
        }
    } catch (error) {
        console.log(error);
    }
};

const handle = (e) => {
    try {
        if (e.keyCode === MISA_ENUM.KEY_CODE.TAB) {
            e.preventDefault();
            refTableDetail.value.focusTableDetail();
        }
    } catch (error) {
        console.log(error);
    }
};

watch(
    () => payment.PostedDate,
    (newValue) => {
        try {
            payment.RefDate = newValue;
        } catch (error) {
            console.log(error);
        }
    }
);
</script>

<template>
    <div class="payment">
        <div class="payment-header">
            <div class="payment-header__left">
                <div class="m-icon">
                    <div class="payment-header__icon"></div>
                </div>
                <div class="payment-title">Phiếu chi {{ payment.RefNo }}</div>
                <div class="checkbox-wrapper">
                    <m-checkbox
                        :default="payment.ReasonType"
                        :options="MISA_RESOURCE.PAY_ACTIVE"
                        :width="'290px'"
                        :disabled="disable"
                        has-display-data-disable
                    />
                </div>
            </div>
            <div class="payment-header__right">
                <div class="m-icon">
                    <div class="instruct-icon"></div>
                </div>
                <router-link to="/" class="instruct-link">Hướng dẫn</router-link>
                <div class="m-icon m-icon__second">
                    <div class="setting-icon"></div>
                </div>
                <div class="m-icon m-icon__second">
                    <div class="help-icon"></div>
                </div>
                <div class="m-icon m-icon__second" @click="handleCloseForm">
                    <div class="close-icon"></div>
                </div>
            </div>
        </div>
        <div class="payment-content">
            <div class="container-left">
                <div class="row">
                    <div class="checkbox-wrapper">
                        <m-checkbox
                            v-if="state.objects.length"
                            text-label="Mã đối tượng"
                            width="424px"
                            :default="payment.ObjectId"
                            :options="state.objects"
                            :isTable="true"
                            :columns="MISA_RESOURCE.COLUMNS_NAME_COMBOBOX_OBJECT"
                            bottom="8px"
                            has-display-data-disable
                            :disabled="disable"
                            marginRight="12px"
                            @select="
                                payment.ObjectId = $event.optionId;
                                payment.ObjectName = $event.optionName;
                                payment.Address = $event.optionAddress;
                                payment.Receiver = $event.optionName;
                                setObjectSelected({
                                    optionId: $event.optionId,
                                    optionName: $event.optionName,
                                    optionCode: $event.optionCode,
                                });
                            "
                        />
                    </div>
                    <m-input
                        field-text="Tên đối tượng"
                        width="424px"
                        bottom="8px"
                        :value="payment.ObjectName"
                        :disable="disable"
                        @inputValue="payment.ObjectName = $event"
                    />
                </div>
                <div class="row">
                    <m-input
                        field-text="Người nhận"
                        width="424px"
                        bottom="8px"
                        margin-right="12px"
                        :value="payment.Receiver"
                        :disable="disable"
                        @inputValue="payment.Receiver = $event"
                    />
                    <m-input
                        field-text="Địa chỉ"
                        width="424px"
                        bottom="8px"
                        :value="payment.Address"
                        :disable="disable"
                        @inputValue="payment.Address = $event"
                    />
                </div>
                <m-input
                    field-text="Lý do chi"
                    width="860px"
                    bottom="8px"
                    :value="
                        payment.Reason !== MISA_RESOURCE.REASON_PAYMENT_DEFAULT
                            ? payment.Reason
                            : `Chi tiền cho ${payment.ObjectName}`
                    "
                    @inputValue="payment.Reason = $event"
                    :disable="disable"
                />
                <div class="row">
                    <div class="checkbox-wrapper">
                        <m-checkbox
                            v-if="state.employees.length"
                            text-label="Nhân viên"
                            width="424px"
                            :default="payment.EmployeeId"
                            :options="state.employees"
                            :isTable="true"
                            :columns="MISA_RESOURCE.COLUMNS_NAME_COMBOBOX_EMPLOYEE"
                            bottom="8px"
                            marginRight="12px"
                            has-display-data-disable
                            :disabled="disable"
                            @select="payment.EmployeeId = $event.optionId"
                        />
                    </div>
                    <m-input
                        field-text="Kèm theo"
                        :value="payment.Attachment"
                        @inputValue="payment.Attachment = $event"
                        width="106px"
                        bottom="8px"
                        place-holder="số lượng"
                        place-holder-align="right"
                        :only-number="true"
                        :disable="disable"
                    />
                    <div class="row-text">chứng từ gốc</div>
                </div>
                <div>Tham chiếu</div>
            </div>
            <div class="container-center">
                <m-date-field
                    id="postDate"
                    field-text="Ngày hạch toán"
                    bottom="8px"
                    width="166px"
                    :value="payment.PostedDate"
                    :disable="disable"
                    :status="error.PostedDate.status"
                    :textError="error.PostedDate.textError"
                    :statusPublic="error.status"
                    @dateField="payment.PostedDate = $event"
                    default
                />
                <m-date-field
                    id="refDate"
                    field-text="Ngày phiếu chi"
                    bottom="8px"
                    width="166px"
                    :disable="disable"
                    :value="payment.RefDate"
                    :status="error.RefDate.status"
                    :textError="error.RefDate.textError"
                    :statusPublic="error.status"
                    @dateField="payment.RefDate = $event"
                    default
                />
                <m-input
                    field-text="Số phiếu chi"
                    width="166px"
                    :value="payment.RefNo"
                    :disable="disable"
                    :status="error.RefNo.status"
                    :statusPublic="error.status"
                    :text-error="error.RefNo.textError"
                    @keydown="handle"
                    @inputValue="payment.RefNo = $event"
                />
            </div>
            <div class="container-right">
                Tổng tiền
                <div class="payment-total">{{ formatMoney(payment.TotalAmount) }}</div>
            </div>
        </div>
        <div class="payment-detail">
            <div class="payment-detail-title">Hạch toán</div>
            <m-table-detail
                :entities="[1]"
                :columns="MISA_RESOURCE.COLUMNS_NAME_TABLE_DETAIL"
                :has-column-delete="true"
                :reason="payment.Reason"
                isEdit
                ref="refTableDetail"
            />

            <div class="payment-action">
                <button class="btn btn-secondary payment-action__btn">Thêm dòng</button>
                <button class="btn btn-secondary payment-action__btn">Xóa hết dòng</button>
            </div>
        </div>
        <div class="import-footer">
            <button
                class="btn btn-secondary btn-import-prev pay-cancel-btn"
                @click="handleCloseForm"
            >
                Hủy
            </button>
            <div class="footer-right">
                <button
                    type="submit"
                    class="btn btn-secondary payment-btn-save"
                    tabindex="0"
                    @click="handleSubmit(MISA_ENUM.STATUS_SAVE_PAYMENT.SAVE)"
                >
                    Cất
                </button>
                <MComboButton
                    :default="MISA_RESOURCE.BUTTON_ACTION_SAVE[0].optionName"
                    :options="MISA_RESOURCE.BUTTON_ACTION_SAVE"
                />
            </div>
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
.payment-btn-save {
    margin: 0 8px;
    color: #fff;
    background-color: transparent;
    border: 1px solid #8d9096;
}

.payment-btn-save:hover {
    background-color: #2f3034;
}

.payment-btn-save::after {
    content: "Cất (Ctrl + S)";
    position: absolute;
    background-color: #434242;
    color: #fff;
    top: -30px;
    width: max-content;
    padding: 4px 8px;
    border-radius: 4px;
    display: none;
    line-height: 18px;
    animation: identifier 0.3s ease-in;
}

.payment-btn-save:hover::after {
    display: block;
}

.pay-cancel-btn {
    height: 100%;
    display: flex;
    justify-content: center;
    color: #fff !important;
    align-items: center;
}
</style>
