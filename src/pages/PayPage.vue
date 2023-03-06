<script setup>
import MComboButton from "../components/MComboButton.vue";
import { ref } from "vue";
import MTable from "../components/MTable.vue";
import { MISA_RESOURCE } from "../base/resource";

const isFocus = ref(false); // Trạng thái focus vào ô tìm kiếm
</script>

<template>
    <div class="content-wrapper">
        <div class="content-wrapper__action">
            <div class="m-icon check-all"><div class="arrow-check-all"></div></div>
            <div class="pay-bulk-delete">
                Thực hiện hàng loạt
                <div class="m-icon"><div class="pay-bulk-delete__icon"></div></div>
            </div>
            <div class="textfield">
                <label for="" class="textfield__label">
                    <div
                        class="textfield__icon"
                        :style="{ borderColor: `${isFocus ? '#50B83C' : ''}` }"
                    >
                        <div
                            :style="{
                                background:
                                    'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -992px -360px',
                                width: '16px',
                                height: '16px',
                            }"
                        ></div>
                    </div>
                </label>
                <input
                    type="text"
                    class="textfield__input"
                    id="search-input"
                    placeholder="Tìm kiếm theo số, tên tài khoản"
                    v-debounce:600="debounceSearch"
                    autocomplete="off"
                    @focus="isFocus = true"
                    @blur="isFocus = false"
                />
            </div>
            <div
                class="sidebar-item__icon content-wrapper__action-refresh"
                :style="{
                    background:
                        'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -425px -201px',
                }"
            ></div>
            <div class="sidebar-item__icon export" @click="onClickButtonExport">
                <div class="export-icon"></div>
            </div>
            <m-combo-button
                default="Chi tiền"
                class="btn-curved"
                isCurved
                margin-top="8px"
                @clickBtn="isOpenForm = true"
            />
        </div>
        <m-table :columns="MISA_RESOURCE.COLUMNS_NAME_TABLE_PAY" />
    </div>
</template>

<style scoped></style>
