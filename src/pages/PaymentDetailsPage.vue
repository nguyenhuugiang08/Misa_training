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
import { inject, reactive, onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { MISA_ENUM } from "../base/enum";
import { error, useValidate, paymentDetailErrors } from "../utilities/validateForm";
import MToast from "../components/MToast.vue";
import MPopUpError from "../components/MPopUpError.vue";
import { usePaymentDeatil } from "../composable/usePaymentDetail";

const {
    state,
    setObjectSelected,
    addPaymentDetails,
    setTotalPayment,
    deletePaymentDetails,
    setPaymentDetailDefault,
    setPaymentDetailsDefault,
    setIndexRowEditable,
    setIdentityForm,
    setIsEditButton,
    setIsClickRow,
    setEditable,
    setEmptyPaymentDetails,
} = inject("diy");
const router = useRouter();
const refTableDetail = ref(null); // Tham chiếu tới bảng detail
const today = ref(null); // lấy ra ngày hiện tại
const isOpenError = ref(false); // trạng thái đóng mở của popup hiển thị khi có lỗi xả ra
const paymentDetailTextErrors = ref([]); // mảng lưu text lỗi của UI detail
const isOpenPopupConstruction = ref(false); // trạng thái đóng/ mở của popup thông báo chức năng đang thi công
const refObjectCode = ref(null); // tham chiếu tới ô combobox mã đối tượng
const actionSelected = ref(0); // lưu lại hành động nguwfoi dùng vừa thực hiện (Cất và thêm hoặc Cất và đóng)
const paymentIdAdded = ref(null); // ID của phiếu chi vừa được thêm vào DB
const paymentDetailIds = ref([]); // danh sách ID của các chi tiết phiếu chi vừa được thêm vào DB
const refCancelBtn = ref(null); // tham chiếu tới button Hủy
const refSaveAndAddBtn = ref(null); // Tham chiếu tới button cất

onMounted(() => {
    try {
        today.value = new Date();
        if (refObjectCode.value) {
            refObjectCode.value.handleFocusCombobox();
        }
    } catch (error) {
        console.log(error);
    }
});

const { addPayment, getPaymentsByFilter, editPayement, getNewRefNo } = usePayment();
const { insertPaymentDetails, editPaymentDetailsByPaymentId } = usePaymentDeatil();

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
    TotalAmount: state.totalPayment || 0,
});

watchEffect(() => {
    try {
        if (
            state.identityForm === MISA_ENUM.FORM_MODE.ADD ||
            state.identityForm === MISA_ENUM.FORM_MODE.DUPLICATE
        )
            payment.RefNo = state.newRefNo;
    } catch (error) {
        console.log(error);
    }
});

watch(
    () => payment.ObjectName,
    (newValue) => {
        try {
            const objectNames = state.objects.map((object) => object.optionName);

            if (objectNames.includes(newValue)) {
                const arrayString = payment.Reason.split(MISA_RESOURCE.REASON_PAYMENT_DEFAULT);
                if (objectNames.includes(arrayString[1])) {
                    payment.Reason = `${MISA_RESOURCE.REASON_PAYMENT_DEFAULT}${newValue}`;
                }
            } else {
                payment.Reason = `${MISA_RESOURCE.REASON_PAYMENT_DEFAULT}${newValue}`;
            }
        } catch (error) {
            console.log(error);
        }
    }
);

const { getObjects } = useObject();
getObjects();

const { getAllEmployees } = useEmployee();
getAllEmployees();

watchEffect(() => {
    try {
        if (localStorage.getItem("actionSelected")) {
            actionSelected.value = localStorage.getItem("actionSelected");
        }
    } catch (error) {
        console.log(error);
    }
});

/**
 * Hàm đóng form chi tiết phiếu chi
 * Created by: NHGiang - (16/03/23)
 */
const handleCloseForm = async () => {
    try {
        router.go(-1);
        setIsClickRow(false);
        setIsEditButton(false);
        setIndexRowEditable(0);
        await setPaymentDetailsDefault();
        setObjectSelected({});
        setPaymentDetailDefault();
    } catch (error) {
        console.log(error);
    }
};

/**
 * Thay đổi tổng tiền phiếu chi
 * Created by: NHGiang - (24/03/23)
 */
watch(
    () => state.totalPayment,
    (newValue) => {
        try {
            payment.TotalAmount = newValue;
        } catch (error) {
            console.log(error);
        }
    }
);

/**
 * Hàm xử lý submit
 * Created by: NHGiang - (16/03/23)
 */
const handleSubmit = async (identityButton) => {
    try {
        const paymentDetails = state.paymentDetails;
        const status = useValidate({ payment, paymentDetails });

        // xử lý lấy ra mảng error phần detail UI
        paymentDetailTextErrors.value = [];
        paymentDetailErrors?.forEach((error) => {
            if (error.DebitAccount.textError)
                paymentDetailTextErrors.value.push(error.DebitAccount.textError);
            if (error.CreditAccount.textError)
                paymentDetailTextErrors.value.push(error.CreditAccount.textError);
        });

        if (!status) {
            // xử lý thêm tài khoản
            if (
                state.identityForm === MISA_ENUM.FORM_MODE.ADD ||
                state.identityForm === MISA_ENUM.FORM_MODE.DUPLICATE
            ) {
                // thực hiện thêm hoặc nhân bản phiếu chi
                handleAddPayment(identityButton);
            }

            if (state.identityForm === MISA_ENUM.FORM_MODE.EDIT) {
                //thực hiện sửa thông tin phiếu chi
                handleEditPayment(identityButton);
            }
        } else {
            isOpenError.value = true;
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm xử lý thêm phiếu chi
 * Created by: NHGiang - (25/03/23)
 */
const handleAddPayment = async (identityButton) => {
    try {
        if (state.identityForm === MISA_ENUM.FORM_MODE.DUPLICATE) {
            payment.RefDate = new Date(payment.RefDate);
            payment.PostedDate = new Date(payment.PostedDate);
        }
        payment.RefDate.setHours(payment.RefDate.getHours() + MISA_ENUM.TIMEZONE_DIFFERENCE);
        payment.PostedDate.setHours(payment.PostedDate.getHours() + MISA_ENUM.TIMEZONE_DIFFERENCE);
        await addPayment(payment)
            .then(async (data) => {
                if (data) {
                    paymentIdAdded.value = data;
                    // xử lý thêm danh sách phiếu chi chi tiết theo ID của phiếu chi vừa được thêm
                    const paymentDetails = state.paymentDetails?.map((element) => {
                        return { ...element, PaymentId: data };
                    });
                    const ids = await insertPaymentDetails(paymentDetails);
                    paymentDetailIds.value = [...ids];
                    await getPaymentsByFilter();
                    if (identityButton === MISA_ENUM.STATUS_SAVE_PAYMENT.SAVE) {
                        isOpenError.value = false;
                        setIndexRowEditable(-1);
                        setIsClickRow(true);
                        setIsEditButton(true);
                        setEditable(true);
                    }

                    if (identityButton === MISA_ENUM.STATUS_SAVE_PAYMENT.SAVE_CLOSE) {
                        handleCloseForm();
                    }

                    if (identityButton === MISA_ENUM.STATUS_SAVE_PAYMENT.SAVE_ADD) {
                        await getNewRefNo();
                        payment.Address = "";
                        payment.Attachment = "";
                        payment.EmployeeId = MISA_RESOURCE.GUID_EMPTY;
                        payment.ObjectCode = "";
                        payment.ObjectId = MISA_RESOURCE.GUID_EMPTY;
                        payment.ObjectName = "";
                        payment.PostedDate = new Date();
                        payment.Reason = MISA_RESOURCE.REASON_PAYMENT_DEFAULT;
                        payment.ReasonType = 6;
                        payment.Receiver = "";
                        payment.RefDate = new Date();
                        payment.RefNo = state.newRefNo;
                        payment.TotalAmount = 0;

                        await setPaymentDetailsDefault();
                        setObjectSelected({});
                        setPaymentDetailDefault();
                        isOpenError.value = false;
                    }
                }
            })
            .catch((isOpenError.value = true));
    } catch (error) {
        console.log(error);
    }
};

/**
 * hàm xử lý sửa phiếu chi theo ID
 * Created by: NHGiang - (25/03/23)
 */
const handleEditPayment = async (identityButton) => {
    try {
        payment.RefDate = new Date(payment.RefDate);
        payment.PostedDate = new Date(payment.PostedDate);
        payment.RefDate.setHours(payment.RefDate.getHours() + MISA_ENUM.TIMEZONE_DIFFERENCE);
        payment.PostedDate.setHours(payment.PostedDate.getHours() + MISA_ENUM.TIMEZONE_DIFFERENCE);
        await editPayement(payment, paymentIdAdded.value || state.entitySelected.PaymentId)
            .then(async (data) => {
                if (data) {
                    if (paymentDetailIds.value.length > 0) {
                        const paymentDetails = state.paymentDetails.map((paymentDetail, index) => {
                            return {
                                ...paymentDetail,
                                PaymentDetailId: paymentDetailIds.value[index],
                            };
                        });
                        await editPaymentDetailsByPaymentId(paymentDetails);
                    } else {
                        await editPaymentDetailsByPaymentId(state.paymentDetails);
                    }
                    await getPaymentsByFilter();
                    isOpenError.value = false;

                    if (identityButton === MISA_ENUM.STATUS_SAVE_PAYMENT.SAVE) {
                        isOpenError.value = false;
                        setIndexRowEditable(-1);
                        setIsClickRow(true);
                        setIsEditButton(true);
                        setEditable(true);
                    }

                    if (identityButton === MISA_ENUM.STATUS_SAVE_PAYMENT.SAVE_CLOSE) {
                        handleCloseForm();
                    }

                    if (identityButton === MISA_ENUM.STATUS_SAVE_PAYMENT.SAVE_ADD) {
                    }
                }
            })
            .catch((isOpenError.value = true));
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
            refObjectCode.value.handleFocusCombobox();
        }
        if (e.shiftKey && e.keyCode === MISA_ENUM.KEY_CODE.TAB) {
            refSaveAndAddBtn.value.focus();
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
        if (!state.editable) handleSubmit(MISA_ENUM.STATUS_SAVE_PAYMENT.SAVE);
    }

    // Cất form và mở form thêm với phím tắt ctrl + shift + S
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        e.stopPropagation();
        if (!state.editable) handleSubmit(MISA_ENUM.STATUS_SAVE_PAYMENT.SAVE_ADD);
    }

    // Đóng form với phím tắt ESC
    if (e.keyCode === MISA_ENUM.KEY_CODE.ESCAPE) {
        handleCloseForm();
    }

    // Thêm dòng với phím ctrl + insert
    if (e.ctrlKey && e.keyCode === MISA_ENUM.KEY_CODE.INSERT) {
        handleAddRowDetail();
    }

    // xóa dòng với phím ctrl + delete
    if (e.ctrlKey && e.keyCode === MISA_ENUM.KEY_CODE.DELETE) {
        if (!state.editable) deletePaymentDetails(state.paymentDetails.length - 1);
        if (state.paymentDetails.length - 1 === -1) {
            setPaymentDetailDefault();
        }
    }

    // Cất và đóng với phím ctrl + Q
    if (e.ctrlKey && e.key.toLowerCase() === "q") {
        e.preventDefault();
        e.stopPropagation();
        if (!state.editable) handleSubmit(MISA_ENUM.STATUS_SAVE_PAYMENT.SAVE_CLOSE);
    }

    // sửa thông tin phiếu chi
    if (e.ctrlKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        e.stopPropagation();
        if (state.editable) handleChangeStatsForm();
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
const handleSetReverseTabindex = () => {
    try {
        refCancelBtn.value.focus();
    } catch (error) {
        console.log(error);
    }
};

/**
 * Thay đổi ngày phiếu chi khi ngày hạch toán thay đổi
 * Created by: NHGiang - (24/03/23)
 */
watch(
    () => payment.PostedDate,
    (newValue, oldValue) => {
        try {
            if (oldValue?.valueOf() === payment.RefDate?.valueOf() && newValue) {
                payment.RefDate = newValue;
            }

            if (oldValue === null) {
                payment.RefDate = newValue;
            }
        } catch (error) {
            console.log(error);
        }
    }
);

/**
 * Hàm xử lý thêm dòng UI detail
 * Created by: NHGiang - (21/03/23)
 */
const handleAddRowDetail = () => {
    try {
        const totalPaymentDetail = state.paymentDetails.length;
        const newPaymentDetail = {
            ...state.paymentDetails[totalPaymentDetail - 1],
            PaymentDetailId: MISA_RESOURCE.GUID_EMPTY,
        };
        if (!state.editable) addPaymentDetails(newPaymentDetail);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm tính tổng phiếu chi
 * Created by: NHGiang - (25/03/23)
 */
watchEffect(() => {
    try {
        const totalPayment = state.paymentDetails?.reduce((result, cur) => {
            try {
                return result + cur.Amount;
            } catch (error) {
                console.log(error);
            }
        }, 0);
        setTotalPayment(totalPayment);
    } catch (error) {
        console.log(error);
    }
});

/**
 * Hàm đối trạng thái form thêm -> sửa
 * Created by: NHGiang - (26/03/23)
 */
const handleChangeStatsForm = () => {
    try {
        refObjectCode.value.handleFocusCombobox();
        setIdentityForm(MISA_ENUM.FORM_MODE.EDIT);
        setIndexRowEditable(0);
        setIsEditButton(false);
        setIsClickRow(false);
        setEditable(false);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm thực hiện xóa hết dòng
 * Created by: NHGiang - (29/03/23)
 */
const handleDeleteAllRows = () => {
    try {
        if (!state.editable) setEmptyPaymentDetails();
    } catch (error) {
        console.log(error);
    }
};
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
                        :disabled="state.editable"
                        has-display-data-disable
                        @select="payment.ReasonType = $event.optionId"
                    />
                </div>
            </div>
            <div class="payment-header__right">
                <div class="m-icon">
                    <div class="instruct-icon"></div>
                </div>
                <router-link to="/" class="instruct-link" tabindex="-1">Hướng dẫn</router-link>
                <div class="m-icon m-icon__second" @click="isOpenPopupConstruction = true">
                    <div class="setting-icon"></div>
                </div>
                <div class="m-icon m-icon__second" @click="isOpenPopupConstruction = true">
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
                            ref="refObjectCode"
                            text-label="Mã đối tượng"
                            width="424px"
                            :default="payment.ObjectId"
                            :options="state.objects.length && state.objects"
                            :isTable="true"
                            :columns="MISA_RESOURCE.COLUMNS_NAME_COMBOBOX_OBJECT"
                            bottom="8px"
                            has-display-data-disable
                            :disabled="state.editable"
                            :isShiftTab="true"
                            marginRight="12px"
                            @focusBtn="handleSetReverseTabindex"
                            @select="
                                payment.ObjectId = $event.optionId;
                                payment.ObjectName =
                                    $event.optionId !== -1 ? $event.optionName : '';
                                payment.Address = $event.optionAddress;
                                payment.Receiver = $event.optionId !== -1 ? $event.optionName : '';
                                payment.ObjectCode = $event.optionCode;
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
                        :disable="state.editable"
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
                        :disable="state.editable"
                        @inputValue="payment.Receiver = $event"
                    />
                    <m-input
                        field-text="Địa chỉ"
                        width="424px"
                        bottom="8px"
                        :value="payment.Address"
                        :disable="state.editable"
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
                    :disable="state.editable"
                />
                <div class="row">
                    <div class="checkbox-wrapper">
                        <m-checkbox
                            text-label="Nhân viên"
                            width="424px"
                            :default="payment.EmployeeId"
                            :options="state.employees.length && state.employees"
                            :isTable="true"
                            :columns="MISA_RESOURCE.COLUMNS_NAME_COMBOBOX_EMPLOYEE"
                            bottom="8px"
                            marginRight="12px"
                            has-display-data-disable
                            :disabled="state.editable"
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
                        :disable="state.editable"
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
                    :disable="state.editable"
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
                    :disable="state.editable"
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
                    :disable="state.editable"
                    :status="error.RefNo.status"
                    :statusPublic="error.status"
                    :text-error="error.RefNo.textError"
                    @inputValue="payment.RefNo = $event"
                    @changeValue="error.RefNo.status = $event"
                    :max-length="20"
                />
            </div>
            <div class="container-right">
                Tổng tiền
                <div class="payment-total">{{ formatMoney(state.totalPayment) }}</div>
            </div>
        </div>
        <div class="payment-detail">
            <div class="payment-detail-title">Hạch toán</div>
            <m-table-detail
                :entities="state.paymentDetails"
                :columns="MISA_RESOURCE.COLUMNS_NAME_TABLE_DETAIL"
                :has-column-delete="true"
                :reason="payment.Reason"
                :isEdit="!state.editable"
                ref="refTableDetail"
            />

            <div class="payment-action">
                <button
                    class="btn btn-secondary payment-action__btn btn-add-row"
                    @click="handleAddRowDetail"
                    :class="{
                        'btn-disable-payment': state.editable,
                    }"
                >
                    Thêm dòng
                </button>
                <button
                    class="btn btn-secondary payment-action__btn"
                    :class="{
                        'btn-disable-payment': state.editable,
                    }"
                    @click="handleDeleteAllRows"
                >
                    Xóa hết dòng
                </button>
            </div>
        </div>
        <div class="import-footer">
            <div class="footer-right">
                <MComboButton
                    :default="MISA_RESOURCE.BUTTON_ACTION_SAVE[actionSelected]?.optionName"
                    :options="MISA_RESOURCE.BUTTON_ACTION_SAVE"
                    @click-btn="handleSubmit($event)"
                />
                <button
                    ref="refSaveAndAddBtn"
                    v-if="!state.isEditButton"
                    type="submit"
                    class="btn btn-secondary payment-btn-save"
                    tabindex="0"
                    @click="handleSubmit(MISA_ENUM.STATUS_SAVE_PAYMENT.SAVE)"
                >
                    Cất
                </button>
                <button
                    ref="refSaveAndAddBtn"
                    v-if="state.isEditButton"
                    type="submit"
                    class="btn btn-secondary payment-btn-edit"
                    tabindex="0"
                    @click="handleChangeStatsForm"
                >
                    Sửa
                </button>
            </div>
            <button
                ref="refCancelBtn"
                class="btn btn-secondary btn-import-prev pay-cancel-btn"
                @click="handleCloseForm"
                @keydown.tab="handleSetTabindex"
            >
                Hủy
            </button>
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
        <div class="modal-error" v-if="error.status && isOpenError">
            <m-pop-up-error
                :title="'Lỗi'"
                :text-error="
                    error.RefDate.textError ||
                    error.RefNo.textError ||
                    error.PostedDate.textError ||
                    paymentDetailTextErrors?.[0] ||
                    error.PaymentDetails.textError
                "
                @closeError="isOpenError = !isOpenError"
            />
        </div>
        <div class="modal-error" v-if="isOpenPopupConstruction">
            <m-pop-up-error
                v-if="isOpenPopupConstruction"
                :title="'Thông báo'"
                :text-error="`Chức năng chưa thi công.`"
                @closeError="isOpenPopupConstruction = !isOpenPopupConstruction"
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

.payment-btn-edit {
    margin: 0 8px;
    color: #fff;
    background-color: transparent;
    border: 1px solid #8d9096;
}

.payment-btn-edit:hover {
    background-color: #2f3034;
}

.payment-btn-edit::after {
    content: "Cất (Ctrl + E)";
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

.payment-btn-edit:hover::after {
    display: block;
}

.pay-cancel-btn {
    height: 100%;
    display: flex;
    justify-content: center;
    color: #fff !important;
    align-items: center;
}

.close-icon::after {
    position: absolute;
    content: "Đóng (ESC)";
    display: block;
    background-color: #434242;
    color: #fff;
    top: 46px;
    right: 0;
    width: max-content;
    padding: 4px 8px;
    border-radius: 6px;
    display: none;
    opacity: 0;
    animation: identifier 0.3s ease-in;
}

.close-icon::before {
    content: "";
    position: absolute;
    display: block;
    height: 0;
    width: 0;
    border: 6px solid;
    border-color: transparent transparent #434242 transparent;
    top: 36px;
    display: none;
    opacity: 0;
    animation: identifier 0.3s ease-in;
}

.close-icon:hover::before {
    display: block;
    opacity: 1;
}

.close-icon:hover::after {
    display: block;
    opacity: 1;
}

.btn-add-row {
    position: relative;
}

.btn-add-row::before {
    position: absolute;
    content: "Ctrl + Insert";
    background-color: #434242 !important;
    color: #fff;
    top: 32px;
    width: max-content;
    padding: 0px 8px;
    border-radius: 4px;
    display: none;
    opacity: 0;
    animation: identifier 0.3s ease-in;
    font-weight: 400;
}

.btn-add-row:hover::before {
    display: block;
    opacity: 1;
}

.btn-disable-payment {
    border: 1px solid #8d9096;
    color: #afafaf;
    background: 0 0;
    cursor: default;
}

.btn-disable-payment:hover {
    background: 0 0;
}
</style>
