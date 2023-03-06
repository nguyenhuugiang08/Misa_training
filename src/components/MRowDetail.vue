<script setup>
import { MISA_RESOURCE } from "../base/resource";

const props = defineProps({
    numericalOrder: String,
});

const widths = MISA_RESOURCE.COLUMNS_NAME_TABLE_DETAIL.map((col) => col.width);
</script>

<template>
    <tr class="tbl-row">
        <td class="tbl-col" :style="{ width: widths[0], minWidth: widths[0] }">
            <span>{{ numericalOrder + 1 || "" }}</span>
        </td>
        <td class="tbl-col" :style="{ width: widths[1], minWidth: widths[1] }">
            <span>{{ numericalOrder + 1 || "" }}</span>
        </td>
        <td class="tbl-col" :style="{ width: widths[2], minWidth: widths[2] }">
            <span>{{ numericalOrder + 1 || "" }}</span>
        </td>
        <td class="tbl-col" :style="{ width: widths[3], minWidth: widths[3] }">
            <span>{{ numericalOrder + 1 || "" }}</span>
        </td>
        <td class="tbl-col tbl-col--money" :style="{ width: widths[4], minWidth: widths[4] }">
            <span>{{ numericalOrder + 1 || "" }}</span>
        </td>
        <td class="tbl-col" :style="{ width: widths[5], minWidth: widths[5] }">
            <span>{{ numericalOrder + 1 || "" }}</span>
        </td>
        <td class="tbl-col" :style="{ width: widths[6], minWidth: widths[6] }">
            <span>{{ numericalOrder + 1 || "" }}</span>
        </td>
        <td class="tbl-col tbl-col-delete" :style="{ width: widths[7], minWidth: widths[7] }">
            <div class="delete-icon"></div>
        </td>
        <!-- <div class="modal-error" v-if="isOpen">
            <m-pop-up-error
                v-if="isOpen"
                :title="'Thông báo'"
                :text-error="`Chức năng chưa thi công.`"
                @closeError="isOpen = !isOpen"
            />
        </div> -->
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
</style>
