<script setup>
import MInput from "./MInput.vue";
import MCheckbox from "./MCheckbox.vue";
import MTrackDetail from "./MTrackDetail.vue";
import { MISA_RESOURCE, ACCOUNT_TRACK } from "../base/resource";
import { ref, reactive, inject, onMounted, onUnmounted } from "vue";
import { useAccount } from "../composable/useAccount";
import { MISA_ENUM } from "../base/enum";
import { error } from "../utilities/validateForm";
import MToast from "../components/MToast.vue";
import MPopUpInfo from "./MPopUpInfo.vue";
import MPopUpError from "./MPopUpError.vue";
import { useValidate } from "../utilities/validateForm";

const { state, setIsForm } = inject("diy");

const { getAccounts, addAccount, getAccountsByFilter, editAccount } = useAccount();
getAccounts();

const isOpenError = ref(false); // trạng thái đóng mở popup error khi có lỗi xảy ra
const refCancelBtn = ref(null); // ref của button Hủy
const refSaveAndAddBtn = ref(null); // ref của button cất và thêm
const refAccountNumber = ref(null); // ref của ô input số tài khoản
const isShowNote = ref(false); // Trạng thái Đóng Mở thông báo dữ liệu form đã thay
const isShowTrackDetail = ref(true); // Trạng thái Đóng/Mở của theo dõi chi tiết
const isResize = ref(false); // Trạng thái Mở rộng/ Thu gọn
const account = reactive({
    ParentId: state.entitySelected?.ParentId || "00000000-0000-0000-0000-000000000000",
    AccountNumber: state.entitySelected?.AccountNumber || "",
    AccountName: state.entitySelected?.AccountName || "",
    EnglishName: state.entitySelected?.EnglishName || "",
    Type: state.entitySelected?.Type || 1,
    TypeName: MISA_RESOURCE.ACCOUNT_NATURE[1].optionName,
    Description: state.entitySelected?.Description || "",
    HasForeignCurrencyAccounting: state.entitySelected?.HasForeignCurrencyAccounting || false,
    IsActive: state.entitySelected?.IsActive || true,
    IsParent: state.entitySelected?.IsParent || false,
    IsTrackObject: state.entitySelected?.IsTrackObject || false,
    IsTrackJob: state.entitySelected?.IsTrackJob || false,
    IsTrackOrder: state.entitySelected?.IsTrackOrder || false,
    IsTrackPurchaseContract: state.entitySelected?.IsTrackPurchaseContract || false,
    IsTrackOrganizationUnit: state.entitySelected?.IsTrackOrganizationUnit || false,
    IsTrackBankAccount: state.entitySelected?.IsTrackBankAccount || false,
    IsTrackProjectWork: state.entitySelected?.IsTrackProjectWork || false,
    IsTrackSaleContract: state.entitySelected?.IsTrackSaleContract || false,
    IsTrackExpenseItem: state.entitySelected?.IsTrackExpenseItem || false,
    IsTrackItem: state.entitySelected?.IsTrackItem || false,
    Object: state.entitySelected?.Object || 1,
    Job:
        state.entitySelected?.Job === 0
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    Order:
        state.entitySelected?.Order === 0
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    PurchaseContract:
        state.entitySelected?.PurchaseContract === 0
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    OrganizationUnit:
        state.entitySelected?.OrganizationUnit === 0
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    BankAccount:
        state.entitySelected?.BankAccount === 0
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    ProjectWork:
        state.entitySelected?.ProjectWork === 0
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    SaleContract:
        state.entitySelected?.SaleContract === 0
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    ExpenseItem:
        state.entitySelected?.ExpenseItem === 0
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    Item:
        state.entitySelected?.Item === 0
            ? MISA_RESOURCE.TRACK_TYPE[0].optionId
            : MISA_RESOURCE.TRACK_TYPE[1].optionId,
    Grade: state.entitySelected?.Grade || 1,
});

/**
 * Hàm xử lý submit form
 */
const handleSubmit = async () => {
    try {
        const status = useValidate({ account });
        const { TypeName, ...accountRest } = account;

        if (!status) {
            // xử lý thêm tài khoản
            if (
                state.identityForm === MISA_ENUM.FORM_MODE.ADD ||
                state.identityForm === MISA_ENUM.FORM_MODE.DUPLICATE
            ) {
                await addAccount(accountRest)
                    .then(async () => {
                        await getAccountsByFilter();
                    })
                    .catch((isOpenError.value = true));
            }

            if (state.identityForm === MISA_ENUM.FORM_MODE.EDIT) {
                await editAccount(accountRest, state.entitySelected.AccountId)
                    .then(async () => {
                        await getAccountsByFilter();
                    })
                    .catch((isOpenError.value = true));
            }
        } else {
            isOpenError.value = true;
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm xử lý binding dữ liệu khi enable ô input để thêm tiêu chí theo dõi
 * @param {*} event
 * Created by: NHGiang - (11/03/23)
 */
const handleChecked = (event) => {
    try {
        if (event.identity) {
            account[`IsTrack${event.identity}`] = event.isChecked;
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lấy ra giá trị khi chọn các lựa chọn muốn theo dõi
 * @param {*} event
 * Created by: NHGiang - (11/03/23)
 */
const handleSelected = (event) => {
    try {
        if (event.identity) {
            account[`${event.identity}`] = event.option.optionId;
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm thực hiện đóng form khi nhấn nút close(x)
 * Created by: NHGiang - (14/03/23)
 */
const handleCloseForm = () => {
    try {
        let accountToCompare = {};
        if (state.identityForm === MISA_ENUM.FORM_MODE.ADD) {
            accountToCompare = {
                ParentId: "00000000-0000-0000-0000-000000000000",
                AccountNumber: "",
                AccountName: "",
                EnglishName: "",
                Type: 1,
                Description: "",
                HasForeignCurrencyAccounting: false,
                IsActive: true,
                IsParent: false,
                IsTrackObject: false,
                IsTrackJob: false,
                IsTrackOrder: false,
                IsTrackPurchaseContract: false,
                IsTrackOrganizationUnit: false,
                IsTrackBankAccount: false,
                IsTrackProjectWork: false,
                IsTrackSaleContract: false,
                IsTrackExpenseItem: false,
                IsTrackItem: false,
                Object: 1,
                Job: 1,
                Order: 1,
                PurchaseContract: 1,
                OrganizationUnit: 1,
                BankAccount: 1,
                ProjectWork: 1,
                SaleContract: 1,
                ExpenseItem: 1,
                Item: 1,
                Grade: 1,
            };
        }

        if (
            state.identityForm === MISA_ENUM.FORM_MODE.EDIT ||
            state.identityForm === MISA_ENUM.FORM_MODE.DUPLICATE
        ) {
            const { CreatedDate, ModifiedDate, CreatedBy, ModifiedBy, AccountId, Active, ...rest } =
                state.entitySelected;
            accountToCompare = rest;
        }

        if (JSON.stringify(accountToCompare) !== JSON.stringify(account)) {
            isShowNote.value = true;
        } else {
            setIsForm();
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
        refAccountNumber.value.handleFocus();
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
            refAccountNumber.value.handleFocus();
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
            refCancelBtn.value.focus();
        }
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="overlay-form">
        <div :class="{ 'account-form': true, 'account-form--extend': isResize }">
            <div class="modal__header">
                <div class="modal__header-left">
                    <div class="modal__header-left-text">{{ state.titleForm }}</div>
                </div>
                <div class="modal__header-right">
                    <div class="modal__close-btn" @click="handleCloseForm">
                        <label
                            for="show-modal"
                            :style="{
                                background:
                                    'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -147px -147px',
                                width: '18px',
                                height: '18px',
                                cursor: 'pointer',
                            }"
                        ></label>
                    </div>
                </div>
            </div>
            <div class="account-main">
                <div class="row">
                    <m-input
                        ref="refAccountNumber"
                        field-text="Số tài khoản"
                        required
                        width="25%"
                        bottom="12px"
                        full-width
                        :value="account.AccountNumber"
                        :status="error.AccountNumber.status"
                        :statusPublic="error.status"
                        :text-error="error.AccountNumber.textError"
                        @inputValue="account.AccountNumber = $event"
                        @keydown="handleSetReverseTabindex"
                    />
                </div>
                <div class="row">
                    <m-input
                        field-text="Tên tài khoản"
                        required
                        width="100%"
                        bottom="12px"
                        full-width
                        :value="account.AccountName"
                        :status="error.AccountName.status"
                        :statusPublic="error.status"
                        :text-error="error.AccountName.textError"
                        @inputValue="account.AccountName = $event"
                    />
                    <m-input
                        field-text="Tên tiếng anh"
                        width="100%"
                        bottom="12px"
                        full-width
                        style="margin-left: 8px"
                        :value="account.EnglishName"
                        @inputValue="account.EnglishName = $event"
                    />
                </div>
                <div class="row">
                    <div class="checkbox-wrapper" style="width: 25%; margin-right: 8px">
                        <m-checkbox
                            text-label="Tài khoản tổng hợp"
                            width="100%"
                            bottom="12px"
                            :options="state.listAllEntities"
                            :isTable="true"
                            :columns="MISA_RESOURCE.COLUMNS_NAME_COMBOBOX_ACCOUNT"
                            :default="account.ParentId"
                            @select="
                                account.ParentId = $event.optionId;
                                account.Grade = $event.optionGrade + 1;
                            "
                        />
                    </div>
                    <div class="checkbox-wrapper" style="width: 25%">
                        <m-checkbox
                            text-label="Tính chất"
                            required=""
                            width="100%"
                            bottom="12px"
                            :default="account.Type"
                            :options="MISA_RESOURCE.ACCOUNT_NATURE"
                            :isTable="false"
                            :status="error.Type.status"
                            :statusPublic="error.status"
                            :text-error="error.Type.textError"
                            @select="
                                account.Type = $event.optionId;
                                account.TypeName = $event.optionName;
                            "
                        />
                    </div>
                </div>
                <div class="row" style="width: 100%">
                    <div class="textarea-wrapper">
                        <label class="textfield__label modal-label"> Diễn giải</label>
                        <textarea
                            class="account-form__textarea"
                            :value="account.Description"
                            @change="account.Description = $event.target.value"
                        ></textarea>
                    </div>
                </div>
                <div class="row">
                    <label
                        for="accounting"
                        class="modal__header-left-wrapper account-checkbox"
                        tabindex="0"
                    >
                        <input
                            type="checkbox"
                            id="accounting"
                            :checked="account.HasForeignCurrencyAccounting"
                            @change="
                                account.HasForeignCurrencyAccounting =
                                    !account.HasForeignCurrencyAccounting
                            "
                        />
                        <div class="check-icon"></div>
                    </label>
                    <span>Có hạch toán ngoại tệ</span>
                </div>
            </div>
            <div class="account-track-detail">
                <div
                    class="row account-track__title"
                    @click="isShowTrackDetail = !isShowTrackDetail"
                >
                    <div class="m-icon">
                        <div
                            class="account-track-detail__icon"
                            :style="{
                                transform: !isShowTrackDetail ? 'rotate(90deg)' : 'rotate(0deg)',
                            }"
                        ></div>
                    </div>
                    Theo dõi chi tiết theo
                </div>
                <div class="track-detail" :style="{ height: !isShowTrackDetail ? '0' : '300px' }">
                    <m-track-detail
                        v-for="(item, index) in ACCOUNT_TRACK"
                        :key="index"
                        :standard="item"
                        :index="index"
                        @select="handleSelected"
                        @onCheckInput="handleChecked"
                        :checked="account[`IsTrack${item.identity}`]"
                        :selected="account[`${item.identity}`]"
                    />
                </div>
            </div>
            <div class="modal-footer account-form__footer">
                <div class="modal-footer__wrapper">
                    <button
                        type="submit"
                        class="btn btn-secondary modal-btn__secondary btn-save"
                        tabindex="0"
                        @click="handleSubmit"
                    >
                        Cất
                    </button>
                    <button
                        class="btn btn-primary btn-save-add"
                        tabindex="0"
                        ref="refSaveAndAddBtn"
                    >
                        Cất và thêm
                    </button>
                </div>
                <label
                    for="show-modal"
                    class="btn btn-secondary modal-btn-cancel"
                    tabindex="0"
                    ref="refCancelBtn"
                    @click="setIsForm()"
                    @keydown="handleSetTabindex"
                    >Hủy</label
                >
            </div>

            <div class="account-form__resize" @click="isResize = !isResize">
                <div class="form-resize__icon"></div>
            </div>
        </div>
        <div class="toast-account">
            <m-toast
                v-if="state.listToast.length"
                v-for="(toast, index) in state.listToast"
                :key="index"
                :toastMessage="toast.toastMessage"
                :statusMessage="toast.statusMessage"
                :status="toast.status"
            />
        </div>
        <div class="modal-error" v-if="isShowNote">
            <m-pop-up-info
                :title="'Thông báo'"
                text-info="Dữ liệu đã bị thay đổi. Bạn có muốn cất không?"
                @closeInfo="isShowNote = !isShowNote"
                @closeForm="setIsForm()"
                @submitForm="
                    handleSubmit();
                    isShowNote = !isShowNote;
                "
            />
        </div>
        <div class="modal-error" v-if="isOpenError">
            <m-pop-up-error
                :title="'Lỗi'"
                :text-error="
                    error.AccountName.textError ||
                    error.AccountNumber.textError ||
                    error.Type.textError
                "
                @closeError="isOpenError = !isOpenError"
            />
        </div>
    </div>
</template>

<style>
.textarea-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.account-form__textarea {
    resize: none;
    border-radius: 3px;
    border: 1px solid #babec5;
    font-family: inherit;
    display: block;
    padding: 9px;
    color: #000;
    font-size: 13px;
    width: 100%;
    height: 100%;
    border: 1px solid var(--border-color);
    outline: none;
    margin-bottom: 12px;
}

.account-form__textarea:focus {
    border: 1px solid var(--primary-color);
}

.account-form__textarea:hover {
    background-color: #f6f6f6;
}

.track-text {
    line-height: 28px;
}

.toast-account {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
}
</style>
