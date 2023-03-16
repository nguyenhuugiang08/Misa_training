<script setup>
import MPagination from "../components/MPagination.vue";
import MAccountForm from "../components/MAccountForm.vue";
import MFeatureDetail from "../components/MFeatureDetail.vue";
import MLoading from "../components/MLoading.vue";
import { DxTreeList, DxColumn, DxPaging, DxPager, DxScrolling } from "devextreme-vue/tree-list";
import { ref, inject, watch } from "vue";
import { useAccount } from "../composable/useAccount";
import { useRouter, useRoute } from "vue-router";
import { MISA_RESOURCE } from "../base/resource";
import { MISA_ENUM } from "../base/enum";
import { handleSetStatusForm } from "../utilities/setDefaultStateForm";
import MToast from "../components/MToast.vue";

const isOpenForm = ref(false); // Trạng thái Đóng/Mở form
const isExpandAll = ref(false); // Trạng thái Thu gọn/Mở rộng row
const isFocus = ref(false); // Trạng thái focus ô tìm kiếm
const expandedRowKeys = ref([]);
const newExpandedRowKeys = ref([]);
const allowedPageSizes = [10, 20, 30, 50, 100];
const pageSize = ref(20);
const pageNumber = ref(1);

const router = useRouter();
const route = useRoute();

const { state, setIsForm, setTitleForm, setIdentityForm, setEntitySelected } = inject("diy");

const { getAccountsByFilter, getAccountById } = useAccount();
getAccountsByFilter();

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
 * Lấy ra trang thứ bao nhiêu sử dụng vue-router
 * created by : NHGiang
 */
watch(
    () => route.query.pageNumber,
    (newValue) => {
        pageNumber.value = newValue;
        try {
        } catch (error) {
            console.log(error);
        }
    }
);

/**
 * Hàm thực hiện Thu gọn/Mở rộng các hàng
 * Created by: NHGiang - (08/03/23)
 */
const toogleExpanded = () => {
    try {
        isExpandAll.value = !isExpandAll.value;
        const newList = state.Entities.map((item) => {
            if (item.IsParent === true) {
                return item.AccountId;
            }
        });
        newExpandedRowKeys.value = [...newList];
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm xử lý tìm kiếm tài khoản theo số tài khoản, tên tài khoản
 * @param {*} value -- Từ khỏa tìm kiếm
 * Created By: NHGiang - (10/02/23)
 */
const debounceSearch = async (value) => {
    try {
        await getAccountsByFilter(value, pageSize.value, 1);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lấy lại dữ liệu
 * Created by: NHGiang - (14/03/23)
 */
const handleRefreshData = async () => {
    try {
        await getAccountsByFilter(state.keyword, pageSize.value, pageNumber.value);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm mở form edit khi double click 1 dòng trong bảng
 * @param {*} e
 * Created by: NHGiang - (15/03/23)
 */
const handleDoubleClickRow = async (event) => {
    try {
        setTitleForm(MISA_RESOURCE.FORM_TITLE.EDIT_ACCOUNT);
        await getAccountById(event.key);
        setIdentityForm(MISA_ENUM.FORM_MODE.EDIT);
        setIsForm();
        handleSetStatusForm();
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
                <div
                    class="sidebar-item__icon content-wrapper__action-refresh refresh-icon"
                    @click="handleRefreshData"
                ></div>
                <button
                    class="btn btn-primary btn-add-account"
                    @click="
                        setIsForm();
                        setTitleForm(MISA_RESOURCE.FORM_TITLE.ADD_ACCOUNT);
                        setIdentityForm(MISA_ENUM.FORM_MODE.ADD);
                        handleSetStatusForm();
                        setEntitySelected({});
                    "
                >
                    Thêm
                </button>
            </div>
            <DxTreeList
                id="tasks"
                :data-source="state.Entities"
                :column-auto-width="true"
                :word-wrap-enabled="true"
                :sorting="false"
                :expanded-row-keys="!isExpandAll ? expandedRowKeys : newExpandedRowKeys"
                key-expr="AccountId"
                parent-id-expr="ParentId"
                no-data-text="Không có dữ liệu"
                @cellDblClick="handleDoubleClickRow"
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
                <DxColumn :width="150" data-field="Type" caption="Tính chất" />
                <DxColumn :width="200" data-field="EnglishName" caption="Tên tiếng anh" />
                <DxColumn :width="316" data-field="Description" caption="Diễn giải" />
                <DxColumn :width="120" data-field="Active" caption="Trạng thái" />
                <DxColumn :width="0" data-field="IsParent" caption="cha" style="display: none" />
                <DxColumn :width="120" caption="Chức năng" cell-template="functionTemplate" />
                <template #functionTemplate="{ data: options }">
                    <m-feature-detail :data="options.data" />
                </template>
            </DxTreeList>
            <m-pagination path="/account-system" :func-filter="getAccountsByFilter" />
            <MAccountForm v-if="state.isForm" @closeForm="isOpenForm = false" />
            <div class="overlay" v-if="state.isLoading"><m-loading /></div>
        </div>
        <div class="toast-container">
            <m-toast
                v-if="state.listToast.length"
                v-for="(toast, index) in state.listToast"
                :key="index"
                :toastMessage="toast.toastMessage"
                :statusMessage="toast.statusMessage"
                :status="toast.status"
            />
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

.dx-treelist-nodata {
    font-size: 13px;
    color: #111;
}

.btn-add-account {
    position: relative;
    top: 4px;
    margin-left: 8px;
}
</style>
