<script setup>
import { ref, inject, reactive } from "vue";
import Mrow from "./MRow.vue";
import MLoading from "../components/MLoading.vue";
import MPopUpWarning from "./MPopUpWarning.vue";
import { useEmployee } from "../composable/useEmployee";
import { useRoute } from "vue-router";

const route = useRoute();

const { listEmployees, handleFilterPage, totalRecord, totalPage, handleDeleteEmployee } =
    useEmployee();
handleFilterPage(route.query.pageSize, 1);

const isPopUp = reactive({
    isOpenWarning: false,
});

const id = ref(null);
const code = ref(null);
const isShowTooltip = ref(false);
const pageNumber = ref(0);

const listCheck = ref([]);
const { state, setListEmployees, setTotalEmployee, setTotalPage } = inject("diy");
setListEmployees(listEmployees);
setTotalEmployee(totalRecord);
setTotalPage(totalPage);

const emit = defineEmits(["hideModal", "startDelete", "endDelete"]);

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

/**
 * Xử lý hiển thị popup warning
 * CreatedBy: NHGiang
 */
const handleShowWarning = (event) => {
    try {
        isPopUp.isOpenWarning = true;
        id.value = event.id;
        code.value = event.code;
    } catch (error) {
        console.log(error);
    }
};

/**
 *  Xử lý submit form khi xóa nhân viên
 * CreatedBy: NHGiang
 */
const hanldeSubmitFormDelete = async () => {
    try {
        emit("startDelete");
        await handleDeleteEmployee(id.value);
        emit("endDelete");
    } catch (err) {
        console.log(err);
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
            <mrow
                v-for="employee in state.listEmployees"
                :key="employee.EmployeeId"
                :employee="employee"
                :listCheck="listCheck"
                @check="setListCheck($event)"
                @displayWarning="handleShowWarning($event)"
            />
            <div v-if="!state.listEmployees.length" class="tbl-loading">
                <m-Loading />
            </div>
            <div class="modal-error" v-if="isPopUp.isOpenWarning">
                <m-pop-up-warning
                    v-if="isPopUp.isOpenWarning"
                    :title="'Xác nhận xóa'"
                    :text-info="`Bạn có thực sự muốn xóa Nhân viên ${code} không?`"
                    @closeWarning="isPopUp.isOpenWarning = !isPopUp.isOpenWarning"
                    @closeForm="isPopUp.isOpenWarning = !isPopUp.isOpenWarning"
                    @submitForm="
                        hanldeSubmitFormDelete();
                        isPopUp.isOpenWarning = !isPopUp.isOpenWarning;
                    "
                />
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
