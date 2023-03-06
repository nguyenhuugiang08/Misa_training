<script setup>
import MTable from "../components/MTable.vue";
import MPagination from "../components/MPagination.vue";
import { MISA_RESOURCE } from "../base/resource";
import MComboButton from "../components/MComboButton.vue";
import MAccountForm from "../components/MAccountForm.vue";
import { DxTreeList, DxColumn } from "devextreme-vue/tree-list";
import { ref } from "vue";

const isOpenForm = ref(false); // Trạng thái Đóng/Mở form
const isExpandAll = ref(false); // Trạng thái Thu gọn/Mở rộng row
const isFocus = ref(false); // Trạng thái focus ô tìm kiếm
const expandedRowKeys = ref([]);
const fakeData = [
    {
        AccountId: 1,
        ParentAccountId: 0,
        BankNumber: "111",
        BankName: "Tiền mặt Việt Nam",
        Nature: "Dư có",
        EnglishName: "Cash in hand",
        Explain: "diễn giải",
        IsActive: "Ngừng sử dụng",
    },
    {
        AccountId: 2,
        ParentAccountId: 1,
        BankNumber: "112",
        BankName: "Tiền mặt Việt Nam",
        Nature: "Dư có",
        EnglishName: "Cash in hand",
        Explain: "diễn giải",
        IsActive: "Đang sử dụng",
    },
    {
        AccountId: 3,
        ParentAccountId: 2,
        BankNumber: "113",
        BankName: "Tiền mặt Việt Nam",
        Nature: "Dư có",
        EnglishName: "Cash in hand",
        Explain: "diễn giải",
        IsActive: "Đang sử dụng",
    },
    {
        AccountId: 4,
        ParentAccountId: 0,
        BankNumber: "114",
        BankName: "Tiền mặt Việt Nam",
        Nature: "Dư có",
        EnglishName: "Cash in hand",
        Explain: "diễn giải",
        IsActive: "Đang sử dụng",
    },
    {
        AccountId: 5,
        ParentAccountId: 0,
        BankNumber: "115",
        BankName: "Tiền mặt Việt Nam",
        Nature: "Dư có",
        EnglishName: "Cash in hand",
        Explain: "diễn giải",
        IsActive: "Đang sử dụng",
    },
    {
        AccountId: 6,
        ParentAccountId: 2,
        BankNumber: "116",
        BankName: "Tiền mặt Việt Nam",
        Nature: "Dư có",
        EnglishName: "Cash in hand",
        Explain: "diễn giải",
        IsActive: "Đang sử dụng",
    },
    {
        AccountId: 7,
        ParentAccountId: 0,
        BankNumber: "117",
        BankName: "Tiền mặt Việt Nam",
        Nature: "Dư có",
        EnglishName: "Cash in hand",
        Explain: "diễn giải",
        IsActive: "Đang sử dụng",
    },
    {
        AccountId: 8,
        ParentAccountId: 3,
        BankNumber: "118",
        BankName: "Tiền mặt Việt Nam",
        Nature: "Dư có",
        EnglishName: "Cash in hand",
        Explain: "diễn giải",
        IsActive: "Đang sử dụng",
    },
    {
        AccountId: 9,
        ParentAccountId: 0,
        BankNumber: "119",
        BankName: "Tiền mặt Việt Nam",
        Nature: "Dư có",
        EnglishName: "Cash in hand",
        Explain: "diễn giải",
        IsActive: "Đang sử dụng",
    },
    {
        AccountId: 10,
        ParentAccountId: 0,
        BankNumber: "111",
        BankName: "Tiền mặt Việt Nam",
        Nature: "Dư có",
        EnglishName: "Cash in hand",
        Explain: "diễn giải",
        IsActive: "Đang sử dụng",
    },
    {
        AccountId: 11,
        ParentAccountId: 0,
        BankNumber: "111",
        BankName: "Tiền mặt Việt Nam",
        Nature: "Dư có",
        EnglishName: "Cash in hand",
        Explain: "diễn giải",
        IsActive: "Đang sử dụng",
    },
    {
        AccountId: 12,
        ParentAccountId: 0,
        BankNumber: "111",
        BankName: "Tiền mặt Việt Nam",
        Nature: "Dư có",
        EnglishName: "Cash in hand",
        Explain: "diễn giải",
        IsActive: "Đang sử dụng",
    },
    {
        AccountId: 13,
        ParentAccountId: 0,
        BankNumber: "111",
        BankName: "Tiền mặt Việt Nam",
        Nature: "Dư có",
        EnglishName: "Cash in hand",
        Explain: "diễn giải",
        IsActive: "Đang sử dụng",
    },
    {
        AccountId: 14,
        ParentAccountId: 0,
        BankNumber: "111",
        BankName: "Tiền mặt Việt Nam",
        Nature: "Dư có",
        EnglishName: "Cash in hand",
        Explain: "diễn giải",
        IsActive: "Đang sử dụng",
    },
    {
        AccountId: 15,
        ParentAccountId: 0,
        BankNumber: "111",
        BankName: "Tiền mặt Việt Nam",
        Nature: "Dư có",
        EnglishName: "Cash in hand",
        Explain: "diễn giải",
        IsActive: "Đang sử dụng",
    },
    {
        AccountId: 16,
        ParentAccountId: 0,
        BankNumber: "111",
        BankName: "Tiền mặt Việt Nam",
        Nature: "Dư có",
        EnglishName: "Cash in hand",
        Explain: "diễn giải",
        IsActive: "Đang sử dụng",
    },
];
const treeListRefKey = ref(null);

const toogleExpanded = () => {
    try {
        isExpandAll.value = !isExpandAll.value;
        // expandedRowKeys.value = [];
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="content">
        <div class="content__header">
            <div class="content__header-text">Hệ thống tài khoản</div>
        </div>
        <div class="content-wrapper">
            <div class="content-wrapper__action">
                <div class="textfield account-search">
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
                <div class="account-extend" @click="toogleExpanded">Mở rộng</div>
                <div
                    class="sidebar-item__icon content-wrapper__action-refresh"
                    :style="{
                        background:
                            'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -425px -201px',
                    }"
                ></div>
                <m-combo-button
                    default="Thêm"
                    class="btn-curved"
                    isCurved
                    margin-top="8px"
                    @clickBtn="isOpenForm = true"
                />
            </div>
            <DxTreeList
                id="tasks"
                :data-source="fakeData"
                :column-auto-width="true"
                :word-wrap-enabled="true"
                :expanded-row-keys="expandedRowKeys"
                :autoExpandAll="isExpandAll"
                key-expr="AccountId"
                parent-id-expr="ParentAccountId"
            >
                <DxColumn :width="130" data-field="BankNumber" caption="Số tài khoản" />
                <DxColumn :width="250" data-field="BankName" caption="Tên tài khoản" />
                <DxColumn :width="100" data-field="Nature" caption="Tính chất" />
                <DxColumn :width="250" data-field="EnglishName" caption="Tên tiếng anh" />
                <DxColumn :width="312" data-field="Explain" caption="Diễn giải" />
                <DxColumn :width="120" data-field="IsActive" caption="Trạng thái" />
                <DxColumn :width="120" caption="Chức năng" cell-template="functionTemplate" />
                <template #functionTemplate="">
                    <td class="tbl-col tbl-col__last">
                        <div class="tbl-col__action">
                            <label class="tbl-col__action-edit">Sửa</label>
                            <label class="sidebar-item__icon btn-dropdown">
                                <div
                                    :style="{
                                        background:
                                            'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -900px -365px',
                                        width: '8px',
                                        height: '5px',
                                    }"
                                ></div>
                            </label>
                        </div>
                    </td>
                    <ul class="tbl-col__action-list textfield-list--action" v-if="false">
                        <li class="tbl-col__action-item">Nhân bản</li>
                        <li class="tbl-col__action-item">Xóa</li>
                        <li class="tbl-col__action-item">Ngừng sử dụng</li>
                    </ul>
                </template>
            </DxTreeList>
            <m-pagination />
            <MAccountForm v-if="isOpenForm" @closeForm="isOpenForm = false" />
        </div>
    </div>
</template>

<style>
.dx-treelist-container {
    color: #111;
    height: calc(100vh - 48px - 71px - 68px - 68px);
}

.dx-treelist-headers {
    background-color: #e5e8ec;
    color: #333333;
    display: table-cell;
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
    text-align: left;
}

.dx-treelist-rowsview .dx-row {
    border-bottom: 1px solid #e0e0e0;
}

.dx-treelist .dx-row > td {
    padding: 6px 10px;
}

.dx-treelist .dx-column-lines > td:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
}

.dx-treelist-rowsview .dx-treelist-collapsed span::before {
    content: "\f196";
    font-family: FontAwesome;
}

.dx-treelist-rowsview .dx-treelist-expanded span::before {
    content: "\f147";
    font-family: FontAwesome;
}
</style>
