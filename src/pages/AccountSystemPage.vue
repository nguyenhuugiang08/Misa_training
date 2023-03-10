<script setup>
import MPagination from "../components/MPagination.vue";
import MComboButton from "../components/MComboButton.vue";
import MAccountForm from "../components/MAccountForm.vue";
import MFeatureDetail from "../components/MFeatureDetail.vue";
import { DxTreeList, DxColumn, DxPaging, DxPager, DxScrolling } from "devextreme-vue/tree-list";
import { ref, inject, watch } from "vue";
import { useAccount } from "../composable/useAccount";
import { useRouter, useRoute } from "vue-router";

const isOpenForm = ref(false); // Trạng thái Đóng/Mở form
const isExpandAll = ref(false); // Trạng thái Thu gọn/Mở rộng row
const isFocus = ref(false); // Trạng thái focus ô tìm kiếm
const expandedRowKeys = ref([]);
const newExpandedRowKeys = ref([]);
const allowedPageSizes = [10, 20, 30, 50, 100];
const pageSize = ref(20);

const router = useRouter();
const route = useRoute();

const { setTotalPage } = inject("diy");

const { accounts, totalPage, getAccountsByFilter } = useAccount();
getAccountsByFilter();
setTotalPage(totalPage);

/**
 * Lấy ra số lượng bản ghi trên 1 trang sử dụng vue-router
 * created by : NHGiang
 */
watch(
    () => route.query.pageSize,
    (newValue) => {
        pageSize.value = newValue;
        try {
        } catch (error) {
            console.log(error);
        }
    }
);
router.push({ path: "/account-system", query: { pageSize: pageSize.value, pageNumber: 1 } });

/**
 * Hàm thực hiện Thu gọn/Mở rộng các hàng
 * Created by: NHGiang - (08/03/23)
 */
const toogleExpanded = () => {
    try {
        isExpandAll.value = !isExpandAll.value;
        const newList = accounts.value.map((item) => {
            if (item.IsParent === true) {
                return item.AccountId;
            }
        });
        newExpandedRowKeys.value = [...newList];
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="content">
        <div class="content__header">
            <div class="content__header-text account-system-title">Hệ thống tài khoản</div>
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
                <div class="account-extend" @click="toogleExpanded">
                    {{ !isExpandAll ? "Mở rộng" : "Thu gọn" }}
                </div>
                <div class="sidebar-item__icon content-wrapper__action-refresh refresh-icon"></div>
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
                :data-source="accounts"
                :column-auto-width="true"
                :word-wrap-enabled="true"
                :sorting="false"
                :expanded-row-keys="!isExpandAll ? expandedRowKeys : newExpandedRowKeys"
                key-expr="AccountId"
                parent-id-expr="ParentId"
            >
                <DxScrolling mode="standard" />
                <DxPaging :enabled="false" :page-size="10" />
                <DxPager
                    :show-page-size-selector="true"
                    :allowed-page-sizes="allowedPageSizes"
                    :show-info="true"
                />
                <DxColumn :width="130" data-field="AccountNumber" caption="Số tài khoản" />
                <DxColumn :width="250" data-field="AccountName" caption="Tên tài khoản" />
                <DxColumn :width="100" data-field="Type" caption="Tính chất" />
                <DxColumn :width="250" data-field="EnglishName" caption="Tên tiếng anh" />
                <DxColumn :width="316" data-field="Description" caption="Diễn giải" />
                <DxColumn :width="120" data-field="IsActive" caption="Trạng thái" />
                <DxColumn :width="0" data-field="IsParent" caption="cha" style="display: none" />
                <DxColumn :width="120" caption="Chức năng" cell-template="functionTemplate" />
                <template #functionTemplate="{ data: options }">
                    <m-feature-detail :data="options.data" />
                </template>
            </DxTreeList>
            <m-pagination path="/account-system" :func-filter="getAccountsByFilter" />
            <MAccountForm v-if="isOpenForm" @closeForm="isOpenForm = false" />
        </div>
    </div>
</template>

<style>
.dx-treelist-container {
    color: #111;
    max-height: calc(100vh - 48px - 71px - 68px - 29px);
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
    white-space: nowrap;
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

.dx-row:has(.dx-treelist-readonly .dx-treelist-checkbox-size input[value="true"]) {
    font-weight: 700;
}

.dx-widget.dx-state-readonly.dx-checkbox {
    position: absolute;
    visibility: hidden;
}

.dx-treelist .dx-column-lines > td {
    border-left: unset;
}

.dx-treelist-text-content {
    padding-left: 6px;
}

.dx-text-content-alignment-left {
    padding-left: unset;
}
</style>
