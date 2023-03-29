<script setup>
import { ref, inject, reactive, watch, watchEffect } from "vue";
import Mrow from "./MRow.vue";
import MPopUpWarning from "./MPopUpWarning.vue";
import { useRoute } from "vue-router";
import { usePayment } from "../composable/usePayment";
import { formatMoney } from "../utilities/formatMoney";
import { usePaymentDeatil } from "../composable/usePaymentDetail";

const props = defineProps({
    columns: Array,
    hasCheckbox: Boolean,
    entities: { type: Array, default: [] },
    maxHeight: Number,
    totalPayment: String,
});

const { deletePaymentById, getPaymentsByFilter } = usePayment();
const { getPaymentDetailsByPaymentId } = usePaymentDeatil();
const { state, setListItemChecked, setListPageChecked, setRowPaymentSelected, setlistAllEntities } =
    inject("diy");

const isPopUp = reactive({
    isOpenWarning: false, // Trạng thái Đóng/Mở pop up warning
});

const route = useRoute(); // Object route lấy từ vue-router
const pageNumber = ref(1); // Trang thứ bao nhiêu
const pageSize = ref(20); // Số bản ghi trên 1 trang
const listPageChecked = ref([]); // Mảng chứa các số trang thứ bao nhiêu đã được check all
const id = ref(null); // Id của nhân viên muốn xóa
const code = ref(null); // Mã của nhân viên muôn xóa
const listCheck = ref([]); // mảng chứa các ID của các nhân viên đã được check
const listTemporary = ref([]); // mảng tạm lưu thông tin của các ID của các nhân viên đã được check trong trang

watchEffect(() => {
    setRowPaymentSelected(props.entities[0]?.PaymentId);
});

watch(
    () => state.rowPaymentSelected,
    async (newValue) => {
        try {
            await getPaymentDetailsByPaymentId(newValue);
        } catch (error) {
            console.log(error);
        }
    }
);

/**
 * Lấy ra trang thứ n sử dụng vue-router
 * created by: NHGiang
 */
watch(
    () => route.query.pageNumber,
    (newValue) => {
        try {
            if (listTemporary.value.length === state.payments.length) {
                listTemporary.value = [];
            }
            pageNumber.value = Number(newValue);
        } catch (error) {
            console.log(error);
        }
    }
);

watch(
    () => route.query.pageSize,
    (newValue) => {
        try {
            pageSize.value = newValue;
        } catch (error) {
            console.log(error);
        }
    }
);

const emit = defineEmits(["hideModal", "startDelete", "endDelete"]);

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

        if (listTemporary.value.length === state.payments.length) {
            listPageChecked.value.push(pageNumber.value);
        } else {
            listPageChecked.value = listPageChecked.value.filter((num) => num !== pageNumber.value);
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
        // mảng danh sách ID của các nhân viên tại trang hiện tại
        const currentListEmployees = state.payments.map((payment) => payment.PaymentId);

        /**
         * Kiểm tra trang thứ n đã được check all
         * - Nếu chưa check all -> Thêm tất cả các ID của các nhân viên trang hiện tại vào mảng listcheck
         * - Nếu đã check all -> bỏ check all -> xóa các ID có trong trang ra khỏi mảng listCheck
         * - Nếu check 1 vài element -> Thực hiện thêm các ID còn lại vào mảng listCheck
         */
        if (!listPageChecked.value.includes(pageNumber.value)) {
            currentListEmployees.forEach((element) => {
                if (!listCheck.value.includes(element)) {
                    listCheck.value.push(element);
                }
            });
            listTemporary.value = [...currentListEmployees];
            listPageChecked.value.push(pageNumber.value);
        } else {
            listPageChecked.value = listPageChecked.value.filter((num) => num !== pageNumber.value);
            listTemporary.value = [];
            listCheck.value = listCheck.value.reduce((result, cur) => {
                try {
                    if (!currentListEmployees.includes(cur)) {
                        result.push(cur);
                    }
                    return result;
                } catch (error) {
                    console.log(error);
                }
            }, []);
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
        const newListAllEntities = state.listAllEntities.filter(
            (entity) => entity.PaymentId !== id.value
        );
        setlistAllEntities(newListAllEntities);
        await deletePaymentById(id.value);
        await getPaymentsByFilter(state.keyword, pageSize.value, pageNumber.value);
    } catch (err) {
        console.log(err);
    }
};

/**
 * Lấy ra danh sách các item đã được check
 * created by: NHGiang
 */
watch(
    () => listCheck.value.length,
    (newValue) => {
        try {
            setListItemChecked(listCheck);
        } catch (error) {
            console.log(error);
        }
    }
);

/**
 * Lấy ra danh sách các trang đã được check all
 * created by: NHGiang - (22/02/23)
 */
watch(
    () => listPageChecked.value.length,
    (newValue) => {
        try {
            setListPageChecked(listPageChecked);
        } catch (error) {
            console.log(error);
        }
    }
);
</script>

<template>
    <table class="tbl">
        <tbody
            :style="{
                maxHeight: `${maxHeight - 108}px`,
            }"
        >
            <tr class="tbl-row">
                <th
                    class="tbl-col tbl-col__first tbl-col__first--bg-private"
                    style="z-index: 99"
                    v-if="hasCheckbox"
                >
                    <input
                        type="checkbox"
                        id="toggle"
                        @change="handleCheckAll"
                        :checked="listCheck.length > 0 && listPageChecked.includes(pageNumber)"
                    />

                    <label for="toggle" class="mask">
                        <div class="mask-icon"></div>
                    </label>
                </th>
                <th
                    :class="`tbl-col ${column.isLarge ? 'tbl-col--large' : ''}`"
                    :style="{
                        width: column.width,
                        minWidth: column.width,
                        textAlign: column.align,
                    }"
                    v-for="(column, index) in columns"
                    :key="index"
                >
                    {{ column.columnName }}
                </th>
                <th class="tbl-col tbl-col__last tbl-col__last--bg-private" style="z-index: 99">
                    chức năng
                </th>
            </tr>
            <mrow
                v-for="(entity, index) in entities"
                :key="index"
                :entity="entity"
                :has-checkbox="hasCheckbox"
                :list-check="listCheck"
                @check="setListCheck($event)"
                @displayWarning="handleShowWarning($event)"
            />
            <div v-if="!entities.length" class="not-found">
                <img
                    src="https://actappg2.misacdn.net/img/bg_report_nodata.76e50bd8.svg"
                    alt="logo NotFound"
                />
                <span style="margin-bottom: 80px">Không có dũ liệu</span>
            </div>
            <tr class="tbl-row" v-if="entities.length">
                <th class="row-last" style="z-index: 99"></th>
                <th class="row-last" style="text-align: center">Tổng</th>
                <th class="row-last" colspan="3"></th>
                <th class="row-last tbl-col" style="text-align: right">
                    {{ formatMoney(totalPayment) }}
                </th>
                <th class="row-last" colspan="4"></th>
            </tr>
            <div class="modal-error" v-if="isPopUp.isOpenWarning">
                <m-pop-up-warning
                    v-if="isPopUp.isOpenWarning"
                    :title="'Xác nhận xóa'"
                    :text-info="`Bạn có thực sự muốn xóa chứng từ \<${code}\> không?`"
                    @closeWarning="isPopUp.isOpenWarning = !isPopUp.isOpenWarning"
                    @closeForm="isPopUp.isOpenWarning = !isPopUp.isOpenWarning"
                    @submitForm="
                        hanldeSubmitFormDelete($event);
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
