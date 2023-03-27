<script setup>
import MInput from "./MInput.vue";
import MCheckbox from "./MCheckbox.vue";
import MInputMoney from "./MInputMoney.vue";
import { ref, reactive, inject, watch, watchEffect } from "vue";
import { MISA_RESOURCE } from "../base/resource";
import { useAccount } from "../composable/useAccount";
import { formatMoney } from "../utilities/formatMoney";
import { paymentDetailErrors, error } from "../utilities/validateForm";

const props = defineProps({
    numericalOrder: Number,
    entity: Object,
    hasColumnDelete: Boolean,
    isEdit: Boolean,
    reason: String,
    index: Number,
});

const {
    state,
    setPaymentDetail,
    setPaymentDetailsByIndex,
    setIndexRowEditable,
    deletePaymentDetails,
    setDisableFiledRow,
    setDisableFiledRowDefault,
} = inject("diy");

const { getAccounts } = useAccount();
if (props.isEdit) {
    getAccounts();
}

const refRowDetail = ref(null);
const paymentDetail = reactive({
    PaymentDetailId: state.paymentDetails[props.index]?.PaymentDetailId || MISA_RESOURCE.GUID_EMPTY,
    PaymentId: state.paymentDetails[props.index]?.PaymentId || MISA_RESOURCE.GUID_EMPTY,
    ObjectId:
        state.paymentDetails[props.index]?.ObjectId ||
        state.objectSelected?.optionId ||
        MISA_RESOURCE.GUID_EMPTY,
    ObjectCode:
        state.paymentDetails[props.index]?.ObjectCode || state.objectSelected?.optionCode || "",
    ObjectName:
        state.paymentDetails[props.index]?.ObjectName || state.objectSelected?.optionName || "",
    Amount: state.paymentDetails[props.index]?.Amount || 0,
    DebitAccount: state.paymentDetails[props.index]?.DebitAccount || MISA_RESOURCE.GUID_EMPTY,
    DebitAccountName: state.paymentDetails[props.index]?.DebitAccountName || "",
    CreditAccount: state.paymentDetails[props.index]?.CreditAccount || MISA_RESOURCE.GUID_EMPTY,
    CreditAccountName: state.paymentDetails[props.index]?.CreditAccountName || "",
    Description: props.reason || MISA_RESOURCE.REASON_PAYMENT_DEFAULT,
});

watchEffect(() => {
    try {
        if (state.editable) {
            const disableFields = ["objectCode", "amount", "debitAccount", "creditAccount"];
            setDisableFiledRow(disableFields, true);
        } else {
            setDisableFiledRowDefault();
        }
    } catch (error) {
        console.log(error);
    }
});

/**
 * Hàm xử lý focus Table detail
 * Created by: NHGiang - (21/03/23)
 */
const handleFocus = () => {
    try {
        if (refRowDetail.value) {
            refRowDetail.value.handleFocusInput();
        }
    } catch (error) {
        console.log(error);
    }
};

watch(
    () => state.objectSelected,
    (newValue) => {
        try {
            paymentDetail.ObjectId = newValue.optionId;
            paymentDetail.ObjectName = newValue.optionName;
            paymentDetail.ObjectCode = newValue.optionCode;
        } catch (error) {
            console.log(error);
        }
    }
);
watch(
    () => props.reason,
    (newValue) => {
        paymentDetail.Description = newValue;
    }
);

watch(
    () => JSON.stringify(paymentDetail),
    () => {
        setPaymentDetail(paymentDetail);
        setPaymentDetailsByIndex(state.paymentDetail, props.index);
    }
);
defineExpose({ handleFocus });
</script>

<template>
    <tr
        class="tbl-row"
        @click="isEdit && !state.isClickRow && setIndexRowEditable(index)"
        :style="{
            background:
                isEdit && state.indexRowEditable === index ? 'var(--table-bg-color)' : '#fff',
        }"
    >
        <td
            class="tbl-col tbl-col__first"
            :style="{
                background:
                    isEdit && state.indexRowEditable === index
                        ? 'var(--table-bg-color) !important'
                        : '#fff',
                textAlign: 'center',
                padding: '0',
            }"
        >
            <span class="tbl-detail-text">{{ numericalOrder + 1 || "" }}</span>
        </td>
        <td class="tbl-col">
            <span
                class="tbl-detail-text"
                v-if="
                    isEdit && !state.disableFiledRow.description && index === state.indexRowEditable
                "
            >
                <m-input
                    ref="refRowDetail"
                    width="500px"
                    bottom="2px"
                    :value="
                        reason
                            ? paymentDetail.Description
                            : `Chi tiền cho ${paymentDetail.ObjectName}`
                    "
                    @inputValue="paymentDetail.Description = $event"
                />
            </span>
            <span v-if="!isEdit">{{ state.paymentDetails[index]?.Description }}</span>
            <span
                v-if="
                    isEdit &&
                    !(index === state.indexRowEditable) &&
                    !state.disableFiledRow.description
                "
                >{{
                    state.paymentDetails[index]?.Description
                        ? state.paymentDetails[index]?.Description
                        : `Chi tiền cho ${state.paymentDetails[index]?.ObjectName}`
                }}</span
            >
        </td>
        <td class="tbl-col">
            <span class="tbl-detail-text">
                <div
                    class="checkbox-wrapper"
                    v-if="
                        isEdit &&
                        !state.disableFiledRow.debitAccount &&
                        index === state.indexRowEditable
                    "
                >
                    <m-checkbox
                        width="130px"
                        bottom="2px"
                        :default="paymentDetail.DebitAccount"
                        :options="
                            state.listAllAccounts.length &&
                            state.listAllAccounts.filter((account) => account.optionGrade !== 1)
                        "
                        :isTable="true"
                        :status="paymentDetailErrors?.[index]?.DebitAccount.status"
                        :textError="paymentDetailErrors?.[index]?.DebitAccount.textError"
                        :statusPublic="error.status"
                        :columns="MISA_RESOURCE.COLUMNS_NAME_COMBOBOX_ACCOUNT"
                        @select="
                            paymentDetail.DebitAccount = $event.optionId;
                            paymentDetail.DebitAccountName = $event.optionName;
                        "
                    />
                </div>
                <span v-if="isEdit && state.disableFiledRow.debitAccount">{{
                    state.paymentDetails[index]?.DebitAccountName
                }}</span>
                <span v-if="!isEdit">{{ state.paymentDetails[index]?.DebitAccountName }}</span>
                <span
                    v-if="
                        isEdit &&
                        !(index === state.indexRowEditable) &&
                        !state.disableFiledRow.debitAccount
                    "
                    >{{ paymentDetail.DebitAccountName }}</span
                >
            </span>
        </td>
        <td class="tbl-col">
            <span class="tbl-detail-text">
                <div
                    class="checkbox-wrapper"
                    v-if="
                        isEdit &&
                        !state.disableFiledRow.creditAccount &&
                        index === state.indexRowEditable
                    "
                >
                    <m-checkbox
                        width="130px"
                        bottom="2px"
                        :default="paymentDetail.CreditAccount"
                        :options="
                            state.listAllAccounts.length &&
                            state.listAllAccounts.filter((account) => account.optionGrade !== 1)
                        "
                        :isTable="true"
                        :status="paymentDetailErrors?.[index]?.CreditAccount.status"
                        :textError="paymentDetailErrors?.[index]?.CreditAccount.textError"
                        :statusPublic="error.status"
                        :columns="MISA_RESOURCE.COLUMNS_NAME_COMBOBOX_ACCOUNT"
                        @select="
                            paymentDetail.CreditAccount = $event.optionId;
                            paymentDetail.CreditAccountName = $event.optionName;
                        "
                    />
                </div>
                <span v-if="isEdit && state.disableFiledRow.creditAccount">{{
                    state.paymentDetails[index]?.CreditAccountName
                }}</span>
                <span v-if="!isEdit">{{ state.paymentDetails[index]?.CreditAccountName }}</span>
                <span
                    v-if="
                        isEdit &&
                        !(index === state.indexRowEditable) &&
                        !state.disableFiledRow.creditAccount
                    "
                    >{{ paymentDetail.CreditAccountName }}</span
                >
            </span>
        </td>
        <td class="tbl-col tbl-align-right">
            <span class="tbl-detail-text">
                <m-input-money
                    v-if="
                        isEdit && !state.disableFiledRow.amount && index === state.indexRowEditable
                    "
                    width="130px"
                    bottom="2px"
                    v-model="paymentDetail.Amount"
                    @update:model-value="paymentDetail.Amount = $event"
                />
                <span v-if="isEdit && state.disableFiledRow.amount">{{
                    formatMoney(state.paymentDetails[index]?.Amount)
                }}</span>
                <span v-if="!isEdit">{{ formatMoney(state.paymentDetails[index]?.Amount) }}</span>
                <span
                    v-if="
                        isEdit &&
                        !(index === state.indexRowEditable) &&
                        !state.disableFiledRow.amount
                    "
                    >{{ formatMoney(paymentDetail.Amount) }}</span
                >
            </span>
        </td>
        <td class="tbl-col">
            <span class="tbl-detail-text">
                <div
                    class="checkbox-wrapper"
                    v-if="
                        isEdit &&
                        !state.disableFiledRow.objectCode &&
                        index === state.indexRowEditable
                    "
                >
                    <m-checkbox
                        width="130px"
                        bottom="2px"
                        :columns="MISA_RESOURCE.COLUMNS_NAME_COMBOBOX_OBJECT"
                        :default="paymentDetail.ObjectId"
                        :options="state.objects.length && state.objects"
                        :isTable="true"
                        :status="paymentDetailErrors?.[index]?.ObjectId.status"
                        :textError="paymentDetailErrors?.[index]?.ObjectId.textError"
                        :statusPublic="error.status"
                        left="-300px"
                        @select="
                            paymentDetail.ObjectId = $event.optionId;
                            paymentDetail.ObjectCode = $event.optionCode;
                            paymentDetail.ObjectName = $event.optionName;
                        "
                    />
                </div>
                <span v-if="isEdit && state.disableFiledRow.objectCode">{{
                    state.paymentDetails[index]?.ObjectCode
                }}</span>
                <span v-if="!isEdit">{{ state.paymentDetails[index]?.ObjectCode }}</span>
                <span
                    v-if="
                        isEdit &&
                        !(index === state.indexRowEditable) &&
                        !state.disableFiledRow.objectCode
                    "
                    >{{ paymentDetail.ObjectCode }}</span
                >
            </span>
        </td>
        <td class="tbl-col">
            <span class="tbl-detail-text">{{ paymentDetail.ObjectName }}</span>
        </td>
        <td
            v-if="hasColumnDelete"
            class="tbl-col tbl-col-delete tbl-col__last btn-delete-row"
            style="width: 34px; min-width: 34px"
            :style="{
                background:
                    state.indexRowEditable === index ? 'var(--table-bg-color) !important' : '#fff',
            }"
        >
            <div class="delete-icon" @click.stop="deletePaymentDetails(index)"></div>
        </td>
    </tr>
</template>

<style>
.delete-icon {
    background: url("../../../src/assets/img/Sprites.svg") no-repeat -464px -313px;
    width: 15px;
    height: 15px;
    margin: auto;
}

.tbl-col-delete {
    padding: 0 !important;
}

.tbl-detail-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.tbl-row-detail:hover {
    background-color: #ebedf0;
    color: #2ca01c;
}

.btn-delete-row {
    position: relative;
}

.btn-delete-row::before {
    position: absolute;
    content: "Ctrl + Delete";
    background-color: #434242;
    color: #fff;
    right: 36px;
    top: -2px;
    width: max-content;
    padding: 4px 8px;
    border-radius: 4px;
    display: none;
    opacity: 0;
    animation: identifier 0.3s ease-in;
    font-weight: 400;
}

.btn-delete-row:hover::before {
    display: block;
    opacity: 1;
}
</style>
