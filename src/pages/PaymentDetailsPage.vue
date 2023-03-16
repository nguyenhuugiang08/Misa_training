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
import { inject, reactive, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { formatDate } from "../utilities/formatDate";
import { MISA_ENUM } from "../base/enum";
import { useValidate } from "../utilities/validateForm";
import { convertDatetime } from "../utilities/convertDatetime";

const { state } = inject("diy");
const router = useRouter();
const editable = ref(false);
const refTableDetail = ref(null);

onMounted(() => {
    try {
        // console.log(refTableDetail.value.focusRowDetail());
    } catch (error) {
        console.log(error);
    }
});

const payment = reactive({
    Address: state.entitySelected?.Address || "",
    Attachment: state.entitySelected?.Attachment || "",
    EmployeeId: state.entitySelected?.EmployeeId || "",
    ObjectCode: state.entitySelected?.ObjectCode || "",
    ObjectId: state.entitySelected?.ObjectId || "",
    ObjectName: state.entitySelected?.ObjectName || "",
    PostedDate: state.entitySelected?.PostedDate
        ? formatDate(state.entitySelected?.PostedDate)
        : formatDate(new Date()),
    Reason: state.entitySelected?.Reason || "",
    ReasonType: state.entitySelected?.ReasonType || 6,
    Receiver: state.entitySelected?.Receiver || "",
    RefDate: state.entitySelected?.RefDate
        ? formatDate(state.entitySelected?.RefDate)
        : formatDate(new Date()),
    RefNo: state.entitySelected?.RefNo || "PC80044",
    TotalAmount: state.entitySelected?.TotalAmount || 0,
});

const { getObjects } = useObject();
getObjects();

const { getAllEmployees } = useEmployee();
getAllEmployees();

const { addPayment } = usePayment();

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
const handleSubmit = async () => {
    try {
        const status = useValidate({ payment });

        if (!status) {
            // xử lý thêm tài khoản
            if (
                state.identityForm === MISA_ENUM.FORM_MODE.ADD ||
                state.identityForm === MISA_ENUM.FORM_MODE.DUPLICATE
            ) {
                payment.RefDate = new Date(convertDatetime(payment.RefDate, true));
                payment.PostedDate = new Date(convertDatetime(payment.PostedDate, true));
                await addPayment(payment);
                // .then(async () => {
                //     await getAccountsByFilter();
                // })
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
            isOpenError.value = true;
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
            editable.value = true;
        }
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
                <div class="m-icon m-icon__second">
                    <div class="close-icon"></div>
                </div>
            </div>
        </div>
        <div class="payment-content">
            <div class="container-left">
                <div class="row">
                    <div class="checkbox-wrapper">
                        <m-checkbox
                            text-label="Mã đối tượng"
                            width="424px"
                            :options="state.objects"
                            :isTable="true"
                            :columns="MISA_RESOURCE.COLUMNS_NAME_COMBOBOX_OBJECT"
                            :default="payment.ObjectId"
                            bottom="8px"
                            marginRight="12px"
                            @select="
                                payment.ObjectId = $event.optionId;
                                payment.ObjectName = $event.optionName;
                                payment.Address = $event.optionAddress;
                                payment.Receiver = $event.optionName;
                            "
                        />
                    </div>
                    <m-input
                        field-text="Tên đối tượng"
                        width="424px"
                        bottom="8px"
                        :value="payment.ObjectName"
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
                        @inputValue="payment.Receiver = $event"
                    />
                    <m-input
                        field-text="Địa chỉ"
                        width="424px"
                        bottom="8px"
                        :value="payment.Address"
                        @inputValue="payment.Address = $event"
                    />
                </div>
                <m-input
                    field-text="Lý do chi"
                    width="860px"
                    bottom="8px"
                    :value="
                        state.entitySelected.Reason
                            ? payment.Reason
                            : `Chi tiền cho ${payment.ObjectName}`
                    "
                    @inputValue="payment.Reason = $event"
                />
                <div class="row">
                    <div class="checkbox-wrapper">
                        <m-checkbox
                            text-label="Nhân viên"
                            width="424px"
                            :options="state.employees"
                            :default="payment.EmployeeId"
                            :isTable="true"
                            :columns="MISA_RESOURCE.COLUMNS_NAME_COMBOBOX_EMPLOYEE"
                            bottom="8px"
                            marginRight="12px"
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
                    />
                    <div class="row-text">chứng từ gốc</div>
                </div>
                <div>Tham chiếu</div>
            </div>
            <div class="container-center">
                <m-date-field
                    field-text="Ngày hạch toán"
                    bottom="8px"
                    width="166px"
                    :value="payment.PostedDate"
                    @dateField="payment.PostedDate = $event"
                />
                <m-date-field
                    field-text="Ngày phiếu chi"
                    bottom="8px"
                    width="166px"
                    :value="payment.RefDate"
                    @dateField="payment.RefDate = $event"
                />
                <m-input
                    field-text="Số phiếu chi"
                    width="166px"
                    :value="payment.RefNo"
                    @keydown="handle"
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
                :entities="[1, 2, 3]"
                :columns="MISA_RESOURCE.COLUMNS_NAME_TABLE_DETAIL"
                :has-column-delete="true"
                isEdit
                :editable="editable"
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
                    @click="handleSubmit"
                >
                    Cất
                </button>
                <MComboButton
                    :default="MISA_RESOURCE.BUTTON_ACTION_SAVE[0].optionName"
                    :options="MISA_RESOURCE.BUTTON_ACTION_SAVE"
                />
            </div>
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
