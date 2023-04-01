<script setup>
import { MISA_ENUM } from "../base/enum";
import { ref, inject, watch } from "vue";
import { MISA_RESOURCE } from "../base/resource";
import { useAccount } from "../composable/useAccount";
import MPopUpWarning from "./MPopUpWarning.vue";
import MPopUpError from "./MPopUpError.vue";
import accountApi from "../api/accountApi";
import { handleSetStatusForm } from "../utilities/setDefaultStateForm";
import { useRoute } from "vue-router";
import { usePaymentDeatil } from "../composable/usePaymentDetail";

const isShowWarning = ref(false);
const isShowList = ref(false); // Trạng thái ẩn hiện danh sách chức năng (Nhân bản, Xóa)
const toDropList = ref(0); // Khoảng cách của danh sách chức năng so với top của cửa số trình duyệt
const isShowPopup = ref(false); // trạng thái đóng mở popup cảnh báo khi xóa
const isShowPopupActiveChild = ref(false); // trạng thái đóng mở popup xác nhận active tài khoản con khi thực hiện active tài khoản cha
const pageSize = ref(20);
const pageNumber = ref(1);

const props = defineProps({
    data: Object,
});

const route = useRoute();

const { state, setIsForm, setTitleForm, setIdentityForm } = inject("diy");
const {
    getAccountById,
    deleteAccount,
    getAccountsByFilter,
    deleteAccountChild,
    updateIsActiveAccount,
} = useAccount();

const { getPaymentDetailsByAccountId } = usePaymentDeatil();

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
 * hàm xử lý vị trí hiển thị của danh sách chức năng
 * @param {Object} e -- object event
 * Created by: NHGiang - (20/02/23)
 */
const handleDisplayHideListAction = (e) => {
    try {
        isShowList.value = !isShowList.value;
        if (e.target.getBoundingClientRect().y > 620) {
            toDropList.value = e.target.getBoundingClientRect().y - 130;
        } else {
            toDropList.value = e.target.getBoundingClientRect().y + 32;
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * xử lý click outside list action
 * CreatedBy: NHGiang
 */
const handleClickOutside = () => {
    try {
        isShowList.value = false;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý mở form edit
 * @param {*} accountId
 */
const handleOpenEditForm = async (accountId) => {
    try {
        setTitleForm(MISA_RESOURCE.FORM_TITLE.EDIT_ACCOUNT);
        await getAccountById(accountId);
        setIdentityForm(MISA_ENUM.FORM_MODE.EDIT);
        setIsForm();
        handleSetStatusForm();
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý mở form edit
 * @param {*} accountId
 */
const handleOpenDuplicateForm = async (accountId) => {
    try {
        setTitleForm(MISA_RESOURCE.FORM_TITLE.DUPLICATE_ACCOUNT);
        await getAccountById(accountId);
        setIdentityForm(MISA_ENUM.FORM_MODE.DUPLICATE);
        setIsForm();
        handleSetStatusForm();
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm xóa 1 tài khoản con
 * @param {*} accountId -- ID của tài khoản cần xóa
 * @param {*} parentId -- ID của tài khoản cha
 * @returns
 */
const handleDeleteAccount = async (accountId, parentId) => {
    try {
        isShowPopup.value = false;
        if (parentId) {
            const paymentDetails = await getPaymentDetailsByAccountId(accountId);
            if (paymentDetails.length) {
                isShowWarning.value = true;
            } else {
                await deleteAccountChild(accountId, parentId);
                await getAccountsByFilter(state.keyword, pageSize.value, pageNumber.value);
            }
        } else {
            await deleteAccount(accountId);
            await getAccountsByFilter(state.keyword, pageSize.value, pageNumber.value);
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm xử lý thay đổi trạng thái tài khoản
 * @param {*} accountId
 * @param {*} isActive
 * @param {*} isParent
 */
const handleActiveAccount = async (accountId, isActive, isParent, hasActiveChild) => {
    try {
        if (isParent) {
            if (!hasActiveChild) {
                const accountIds = [accountId];
                const response = await accountApi.getChildrens();

                response.forEach((child) => {
                    try {
                        if (accountIds.includes(child.ParentId)) {
                            accountIds.push(child.AccountId);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });

                await updateIsActiveAccount(accountIds, !isActive);
            } else {
                await updateIsActiveAccount([accountId], !isActive);
            }
        } else {
            await updateIsActiveAccount([accountId], !isActive);
        }
        isShowPopup.value = false;
        await getAccountsByFilter(state.keyword, pageSize.value, pageNumber.value);
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <td class="tbl-col tbl-col__last" style="border-bottom: unset">
        <div class="tbl-col__action">
            <label class="tbl-col__action-edit" @click="handleOpenEditForm(data.AccountId)"
                >Sửa</label
            >
            <label
                class="sidebar-item__icon btn-dropdown"
                :class="isShowList ? 'btn-dropdown--active' : ''"
                style="display: flex; justify-content: center; align-items: center"
                @click="handleDisplayHideListAction"
                v-click-outside-element="handleClickOutside"
            >
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
    <ul
        class="tbl-col__action-list textfield-list--action"
        v-if="isShowList"
        :style="{ top: `${toDropList}px` }"
    >
        <li class="tbl-col__action-item" @click="handleOpenDuplicateForm(data.AccountId)">
            Nhân bản
        </li>
        <li class="tbl-col__action-item" @click="isShowPopup = true">Xóa</li>
        <li
            class="tbl-col__action-item"
            @click="
                data.IsActive
                    ? handleActiveAccount(data.AccountId, data.IsActive, data.IsParent)
                    : data.IsParent
                    ? (isShowPopupActiveChild = true)
                    : handleActiveAccount(data.AccountId, data.IsActive, data.IsParent)
            "
        >
            {{ data.IsActive ? "Ngừng sử dụng" : "Sử dụng" }}
        </li>
    </ul>

    <div class="overlay" v-if="isShowPopup">
        <m-pop-up-warning
            v-if="!data.IsParent"
            :title="MISA_RESOURCE.TITLE.TITLE_DELETE_ACCOUNT.title"
            :text-info="MISA_RESOURCE.TITLE.TITLE_DELETE_ACCOUNT.text(data.AccountNumber)"
            @closeForm="isShowPopup = false"
            @closeWarning="isShowPopup = false"
            @submitForm="handleDeleteAccount(data.AccountId, data.ParentId)"
        />
        <m-pop-up-error
            v-if="data.IsParent"
            :title="MISA_RESOURCE.TITLE.TITLE_DELETE_ACCOUNT_PARENT.title"
            :text-error="MISA_RESOURCE.TITLE.TITLE_DELETE_ACCOUNT_PARENT.text"
            @closeError="isShowPopup = false"
        />
    </div>
    <div class="overlay" v-if="isShowWarning">
        <m-pop-up-error
            v-if="isShowWarning"
            :title="MISA_RESOURCE.TITLE.TITLE_DELETE_ACCOUNT_ARISE_DATA.title"
            :text-error="MISA_RESOURCE.TITLE.TITLE_DELETE_ACCOUNT_ARISE_DATA.text"
            @closeError="isShowWarning = false"
        />
    </div>
    <div class="overlay" v-if="isShowPopupActiveChild">
        <m-pop-up-warning
            :title="MISA_RESOURCE.TITLE.TITLE_CONFIRM_ACTIVE_ACCOUNT_CHILD.title"
            :text-info="MISA_RESOURCE.TITLE.TITLE_CONFIRM_ACTIVE_ACCOUNT_CHILD.text"
            @closeForm="
                isShowPopupActiveChild = false;
                handleActiveAccount(data.AccountId, data.IsActive, data.IsParent, true);
            "
            @closeWarning="isShowPopupActiveChild = false"
            @submitForm="handleActiveAccount(data.AccountId, data.IsActive, data.IsParent, false)"
            :isPrimary="true"
        />
    </div>
</template>

<style scoped></style>
