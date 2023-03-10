<script setup>
import { formatDate } from "../utilities/formatDate";
import { formatMoney } from "../utilities/formatMoney";
import { useEmployee } from "../composable/useEmployee";
import { inject, ref } from "vue";
import { handleSetStatusForm } from "../utilities/setDefaultStateForm";
import { MISA_ENUM } from "../base/enum";
import { MISA_RESOURCE } from "../base/resource";
import MPopUpError from "./MPopUpError.vue";

// Định nghĩa các props nhận vào
const props = defineProps({
    entity: Object,
    listCheck: Array,
    hasCheckbox: Boolean,
});

const { getAnEmployee, editEmployee } = useEmployee();

const emit = defineEmits(["check", "displayWarning"]);
const isShowList = ref(false); // Trạng thái ẩn hiện danh sách chức năng (Nhân bản, Xóa)
const toDropList = ref(0); // Khoảng cách của danh sách chức năng so với top của cửa số trình duyệt
const isOpen = ref(false); // Trạng thái popup thông báo chức năng chưa thi công

const { state, setIsForm, setTitleForm, setEmployeeSelected, setIdentityForm } = inject("diy");

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
const handleEditEmployee = async (employeeId) => {
    try {
        await getAnEmployee(employeeId);
        setEmployeeSelected(editEmployee);
        setTitleForm(MISA_RESOURCE.FORM_TITLE.EDIT);
        setIsForm();
        setIdentityForm(MISA_ENUM.FORM_MODE.EDIT);
        handleSetStatusForm();
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm xử lý Mở form nhân bản thông tin nhân viên và bindding dữ liệu vào form
 * @param {String} employeeId -- Id của nhân viên được chọn
 * Created by: NHGiang - (20/02/23)
 */
const handleDuplicateEmployee = async (employeeId) => {
    try {
        await getAnEmployee(employeeId);
        setEmployeeSelected({ ...editEmployee.value, EmployeeCode: "" });
        setTitleForm(MISA_RESOURCE.FORM_TITLE.DUPLICATE);
        setIsForm();
        setIdentityForm(MISA_ENUM.FORM_MODE.DUPLICATE);
        handleSetStatusForm();
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
    <tr class="tbl-row" @dblclick="handleEditEmployee(entity.PaymentId)">
        <td class="tbl-col tbl-col__first" v-if="hasCheckbox">
            <input
                type="checkbox"
                class="tbl-checkbox"
                :id="entity.PaymentId"
                :value="entity.PaymentId"
                @change="handleCheckItem(entity.PaymentId)"
            />
            <label :for="entity.PaymentId" class="mask">
                <div class="mask-icon"></div>
            </label>
        </td>
        <td class="tbl-col tbl-align-center">
            <span>{{ entity.AccountingDate || "" }}</span>
        </td>
        <td class="tbl-col tbl-align-center">{{ entity.VouchersDate || "" }}</td>
        <td class="tbl-col">
            {{ entity.VoucherNumber || "" }}
        </td>
        <td class="tbl-col">{{ entity.Explain || "" }}</td>
        <td class="tbl-col tbl-align-right">{{ formatMoney(entity.Money) || "" }}</td>
        <td class="tbl-col">{{ entity.SubjectId || "" }}</td>
        <td class="tbl-col">{{ entity.SubjectName || "" }}</td>
        <td class="tbl-col">{{ entity.Address || "" }}</td>
        <td class="tbl-col tbl-col__last">
            <div class="tbl-col__action">
                <label class="tbl-col__action-edit" @click="handleEditEmployee(entity.PaymentId)"
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
                    handleDuplicateEmployee(employee.EmployeeId);
                "
            >
                Nhân bản
            </li>
            <li
                class="tbl-col__action-item"
                @click="
                    handleDisplayPopUpWarning({
                        id: employee.EmployeeId,
                        code: employee.EmployeeCode,
                    })
                "
            >
                Xóa
            </li>
            <li
                class="tbl-col__action-item"
                @click="
                    isShowList = false;
                    isOpen = true;
                "
            >
                Ngừng sử dụng
            </li>
        </ul>

        <div class="modal-error" v-if="isOpen">
            <m-pop-up-error
                v-if="isOpen"
                :title="'Thông báo'"
                :text-error="`Chức năng chưa thi công.`"
                @closeError="isOpen = !isOpen"
            />
        </div>
    </tr>
</template>
