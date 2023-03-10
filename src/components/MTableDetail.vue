<script setup>
import MPopUpWarning from "./MPopUpWarning.vue";
import MRowDetail from "./MRowDetail.vue";

const props = defineProps({
    entities: Array,
    columns: Array,
    hasColumnDelete: Boolean,
});
</script>

<template>
    <table class="tbl">
        <tbody class="tb-detail">
            <tr class="tbl-row">
                <th
                    :class="`tbl-col ${column.isMoney && 'tbl-col--money'} ${
                        column.isSticky
                            ? column.isLast
                                ? 'tbl-col__last tbl-col__last--bg-private'
                                : 'tbl-col__first tbl-col__first--bg-private'
                            : ''
                    }`"
                    :style="{
                        width: column.width,
                        minWidth: column.width,
                        textAlign: column.align,
                    }"
                    v-for="(column, index) in columns"
                    :key="index"
                >
                    {{ column.columnName }}
                </th>
            </tr>
            <MRowDetail
                v-for="(entity, index) in entities"
                :key="entity.PaymentId"
                :entity="entity"
                :numerical-order="index"
                :has-column-delete="hasColumnDelete"
            />
            <tr class="tbl-row">
                <th></th>
                <th style="padding-left: 16px; border-left: unset">Tổng</th>
                <th></th>
                <th></th>
                <th class="tbl-col--money">0</th>
                <th></th>
                <th></th>
                <th v-if="hasColumnDelete"></th>
            </tr>
            <!-- <div class="modal-error" v-if="isPopUp.isOpenWarning">
                <m-pop-up-warning
                    v-if="isPopUp.isOpenWarning"
                    :title="'Xác nhận xóa'"
                    :text-info="`Bạn có thực sự muốn xóa nhân viên \<${code}\> không?`"
                    @closeWarning="isPopUp.isOpenWarning = !isPopUp.isOpenWarning"
                    @closeForm="isPopUp.isOpenWarning = !isPopUp.isOpenWarning"
                    @submitForm="
                        hanldeSubmitFormDelete($event);
                        isPopUp.isOpenWarning = !isPopUp.isOpenWarning;
                    "
                />
            </div> -->
        </tbody>
    </table>
</template>

<style>
.tbl-col--money {
    text-align: right;
    padding: 0 16px;
}

.tb-detail {
    height: max-content !important;
}
</style>
