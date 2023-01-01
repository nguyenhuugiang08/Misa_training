<script setup>
import { ref, inject } from "vue";
import Mrow from "./MRow.vue";
import MLoading from "../components/MLoading.vue";
import { useEmployee } from "../composable/useEmployee";

const { listEmployees, getAllEmployees } = useEmployee();
getAllEmployees();

const listCheck = ref([]);
const { state, setListEmployees } = inject("diy");
setListEmployees(listEmployees);

/*
 * Xử lý set giá trị listcheck
 * CreateBy: NHGiang
 */
const setListCheck = (e) => {
    try {
        if (listCheck.value.includes(e)) {
            listCheck.value.splice(listCheck.value.indexOf(e), 1);
        } else {
            listCheck.value.push(e);
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý check all
 * CreateBy: NHGiang
 */

const handleCheckAll = () => {
    try {
        if (listCheck.value.length === 0 || listCheck.value.length < state.listEmployees.length) {
            listCheck.value = [...state.listEmployees.map((employee) => employee.EmployeeId)];
        } else {
            listCheck.value = [];
        }
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <table class="tbl">
        <tbody>
            <tr class="tbl-row">
                <th class="tbl-col tbl-col__first tbl-col__first--bg-private" style="z-index: 99">
                    <input
                        type="checkbox"
                        id="toggle"
                        @change="handleCheckAll"
                        :checked="
                            listCheck.length > 0 && listCheck.length === state.listEmployees.length
                        "
                    />
                    <label for="toggle" class="mask">
                        <div
                            style="
                                background: url('../../src/assets/img/Sprites.64af8f61.svg')
                                    no-repeat -1225px -363px;
                                width: 14px;
                                height: 11px;
                            "
                        ></div>
                    </label>
                </th>
                <th class="tbl-col">mã nhân viên</th>
                <th class="tbl-col tbl-col--large">tên nhân viên</th>
                <th class="tbl-col">giới tính</th>
                <th class="tbl-col" style="text-align: center">ngày sinh</th>
                <th class="tbl-col">vị trí</th>
                <th class="tbl-col" title="Số chứng minh nhân dân">số CMND</th>
                <th class="tbl-col">số điện thoại</th>
                <th class="tbl-col" style="text-align: right; width: 129px; min-width: 129px">
                    tiền lương
                </th>
                <th class="tbl-col tbl-col__last tbl-col__last--bg-private" style="z-index: 99">
                    chức năng
                </th>
            </tr>
            <mrow
                v-for="employee in state.listEmployees"
                :key="employee.EmployeeId"
                :employee="employee"
                :listCheck="listCheck"
                @check="setListCheck($event)"
            />
            <div v-if="!state.listEmployees.length" class="tbl-loading">
                <m-Loading />
            </div>
        </tbody>
    </table>
</template>

<style scoped>
.tbl-loading {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
</style>
