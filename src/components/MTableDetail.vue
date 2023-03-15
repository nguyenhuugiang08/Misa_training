<script setup>
import MPopUpWarning from "./MPopUpWarning.vue";
import MRowDetail from "./MRowDetail.vue";

const props = defineProps({
    entities: Array,
    columns: Array,
    hasColumnDelete: Boolean,
    isEdit: Boolean,
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

.tbl-detail-tooltip {
    position: absolute;
    font-weight: 400;
    background-color: #434242;
    color: #fff;
    padding: 2px 6px;
    border-radius: 4px;
    top: 20px;
    left: 16px;
    z-index: 99;
    animation: identifier 0.3s ease-in;
    display: none;
}

.tbl-col:hover .tbl-detail-tooltip {
    display: block;
}
</style>
