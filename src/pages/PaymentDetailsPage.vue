<script setup>
import { MISA_RESOURCE } from "../base/resource";
import MCheckbox from "../components/MCheckbox.vue";
import MInput from "../components/MInput.vue";
import MDateField from "../components/MDateField.vue";
import { formatMoney } from "../utilities/formatMoney";
import MTableDetail from "../components/MTableDetail.vue";
import MComboButton from "../components/MComboButton.vue";
import { useObject } from "../composable/useObject";
import { useEmployee } from "../composable/useEmployee";
import { inject, reactive } from "vue";
import { useRouter } from "vue-router";

const { state } = inject("diy");
const router = useRouter();

const payment = reactive({
    Address: "5 Quang Trung",
    Attachment: 34,
    EmployeeId: "36ac2df8-2b1e-368f-cc1d-086412a8ea97",
    ObjectCode: "DT38754",
    ObjectId: "623f47c1-32bb-31ef-9a28-186a78c3f39e",
    ObjectName: "Trần Văn Chính",
    PostedDae: "2022-01-01T0:0:06",
    Reason: "Chi cho Nguyễn Hoài Nam",
    ReasonType: 4,
    Receiver: "Trần Thị Diệp",
    RefDate: "",
    RefId: "33626e75-13bc-4219-5b33-57d1d013a38f",
    RefNo: "PC80044",
    TotalAmount: 12.2395,
});

const { getObjects } = useObject();
getObjects();

const { getAllEmployees } = useEmployee();
getAllEmployees();
</script>

<template>
    <div class="payment">
        <div class="payment-header">
            <div class="payment-header__left">
                <div class="m-icon">
                    <div class="payment-header__icon"></div>
                </div>
                <div class="payment-title">Phiếu chi PC001</div>
                <div class="checkbox-wrapper">
                    <m-checkbox
                        :default="MISA_RESOURCE.PAY_ACTIVE[6].optionId"
                        :options="MISA_RESOURCE.PAY_ACTIVE"
                        :width="'290px'"
                    />
                </div>
            </div>
            <div class="payment-header__right">
                <div class="m-icon">
                    <div class="instruct-icon"></div>
                </div>
                <router-link to="/" class="instruct-link">Hướng dẫn</router-link>
                <div class="m-icon m-icon__second">
                    <div class="setting-icon"></div>
                </div>
                <div class="m-icon m-icon__second">
                    <div class="help-icon"></div>
                </div>
                <div class="m-icon m-icon__second">
                    <div class="close-icon"></div>
                </div>
            </div>
        </div>
        <div class="payment-content">
            <div class="container-left">
                <div class="row">
                    <div class="checkbox-wrapper">
                        <m-checkbox
                            text-label="Mã đối tượng"
                            width="424px"
                            :options="state.objects"
                            :isTable="true"
                            :columns="MISA_RESOURCE.COLUMNS_NAME_COMBOBOX_OBJECT"
                            bottom="8px"
                            marginRight="12px"
                            @select="
                                payment.ObjectId = $event.optionId;
                                payment.ObjectName = $event.optionName;
                                payment.Address = $event.optionAddress;
                            "
                        />
                    </div>
                    <m-input
                        field-text="Tên đối tượng"
                        width="424px"
                        bottom="8px"
                        :value="payment.ObjectName"
                    />
                </div>
                <div class="row">
                    <m-input
                        field-text="Người nhận"
                        width="424px"
                        bottom="8px"
                        margin-right="12px"
                        :value="payment.ObjectName"
                    />
                    <m-input
                        field-text="Địa chỉ"
                        width="424px"
                        bottom="8px"
                        :value="payment.Address"
                    />
                </div>
                <m-input field-text="Lý do chi" width="860px" bottom="8px" />
                <div class="row">
                    <div class="checkbox-wrapper">
                        <m-checkbox
                            text-label="Nhân viên"
                            width="424px"
                            :options="state.employees"
                            :isTable="true"
                            :columns="MISA_RESOURCE.COLUMNS_NAME_COMBOBOX_EMPLOYEE"
                            bottom="8px"
                            marginRight="12px"
                        />
                    </div>
                    <m-input
                        field-text="Kèm theo"
                        width="106px"
                        bottom="8px"
                        place-holder="số lượng"
                        place-holder-align="right"
                    />
                    <div class="row-text">chứng từ gốc</div>
                </div>
                <div>Tham chiếu</div>
            </div>
            <div class="container-center">
                <m-date-field field-text="Ngày hạch toán" bottom="8px" width="166px" />
                <m-date-field field-text="Ngày phiếu chi" bottom="8px" width="166px" />
                <m-input field-text="Số phiếu chi" width="166px" value="PC001" />
            </div>
            <div class="container-right">
                Tổng tiền
                <div class="payment-total">{{ formatMoney(0) }}</div>
            </div>
        </div>
        <div class="payment-detail">
            <div class="payment-detail-title">Hạch toán</div>
            <m-table-detail
                :entities="[1, 2, 3]"
                :columns="MISA_RESOURCE.COLUMNS_NAME_TABLE_DETAIL"
                :has-column-delete="true"
                isEdit
            />

            <div class="payment-action">
                <button class="btn btn-secondary payment-action__btn">Thêm dòng</button>
                <button class="btn btn-secondary payment-action__btn">Xóa hết dòng</button>
            </div>
        </div>
        <div class="import-footer">
            <button class="btn btn-secondary btn-import-prev pay-cancel-btn" @click="router.go(-1)">
                Hủy
            </button>
            <div class="footer-right">
                <button type="submit" class="btn btn-secondary payment-btn-save" tabindex="0">
                    Cất
                </button>
                <MComboButton
                    :default="MISA_RESOURCE.BUTTON_ACTION_SAVE[0].optionName"
                    :options="MISA_RESOURCE.BUTTON_ACTION_SAVE"
                />
            </div>
        </div>
    </div>
</template>

<style>
.payment-btn-save {
    margin: 0 8px;
    color: #fff;
    background-color: transparent;
    border: 1px solid #8d9096;
}

.payment-btn-save:hover {
    background-color: #2f3034;
}

.payment-btn-save::after {
    content: "Cất (Ctrl + S)";
    position: absolute;
    background-color: #434242;
    color: #fff;
    top: -30px;
    width: max-content;
    padding: 4px 8px;
    border-radius: 4px;
    display: none;
    line-height: 18px;
    animation: identifier 0.3s ease-in;
}

.payment-btn-save:hover::after {
    display: block;
}

.pay-cancel-btn {
    height: 100%;
    display: flex;
    justify-content: center;
    color: #fff !important;
    align-items: center;
}
</style>
