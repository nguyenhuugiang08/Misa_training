<script setup>
import { formatMoney } from "../utilities/formatMoney";
import { MISA_RESOURCE } from "../base/resource";
import MInput from "./MInput.vue";

const props = defineProps({
    numericalOrder: Number,
    entity: Object,
    hasColumnDelete: Boolean,
});
</script>

<template>
    <tr class="tbl-row">
        <td class="tbl-col tbl-col__first">
            <span class="tbl-detail-text">{{ numericalOrder + 1 || "" }}</span>
        </td>
        <td class="tbl-col">
            <span class="tbl-detail-text">{{ entity.Explain || "" }}</span>
        </td>
        <td class="tbl-col">
            <span class="tbl-detail-text">{{ entity.AccountDebt || "" }}</span>
        </td>
        <td class="tbl-col">
            <span class="tbl-detail-text">{{ entity.AccountHas || "" }}</span>
        </td>
        <td class="tbl-col tbl-align-right">
            <span class="tbl-detail-text">{{ formatMoney(entity.Money) || "" }}</span>
        </td>
        <td class="tbl-col">
            <span class="tbl-detail-text">{{ entity.SubjectId || "" }}</span>
        </td>
        <td class="tbl-col">
            <span class="tbl-detail-text">{{ entity.SubjectName || "" }}</span>
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
</style>
