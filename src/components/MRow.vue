<script setup>
import { formatDate } from "../utilities/formatDate";
import { formatMoney } from "../utilities/formatMoney";
import { useEmployee } from "../composable/useEmployee";
import { inject, ref } from "vue";
import { handleSetStatusForm } from "../utilities/setDefaultStateForm";
import { MISA_ENUM } from "../base/enum";
import { MISA_RESOURCE } from "../base/resource";
const props = defineProps({
    employee: Object,
    listCheck: Array,
});

const { getAnEmployee, editEmployee } = useEmployee();

const emit = defineEmits(["check", "displayWarning"]);
const isShowList = ref(false);
const toDropList = ref(0);

const { state, setIsForm, setTitleForm, setEmployeeSelected, setIdentityForm } = inject("diy");

/**
 * Xử lý check row
 * CreatedBy: NHGiang
 */
const handleCheck = (name) => {
    emit("check", name);
};

/**
 * Xử lý sửa thông tin nhân viên
 * CreateBy: NHGiang
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
 * Xử lý hiển thị popup cảnh báo khi xóa
 * CreatedBy: NHGiang
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
 * Xử lý hiển thị droplist action
 * CreatedBy: NHGiang
 */
const handleDisplayHideListAction = (e) => {
    try {
        isShowList.value = !isShowList.value;
        toDropList.value = e.target.getBoundingClientRect().y + 32;
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
    <tr class="tbl-row" @dblclick="handleEditEmployee(employee.EmployeeId)">
        <td class="tbl-col tbl-col__first">
            <input
                type="checkbox"
                class="tbl-checkbox"
                :id="employee.EmployeeId"
                :value="employee.EmployeeId"
                @change="handleCheck(employee.EmployeeId)"
                :checked="listCheck.includes(employee.EmployeeId)"
            />
            <label :for="employee.EmployeeId" class="mask">
                <div
                    :style="{
                        background:
                            'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -1225px -363px',
                        width: '14px',
                        height: '11px',
                    }"
                ></div>
            </label>
        </td>
        <td class="tbl-col">
            <span>{{ employee.EmployeeCode || "" }}</span>
        </td>
        <td class="tbl-col tbl-col--large">{{ employee.FullName || "" }}</td>
        <td class="tbl-col">
            {{ employee.Gender === MISA_ENUM.GENDER.OTHER ? "Khác" : employee.GenderName }}
        </td>
        <td class="tbl-col" style="text-align: center">
            {{ formatDate(employee.DateOfBirth) || "" }}
        </td>
        <td class="tbl-col">{{ employee.Position || "" }}</td>
        <td class="tbl-col tbl-col--large">{{ employee.DepartmentName || "" }}</td>
        <td class="tbl-col">{{ employee.IdentityNumber || "" }}</td>
        <td class="tbl-col">{{ employee.PhoneNumber || "" }}</td>
        <td class="tbl-col">{{ employee.BankAccount || "" }}</td>
        <td class="tbl-col">{{ employee.BankName || "" }}</td>
        <td class="tbl-col">{{ employee.BankBranch || "" }}</td>
        <td class="tbl-col" style="text-align: right; width: 129px; min-width: 129px">
            {{ formatMoney(employee.Salary) || "" }}
        </td>
        <td class="tbl-col tbl-col__last">
            <div class="tbl-col__action">
                <label class="tbl-col__action-edit" @click="handleEditEmployee(employee.EmployeeId)"
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
            <li class="tbl-col__action-item" @click="isShowList = false">Ngừng sử dụng</li>
        </ul>
    </tr>
</template>

<style scoped></style>
