<script setup>
import { watch, ref } from "vue";
const props = defineProps({
    options: { type: Array, default: [] },
    columns: { type: Array, default: [] },
    indexSelected: Number,
});

const emit = defineEmits(["select"]);
const refList = ref(null);
const refItem = ref(null);

watch(
    () => props.indexSelected,
    (newValue) => {
        if (!props.isTable) {
            const liH = refItem.value?.[newValue]?.clientHeight;
            refList.value.scrollTop = liH * newValue;
        }
    }
);
</script>

<template>
    <div class="wrapper-cbo-tbl">
        <table class="tbl tbl-cbo">
            <tbody class="tbd" ref="refList">
                <tr class="tbl-row">
                    <th
                        v-for="(col, index) in columns"
                        :key="index"
                        :style="{ width: col.width, textAlign: col.align }"
                    >
                        {{ col.columnName }}
                    </th>
                </tr>
                <tr
                    ref="refItem"
                    class="tbl-cbo-row tbl-row-detail"
                    :class="{ 'row--active': index === indexSelected }"
                    v-for="(option, index) in options"
                    :key="index"
                    @click="emit('select', { option: option, index: index })"
                >
                    <td
                        :class="{ 'tbl-cbo-text': col.isWrap }"
                        v-for="(col, index) in columns"
                        :key="index"
                    >
                        {{ option[col.identityOption] }}
                    </td>
                </tr>
                <div class="tbl-cbo-nodata" v-if="options.length === 0">Không có dữ liệu hiển thị</div>
            </tbody>
        </table>
    </div>
</template>

<style>
.row--active {
    background-color: var(--primary-color);
    color: #fff;
}

.row--active:hover {
    background-color: var(--primary-color) !important;
    color: #fff !important;
}

.tbl-cbo-nodata {
    margin: 8px auto;
    text-align: center;
}
</style>
