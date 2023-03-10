<script setup>
import { ref, watch } from "vue";
import { MISA_RESOURCE } from "../base/resource";
import MComboButton from "../components/MComboButton.vue";
import MTable from "../components/MTable.vue";
import MPagination from "../components/MPagination.vue";
import MTableDetail from "../components/MTableDetail.vue";
import VueResizable from "vue-resizable";
import { MISA_ENUM } from "../base/enum";

const isFocus = ref(false); // Trạng thái focus vào ô tìm kiếm
const heightMaster = ref(MISA_ENUM.HEIGHT_PAYMENT_MASTER); // Chiều cao phần master
const heightDetail = ref(MISA_ENUM.HEIGHT_PAYMENT_DETAIL); // Chiều cao mặc định của phần detail
const vueResizeRef = ref(null);

const fakeData = [
    {
        PaymentId: "PC001",
        AccountingDate: "12/02/2022",
        VouchersDate: "12/02/2022",
        VoucherNumber: "PC001",
        Explain: "Chi tiền cho Nguyễn Hữu Giang",
        Money: "1000000",
        SubjectId: "KH0001",
        SubjectName: "Công ty cổ phần MISA",
        Address: "Khu ngoại giao đoàn",
    },
    {
        PaymentId: "PC002",
        AccountingDate: "12/02/2022",
        VouchersDate: "12/02/2022",
        VoucherNumber: "PC001",
        Explain: "Chi tiền cho Nguyễn Hữu Giang",
        Money: "1000000",
        SubjectId: "KH0001",
        SubjectName: "Công ty cổ phần MISA",
        Address: "Khu ngoại giao đoàn",
    },
    {
        PaymentId: "PC003",
        AccountingDate: "12/02/2022",
        VouchersDate: "12/02/2022",
        VoucherNumber: "PC001",
        Explain: "Chi tiền cho Nguyễn Hữu Giang",
        Money: "1000000",
        SubjectId: "KH0001",
        SubjectName: "Công ty cổ phần MISA",
        Address: "Khu ngoại giao đoàn",
    },
    {
        PaymentId: "PC004",
        AccountingDate: "12/02/2022",
        VouchersDate: "12/02/2022",
        VoucherNumber: "PC001",
        Explain: "Chi tiền cho Nguyễn Hữu Giang",
        Money: "1000000",
        SubjectId: "KH0001",
        SubjectName: "Công ty cổ phần MISA",
        Address: "Khu ngoại giao đoàn",
    },
    {
        PaymentId: "PC005",
        AccountingDate: "12/02/2022",
        VouchersDate: "12/02/2022",
        VoucherNumber: "PC001",
        Explain: "Chi tiền cho Nguyễn Hữu Giang",
        Money: "1000000",
        SubjectId: "KH0001",
        SubjectName: "Công ty cổ phần MISA",
        Address: "Khu ngoại giao đoàn",
    },
    {
        PaymentId: "PC006",
        AccountingDate: "12/02/2022",
        VouchersDate: "12/02/2022",
        VoucherNumber: "PC001",
        Explain: "Chi tiền cho Nguyễn Hữu Giang",
        Money: "1000000",
        SubjectId: "KH0001",
        SubjectName: "Công ty cổ phần MISA",
        Address: "Khu ngoại giao đoàn",
    },
];

const fakeDataDetail = [
    {
        PaymentId: 1,
        Explain: "Chi tiền cho Nguyễn Hữu Giang",
        AccountDebt: "111",
        AccountHas: "111",
        Money: 1000000,
        SubjectId: "KH001",
        SubjectName: "Công ty cổ phần văn phòng phẩm Hồng Hà tại Hà Nội",
    },
    {
        PaymentId: 2,
        Explain: "Chi tiền cho Nguyễn Hữu Giang",
        AccountDebt: "111",
        AccountHas: "111",
        Money: 1000000,
        SubjectId: "KH001",
        SubjectName: "Công ty cổ phần văn phòng phẩm Hồng Hà tại Hà Nội",
    },
];

/**
 * Hàm thực hiện thay đổi chiều cao phần detail khi resize
 * @param {*} event
 * Created by: NHGiang - (07/03/23)
 */
const handleChangeHeight = (event) => {
    try {
        heightDetail.value = MISA_ENUM.HEIGHT_PAYMENT_CONTENT - event.height;
        heightMaster.value = event.height;
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="content-wrapper content-wrapper-payment">
        <vue-resizable
            ref="vueResizeRef"
            :active="['b']"
            :maxHeight="660"
            :height="heightMaster"
            @resize:move="handleChangeHeight($event)"
        >
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
                            <div class="search-icon"></div>
                        </div>
                    </label>
                    <input
                        type="text"
                        class="textfield__input"
                        id="search-input"
                        placeholder="Tìm kiếm theo số, tên tài khoản"
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
            <m-table
                :columns="MISA_RESOURCE.COLUMNS_NAME_TABLE_PAY"
                hasCheckbox
                :entities="fakeData"
            />
            <m-pagination />
        </vue-resizable>
        <div class="detail-payment" :style="{ height: heightDetail + 'px' }">
            <div class="detail-payment__title">Chi tiết</div>
            <m-table-detail
                :columns="MISA_RESOURCE.COLUMNS_NAME_PAYMENT_DETAIL"
                :entities="fakeDataDetail"
            />
            <div class="detail-payment__paging"><m-pagination /></div>
        </div>
    </div>
</template>

<style>
.resizable-component {
    width: 100% !important;
}

.resizable-b {
    height: 13px !important;
    position: absolute !important;
    bottom: 0px !important;
    border-radius: 2px;
    margin: 0 -12px 0 -12px;
    width: calc(100% + 24px) !important;
}

.resizable-b:hover {
    cursor: row-resize !important;
    background: #e0e0e0 !important;
}

.resizable-b::before {
    content: "\f0d7";
    font-family: FontAwesome;
    position: absolute;
    left: calc(50% - 30px);
    width: 48px;
    height: 13px;
    background: #d4d7dc;
    border: 1px solid #d4d7dc;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>
