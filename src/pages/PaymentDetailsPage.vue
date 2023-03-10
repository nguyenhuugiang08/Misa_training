<script setup>
import { MISA_RESOURCE } from "../base/resource";
import MCheckbox from "../components/MCheckbox.vue";
import MInput from "../components/MInput.vue";
import MDateField from "../components/MDateField.vue";
import { formatMoney } from "../utilities/formatMoney";
import MTableDetail from "../components/MTableDetail.vue";
import MComboButton from "../components/MComboButton.vue";
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
                            :default="MISA_RESOURCE.PAY_ACTIVE[1].optionId"
                            :options="MISA_RESOURCE.PAY_ACTIVE"
                            bottom="8px"
                            marginRight="12px"
                        />
                    </div>
                    <m-input field-text="Tên đối tượng" width="424px" bottom="8px" />
                </div>
                <div class="row">
                    <m-input
                        field-text="Người nhận"
                        width="424px"
                        bottom="8px"
                        margin-right="12px"
                    />
                    <m-input field-text="Địa chỉ" width="424px" bottom="8px" />
                </div>
                <m-input field-text="Lý do chi" width="860px" bottom="8px" />
                <div class="row">
                    <div class="checkbox-wrapper">
                        <m-checkbox
                            text-label="Nhân viên"
                            width="424px"
                            :default="MISA_RESOURCE.PAY_ACTIVE[1].optionId"
                            :options="MISA_RESOURCE.PAY_ACTIVE"
                            bottom="8px"
                            marginRight="12px"
                        />
                    </div>
                    <m-input field-text="Kèm theo" width="106px" bottom="8px" />
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
                <div class="payment-total">{{ formatMoney(1233342) }}</div>
            </div>
        </div>
        <div class="payment-detail">
            <div class="payment-detail-title">Hạch toán</div>
            <m-table-detail
                :entities="[1, 2, 3]"
                :columns="MISA_RESOURCE.COLUMNS_NAME_TABLE_DETAIL"
                :has-column-delete="true"
            />

            <div class="payment-action">
                <button class="btn btn-secondary payment-action__btn">Thêm dòng</button>
                <button class="btn btn-secondary payment-action__btn">Xóa hết dòng</button>
            </div>
        </div>
        <div class="import-footer">
            <button class="btn btn-secondary btn-import-prev">
                <router-link to="/cash/procedure" class="pay-cancel-btn">Hủy</router-link>
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
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    color: #fff !important;
    align-items: center;
}
</style>
