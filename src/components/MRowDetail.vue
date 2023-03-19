<script setup>
import MInput from "./MInput.vue";
import MCheckbox from "./MCheckbox.vue";
import MInputMoney from "./MInputMoney.vue";
import { ref, reactive, inject, watch } from "vue";
import { MISA_RESOURCE } from "../base/resource";
import { useAccount } from "../composable/useAccount";

const props = defineProps({
    numericalOrder: Number,
    entity: Object,
    hasColumnDelete: Boolean,
    isEdit: Boolean,
    editable: Boolean,
    reason: String,
});

const { state } = inject("diy");
const { getAccounts } = useAccount();
getAccounts();

const isEditable = ref(props.editable);
const isSelectRow = ref(false);
const refRowDetail = ref(null);
const paymentDetail = reactive({
    PaymentId: "",
    ObjectId: "",
    ObjectCode: state.objectSelected?.optionCode || "",
    ObjectName: state.objectSelected?.optionName || "",
    Amount: "",
    DebitAccount: "",
    CreditAccount: "",
    Description: "",
});
/**
 * Hàm thực hiện chọn dòng
 * Created by: NHGiang - (14/03/23)
 */
const handle = () => {
    try {
        isEditable.value = false;
        isSelectRow.value = false;
    } catch (error) {
        console.log(error);
    }
};

const handleFocus = () => {
    try {
        if (refRowDetail.value) {
            isEditable.value = true;
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

defineExpose({ handleFocus });
</script>

<template>
    <tr
        class="tbl-row"
        @click="
            isEditable = true;
            isSelectRow = true;
        "
        v-click-outside-element="handle"
        :style="{ background: isSelectRow ? 'var(--table-bg-color)' : '#fff' }"
    >
        <td class="tbl-col tbl-col__first">
            <span class="tbl-detail-text">{{ numericalOrder + 1 || "" }}</span>
        </td>
        <td class="tbl-col">
            <span class="tbl-detail-text" v-if="isEdit && isEditable">
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
            <span v-if="isEdit && !isEditable">{{
                paymentDetail.Description
                    ? paymentDetail.Description
                    : `Chi tiền cho ${paymentDetail.ObjectName}`
            }}</span>
        </td>
        <td class="tbl-col">
            <span class="tbl-detail-text">
                <div class="checkbox-wrapper" v-if="isEdit && isEditable">
                    <m-checkbox
                        v-if="state.listAllEntities.length"
                        width="130px"
                        bottom="2px"
                        :default="paymentDetail.DebitAccount"
                        :options="state.listAllEntities"
                        :isTable="true"
                        :columns="MISA_RESOURCE.COLUMNS_NAME_COMBOBOX_ACCOUNT"
                        @select="paymentDetail.DebitAccount = $event.optionId"
                    />
                </div>
            </span>
        </td>
        <td class="tbl-col">
            <span class="tbl-detail-text">
                <div class="checkbox-wrapper" v-if="isEdit && isEditable">
                    <m-checkbox
                        v-if="state.listAllEntities.length"
                        width="130px"
                        bottom="2px"
                        :default="paymentDetail.CreditAccount"
                        :options="state.listAllEntities"
                        :isTable="true"
                        :columns="MISA_RESOURCE.COLUMNS_NAME_COMBOBOX_ACCOUNT"
                        @select="paymentDetail.CreditAccount = $event.optionId"
                    />
                </div>
            </span>
        </td>
        <td class="tbl-col tbl-align-right">
            <span class="tbl-detail-text">
                <m-input-money v-if="isEdit && isEditable" width="130px" bottom="2px" />
            </span>
        </td>
        <td class="tbl-col">
            <span class="tbl-detail-text">
                <div class="checkbox-wrapper" v-if="isEdit && isEditable">
                    <m-checkbox
                        width="130px"
                        bottom="2px"
                        :columns="MISA_RESOURCE.COLUMNS_NAME_COMBOBOX_OBJECT"
                        :default="state.objectSelected.optionId || paymentDetail.ObjectId"
                        :options="state.objects"
                        :isTable="true"
                        @select="
                            paymentDetail.ObjectId = $event.optionId;
                            paymentDetail.ObjectCode = $event.optionCode;
                            paymentDetail.ObjectName = $event.optionName;
                        "
                    />
                </div>
                <span v-if="isEdit && !isEditable">{{ paymentDetail.ObjectCode }}</span>
            </span>
        </td>
        <td class="tbl-col">
            <span class="tbl-detail-text">{{ paymentDetail.ObjectName }}</span>
        </td>
        <td
            v-if="hasColumnDelete"
            class="tbl-col tbl-col-delete tbl-col__last"
            style="width: 34px; min-width: 34px"
        >
            <div class="delete-icon"></div>
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
</style>
