<script setup>
import MRowDetail from "./MRowDetail.vue";
import { inject, watchEffect } from "vue";
import { formatMoney } from "../utilities/formatMoney";

const props = defineProps({
    entities: { type: Array, default: [] },
    columns: Array,
    hasColumnDelete: Boolean,
    isEdit: Boolean,
    reason: String,
});

const { state, setTotalPayment } = inject("diy");

const emit = defineEmits(["focusRowDetail"]);

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
</script>

<template>
    <table class="tbl" tabindex="-1">
        <tbody class="tb-detail" tabindex="-1">
            <tr class="tbl-row" tabindex="-1">
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
                        paddingLeft: column.padding,
                    }"
                    v-for="(column, index) in columns"
                    :key="index"
                    tabindex="-1"
                >
                    {{ column.columnName }}
                    <div class="tbl-detail-tooltip" v-if="column.tooltip">
                        <span>{{ column.tooltip }}</span>
                    </div>
                </th>
            </tr>
            <MRowDetail
                v-for="(entity, index) in entities"
                :key="entity.PaymentId"
                :entity="entity"
                :numerical-order="index"
                :has-column-delete="hasColumnDelete"
                :is-edit="isEdit"
                :reason="reason"
                :index="index"
                tabindex="0"
                ref="refRowDetail"
            />
            <div v-if="!entities.length" class="not-found">
                <img
                    src="https://actappg2.misacdn.net/img/bg_report_nodata.76e50bd8.svg"
                    alt="logo NotFound"
                />
                <span style="margin-bottom: 80px">Không có dũ liệu</span>
            </div>
            <tr class="tbl-row" v-if="entities.length">
                <th></th>
                <th style="padding-left: 16px; border-left: unset">Tổng</th>
                <th></th>
                <th></th>
                <th class="tbl-col--money">{{ formatMoney(state.totalPayment) }}</th>
                <th></th>
                <th></th>
                <th v-if="hasColumnDelete"></th>
            </tr>
        </tbody>
    </table>
</template>

<style>
.tbl-col--money {
    text-align: right;
    padding: 0 10px;
}

.tb-detail {
    height: max-content !important;
    overflow: unset !important;
}

.tbl-detail-tooltip {
    position: absolute;
    font-weight: 400;
    background-color: #434242;
    color: #fff;
    padding: 2px 6px;
    border-radius: 4px;
    top: 8px;
    left: 52px;
    z-index: 99;
    animation: identifier 0.3s ease-in;
    display: none;
}

.tbl-col:hover .tbl-detail-tooltip {
    display: block;
}
</style>
