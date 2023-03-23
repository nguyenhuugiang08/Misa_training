<script setup>
import { formatDate } from "../utilities/formatDate";
import { formatMoney } from "../utilities/formatMoney";
import { inject, ref } from "vue";
import { handleSetStatusForm } from "../utilities/setDefaultStateForm";
import { MISA_ENUM } from "../base/enum";
import { usePayment } from "../composable/usePayment";
import { usePaymentDeatil } from "../composable/usePaymentDetail";
import { useRouter } from "vue-router";

// Định nghĩa các props nhận vào
const props = defineProps({
    entity: Object,
    listCheck: Array,
    hasCheckbox: Boolean,
});

const { getPaymentById } = usePayment();
const { getPaymentDetailsByPaymentId } = usePaymentDeatil();

const emit = defineEmits(["check", "displayWarning"]);
const isShowList = ref(false); // Trạng thái ẩn hiện danh sách chức năng (Nhân bản, Xóa)
const toDropList = ref(0); // Khoảng cách của danh sách chức năng so với top của cửa số trình duyệt

const router = useRouter();

const { state, setIdentityForm, setRowPaymentSelected } = inject("diy");

/**
 * Hàm xử lý check 1 dòng
 * @param {String} itemId -- ID của đối tượng
 * Created by: NHGiang - (20/02/23)
 */
const handleCheckItem = (itemId) => {
    emit("check", itemId);
};

/**
 * Hàm xử lý Mở form sửa thông tin nhân viên và bindding dữ liệu vào form
 * @param {String} employeeId -- Id của nhân viên được chọn
 * Created by: NHGiang - (20/02/23)
 */
const handleEditPayment = async (paymentId) => {
    try {
        await getPaymentById(paymentId);
        await getPaymentDetailsByPaymentId(paymentId);
        router.push("/pay/pay-detail");
        handleSetStatusForm();
        setIdentityForm(MISA_ENUM.FORM_MODE.EDIT);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm xử lý Mở form nhân bản thông tin nhân viên và bindding dữ liệu vào form
 * @param {String} employeeId -- Id của nhân viên được chọn
 * Created by: NHGiang - (20/02/23)
 */
const handleDuplicateEmployee = async (paymentId) => {
    try {
        await getPaymentById(paymentId);
        router.push("/pay/pay-detail");
    } catch (error) {
        console.log(error);
    }
};

/**
 * hàm xử lý hiện pop up cảnh báo khi xóa
 * @param {Object} value -- object { Mã nhân viên, tên nhân viên } của nhân viên được chọn
 * Created by: NHGiang - (20/02/23)
 */
const handleDisplayPopUpWarning = (value) => {
    try {
        isShowList.value = false;
        emit("displayWarning", value);
    } catch (error) {
        console.log(error);
    }
};

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
</script>

<template>
    <tr
        class="tbl-row"
        @dblclick="handleEditPayment(entity.PaymentId)"
        @click="setRowPaymentSelected(entity.PaymentId)"
        :style="{ background: state.rowPaymentSelected === entity.PaymentId ? '#e5f3ff' : '' }"
    >
        <td
            class="tbl-col tbl-col__first"
            v-if="hasCheckbox"
            :style="{
                background:
                    state.rowPaymentSelected === entity.PaymentId ? '#e5f3ff !important' : '',
            }"
        >
            <input
                type="checkbox"
                class="tbl-checkbox"
                :id="entity.PaymentId"
                :value="entity.PaymentId"
                :checked="listCheck.includes(entity.PaymentId)"
                @change="handleCheckItem(entity.PaymentId)"
            />
            <label :for="entity.PaymentId" class="mask">
                <div class="mask-icon"></div>
            </label>
        </td>
        <td class="tbl-col tbl-align-center">
            <span>{{ formatDate(entity.PostedDate) || "" }}</span>
        </td>
        <td class="tbl-col tbl-align-center">{{ formatDate(entity.RefDate) || "" }}</td>
        <td class="tbl-col">
            {{ entity.RefNo || "" }}
        </td>
        <td class="tbl-col">{{ entity.Reason || "" }}</td>
        <td class="tbl-col tbl-align-right">{{ formatMoney(entity.TotalAmount) || "" }}</td>
        <td class="tbl-col">{{ entity.ObjectCode || "" }}</td>
        <td class="tbl-col">{{ entity.ObjectName || "" }}</td>
        <td class="tbl-col" style="width: 280px">{{ entity.Address || "" }}</td>
        <td
            class="tbl-col tbl-col__last"
            :style="{
                background:
                    state.rowPaymentSelected === entity.PaymentId ? '#e5f3ff !important' : '',
            }"
        >
            <div class="tbl-col__action">
                <label class="tbl-col__action-edit" @click="handleEditPayment(entity.PaymentId)"
                    >Xem</label
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
            <li
                class="tbl-col__action-item"
                @click="
                    isShowList = false;
                    handleDuplicateEmployee(entity.PaymentId);
                "
            >
                Nhân bản
            </li>
            <li
                class="tbl-col__action-item"
                @click="
                    handleDisplayPopUpWarning({
                        id: entity.PaymentId,
                        code: entity.RefNo,
                    })
                "
            >
                Xóa
            </li>
        </ul>
    </tr>
</template>
