<script setup>
import MInput from "./MInput.vue";
import MCheckbox from "./MCheckbox.vue";
import MInputMoney from "./MInputMoney.vue";
import { ref } from "vue";

const props = defineProps({
    numericalOrder: Number,
    entity: Object,
    hasColumnDelete: Boolean,
    isEdit: Boolean,
});

const isEditable = ref(false);
const isSelectRow = ref(false);

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
                <m-input width="500px" bottom="2px" />
            </span>
        </td>
        <td class="tbl-col">
            <span class="tbl-detail-text">
                <div class="checkbox-wrapper" v-if="isEdit && isEditable">
                    <m-checkbox width="130px" bottom="2px" />
                </div>
            </span>
        </td>
        <td class="tbl-col">
            <span class="tbl-detail-text">
                <div class="checkbox-wrapper" v-if="isEdit && isEditable">
                    <m-checkbox width="130px" bottom="2px" />
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
                    <m-checkbox width="130px" bottom="2px" />
                </div>
            </span>
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

.tbl-row-detail:hover {
    background-color: #ebedf0;
    color: #2ca01c;
}
</style>
