<script setup>
import { formatDate } from "../utilities/formatDate";
import { formatMoney } from "../utilities/formatMoney";
import { useEmployee } from "../composable/useEmployee";
import { inject } from "vue";
const props = defineProps({
    employee: Object,
    listCheck: Array,
});

const { getAnEmployee, editEmployee } = useEmployee();

const emit = defineEmits(["check"]);

const { state, setIsForm, setTitleForm, setEmployeeSelected } = inject("diy");

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
        setTitleForm("Sửa thông tin nhân viên");
        setIsForm();
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <tr class="tbl-row">
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
                    style="
                        background: url('../../src/assets/img/Sprites.64af8f61.svg') no-repeat -1225px -363px;
                        width: 14px;
                        height: 11px;
                    "
                ></div>
            </label>
        </td>
        <td class="tbl-col">
            <span>{{ employee.EmployeeCode || "" }}</span>
        </td>
        <td class="tbl-col tbl-col--large">{{ employee.FullName || "" }}</td>
        <td class="tbl-col">{{ employee.GenderName || "" }}</td>
        <td class="tbl-col" style="text-align: center">
            {{ formatDate(employee.DateOfBirth) || "" }}
        </td>
        <td class="tbl-col">{{ employee.PositionName || "" }}</td>
        <td class="tbl-col">{{ employee.IdentityNumber || "" }}</td>
        <td class="tbl-col">{{ employee.PhoneNumber || "" }}</td>
        <td class="tbl-col" style="text-align: right; width: 129px; min-width: 129px">
            {{ formatMoney(employee.Salary) || "" }}
        </td>
        <td class="tbl-col tbl-col__last">
            <div class="tbl-col__action">
                <label class="tbl-col__action-edit" @click="handleEditEmployee(employee.EmployeeId)"
                    >Sửa</label
                >
                <label
                    class="sidebar-item__icon"
                    style="display: flex; justify-content: center; align-items: center"
                    onclick="handleDisplayDroplist('index')"
                >
                    <div
                        class="btn-dropdown"
                        style="
                            background: url('../../src/assets/img/Sprites.64af8f61.svg') no-repeat -900px -365px;
                            width: 8px;
                            height: 5px;
                        "
                    ></div>
                </label>
            </div>
        </td>
    </tr>
</template>

<style scoped></style>
