<script setup>
import { ref, inject, watch } from "vue";
import MToast from "../components/MToast.vue";
import MInputMoney from "../components/MInputMoney.vue";
import MTable from "../components/MTable.vue";
import MRow from "../components/MRow.vue";
import { useTest } from "../composable/useTest";

const { state, setListToast } = inject("diy");
const listCheck = ref([]);

const salary = ref(100000);

const handleShowToast = () => {
    try {
        const toast = {
            toastMessage: "Công việc đã vị xóa.",
            statusMessage: "Thành công!",
            status: 0,
        };
        setListToast(toast);
    } catch (error) {
        console.log(error);
    }
};

const { listDepartments, getDepartments } = useTest();
getDepartments();
console.log(listDepartments);

/*
 * Xử lý set giá trị listcheck
 * CreateBy: NHGiang
 */
const setListCheck = (e) => {
    try {
        if (listCheck.value.includes(e)) {
            listCheck.value.splice(listCheck.value.indexOf(e), 1);
            listTemporary.value.splice(listCheck.value.indexOf(e), 1);
        } else {
            listCheck.value.push(e);
            listTemporary.value.push(e);
        }

        if (listTemporary.value.length === state.listEmployees.length) {
            listPageChecked.value.push(pageNumber.value);
        } else {
            listPageChecked.value = listPageChecked.value.filter((num) => num !== pageNumber.value);
        }
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div>
        About
        <button @click="handleShowToast">Show toast</button>

        <m-toast
            v-for="(toast, index) in state.listToast"
            :key="index"
            :toastMessage="toast.toastMessage"
            :statusMessage="toast.statusMessage"
            :status="toast.status"
        />
        <m-input-money v-model="salary" fieldText="Lương" @update:modelValue="salary = $event" />
        <strong>Lương của nhân viên: {{ salary }}</strong>
        <table class="tbl">
            <tbody>
                <tr class="tbl-row">
                    <th
                        class="tbl-col tbl-col__first tbl-col__first--bg-private"
                        style="z-index: 99"
                    >
                        <input
                            type="checkbox"
                            id="toggle"
                            @change="handleCheckAll"
                            :checked="listCheck.length > 0 && listPageChecked.includes(pageNumber)"
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
                    <th class="tbl-col tbl-col--large">đơn vị</th>
                    <th class="tbl-col">
                        <label
                            class="tbl-col__identity"
                            @mouseover="isShowTooltip = true"
                            @mouseout="isShowTooltip = false"
                            >số CMND</label
                        >
                        <p v-if="isShowTooltip" class="tbl-col__identity-tooltip">
                            Số chứng minh nhân dân
                        </p>
                    </th>
                    <th class="tbl-col">số điện thoại</th>
                    <th class="tbl-col" style="text-align: right; width: 129px; min-width: 129px">
                        tiền lương
                    </th>
                    <th class="tbl-col tbl-col__last tbl-col__last--bg-private" style="z-index: 99">
                        chức năng
                    </th>
                </tr>
                <m-row
                    v-for="employee in listDepartments"
                    :key="employee.EmployeeId"
                    :employee="employee"
                    :listCheck="listCheck"
                    @check="setListCheck($event)"
                    @displayWarning="handleShowWarning($event)"
                />
            </tbody>
        </table>
    </div>
</template>

<style scoped></style>
