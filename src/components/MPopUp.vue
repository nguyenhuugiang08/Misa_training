<script setup>
import MCheckbox from "./MCheckbox.vue";
import MInput from "./MInput.vue";
import MDateField from "./MDateField.vue";
import MRadio from "./MRadio.vue";
import MPopUpError from "./MPopUpError.vue";
import MPopUpInfo from "./MPopUpInfo.vue";
import { useDepartment } from "../composable/useDepartment";
import { useEmployee } from "../composable/useEmployee";
import { reactive, inject } from "vue";
import { formatDate } from "../utilities/formatDate";
import { convertDatetime } from "../utilities/convertDatetime";
import { error, useValidate } from "../utilities/validateForm";
import { usePosition } from "../composable/usePosition";
import { MISA_ENUM } from "../base/enum";

const props = defineProps({
    title: String,
});

const { listDepartments, getAllDepartments } = useDepartment();
getAllDepartments();

const { newEmployeeCode, getEmployeeCode, addNewEmloyee, editAnEmployee } = useEmployee();
getEmployeeCode();

const { listPositions, getAllPositions } = usePosition();
getAllPositions();

const { state, setListToast } = inject("diy");
const { employeeSelected } = state;

const employee = reactive({
    employeeCode: employeeSelected?.EmployeeCode || newEmployeeCode,
    fullName: employeeSelected?.FullName || "",
    gender: employeeSelected?.Gender || 0,
    dateOfBirth: employeeSelected?.DateOfBirth ? formatDate(employeeSelected?.DateOfBirth) : "",
    identityNumber: employeeSelected?.IdentityNumber || "",
    departmentId: employeeSelected?.DepartmentId || "",
    identityDate: employeeSelected?.IdentityDate ? formatDate(employeeSelected?.IdentityDate) : "",
    positionId: employeeSelected?.PositionId || "",
    identityPlace: employeeSelected?.IdentityPlace || "",
    address: employeeSelected?.Address || "",
    phoneNumber: employeeSelected?.PhoneNumber || "",
    email: employeeSelected?.Email || "",
});

const isPopUp = reactive({
    isOpenError: false,
    isOpenInfo: false,
});
const emit = defineEmits(["hideModal"]);

/**
 * Ẩn modal
 * CreatedBy: NHGiang
 */
const hideModal = () => {
    try {
        emit("hideModal");
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý hiển thị thông báo khi nhấn nút x
 * CreatedBy: NHGiang
 */
const handleShowPopUpInfo = () => {
    try {
        console.log(employeeSelected);
        isPopUp.isOpenInfo = true;
    } catch (error) {
        console.log(error);
    }
};

/**
 *  Xử lý submit form
 * CreatedBy: NHGiang
 */
const hanldeSubmitForm = async () => {
    try {
        employee.departmentId = employee.departmentId || listDepartments.value?.[0].departmentId;
        const status = useValidate(
            employee,
            state.listAllEmployee,
            state.identityForm,
            employeeSelected.EmployeeCode
        );

        if (state.identityForm === MISA_ENUM.FORM_MODE.EDIT) {
            if (!status) {
                emit("startEdit");
                await editAnEmployee(
                    {
                        ...employee,
                        employeeId: employeeSelected.EmployeeId,
                        identityDate: new Date(
                            convertDatetime(employee.identityDate, true)
                        ).toJSON(),
                        dateOfBirth: convertDatetime(employee.dateOfBirth, false),
                    },
                    emit
                );
            } else {
                isPopUp.isOpenError = true;
            }
        }
        if (
            state.identityForm === MISA_ENUM.FORM_MODE.ADD ||
            state.identityForm === MISA_ENUM.FORM_MODE.DUPLICATE
        ) {
            if (!status) {
                emit("startEdit");
                await addNewEmloyee(
                    {
                        ...employee,
                        identityDate: new Date(
                            convertDatetime(employee.identityDate, true)
                        ).toJSON(),
                        dateOfBirth: convertDatetime(employee.dateOfBirth, false),
                    },
                    emit
                );
            } else {
                isPopUp.isOpenError = true;
            }
        }
    } catch (err) {
        console.log(err);
    }
};
</script>

<template>
    <div class="overlay">
        <form class="modal" @submit.prevent="hanldeSubmitForm">
            <div class="modal__header">
                <div class="modal__header-left">
                    <div class="modal__header-left-text">{{ title }}</div>
                    <label for="radio1" class="modal__header-left-wrapper">
                        <input type="checkbox" checked id="radio1" />
                        <div
                            :style="{
                                background:
                                    'url(../../src/assets/img/Sprites.64af8f61.svg)no-repeat -1225px -363px',
                                width: '14px',
                                height: '11px',
                            }"
                        ></div>
                    </label>
                    <span>Là khách hàng</span>
                    <label for="radio2" class="modal__header-left-wrapper">
                        <input type="checkbox" id="radio2" />
                        <div
                            :style="{
                                background:
                                    'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -1225px -363px',
                                width: '14px',
                                height: '11px',
                            }"
                        ></div>
                    </label>
                    <span>Là nhà cung cấp</span>
                </div>
                <div class="modal__header-right">
                    <div
                        :style="{
                            background:
                                'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -732px -31px',
                            width: '24px',
                            height: '24px',
                            marginRight: '6px',
                        }"
                        class="modal__help-btn"
                    ></div>
                    <div class="modal__close-btn">
                        <label
                            for="show-modal"
                            :style="{
                                background:
                                    'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -147px -147px',
                                width: '18px',
                                height: '18px',
                                cursor: 'pointer',
                            }"
                            @click="handleShowPopUpInfo"
                        ></label>
                    </div>
                </div>
            </div>
            <div class="modal-main">
                <div
                    :style="{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                        width: '414px',
                        paddingRight: '26px',
                    }"
                >
                    <div
                        :style="{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingBottom: '12px',
                        }"
                    >
                        <m-input
                            :fieldText="'Mã'"
                            :required="true"
                            :width="'149px'"
                            :marginRight="'6px'"
                            :value="employee.employeeCode"
                            :status="error.employeeCodeError.status"
                            @inputValue="employee.employeeCode = $event"
                        />
                        <m-input
                            :fieldText="'Tên'"
                            :required="true"
                            :width="'233px'"
                            :value="employee.fullName"
                            :status="error.employeeNameError.status"
                            :text-error="error.employeeNameError.textError"
                            @inputValue="employee.fullName = $event"
                            @changeValue="error.employeeNameError.status = $event"
                        />
                    </div>
                    <m-checkbox
                        v-if="listDepartments.length"
                        :options="listDepartments"
                        :default="listDepartments[0].optionName"
                        @select="employee.departmentId = $event"
                        :text-label="'Đơn vị'"
                        :required="true"
                    />
                    <m-input
                        :fieldText="'Chức danh'"
                        :width="'388px'"
                        style="padding-bottom: 12px"
                        :value="
                            listPositions?.find((emp) => emp.PositionId === employee.positionId)
                                ?.PositionName
                        "
                        @inputValue="
                            employee.positionId = listPositions?.find(
                                (emp) => emp.PositionName === $event
                            )?.PositionId
                        "
                    />
                </div>
                <div
                    :style="{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                        width: '414px',
                    }"
                >
                    <div
                        :style="{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingBottom: '12px',
                        }"
                    >
                        <m-date-field
                            :width="'166px'"
                            :fieldText="'Ngày sinh'"
                            :value="employee.dateOfBirth"
                            @dateField="employee.dateOfBirth = $event"
                        />
                        <div style="padding-left: 10px; margin-left: 6px">
                            <label class="textfield__label modal-label"> Giới tính </label>
                            <div class="modal__gender">
                                <m-radio
                                    :id="'male'"
                                    :value="MISA_ENUM.GENDER.MALE"
                                    :labelText="'Nam'"
                                    :marginLeft="'10px'"
                                    :marginRight="'20px'"
                                    :defaultValue="employee.gender"
                                    @radio="employee.gender = $event"
                                />
                                <m-radio
                                    :id="'female'"
                                    :value="MISA_ENUM.GENDER.FEMALE"
                                    :labelText="'Nữ'"
                                    :marginLeft="'10px'"
                                    :marginRight="'20px'"
                                    :defaultValue="employee.gender"
                                    @radio="employee.gender = $event"
                                />
                                <m-radio
                                    :id="'other'"
                                    :value="MISA_ENUM.GENDER.OTHER"
                                    :labelText="'Khác'"
                                    :marginLeft="'10px'"
                                    :defaultValue="employee.gender"
                                    @radio="employee.gender = $event"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        :style="{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingBottom: '12px',
                        }"
                    >
                        <m-input
                            :fieldText="'Số CMND'"
                            :width="'242px'"
                            :marginRight="'6px'"
                            :value="employee.identityNumber"
                            @inputValue="employee.identityNumber = $event"
                            :tooltip="'Số chứng minh nhân dân'"
                        />
                        <m-date-field
                            :width="'166px'"
                            :fieldText="'Ngày cấp'"
                            :value="employee.identityDate"
                            @dateField="employee.identityDate = $event"
                        />
                    </div>

                    <m-input
                        :fieldText="'Nơi cấp'"
                        :width="'414px'"
                        style="padding-bottom: 12px"
                        :value="employee.identityPlace"
                        @inputValue="employee.identityPlace = $event"
                    />
                </div>
                <div class="modal-contact">
                    <m-input
                        :fieldText="'Địa chỉ'"
                        :width="'829px'"
                        style="padding-bottom: 12px"
                        :value="employee.address"
                        @inputValue="employee.address = $event"
                    />
                    <m-input
                        :fieldText="'ĐT di động'"
                        :width="'271px'"
                        style="padding-bottom: 12px; float: left"
                        :marginRight="'8px'"
                        :value="employee.phoneNumber"
                        @inputValue="employee.phoneNumber = $event"
                        :tooltip="'Số điện thoại di động'"
                    />
                    <m-input
                        :fieldText="'ĐT cố định'"
                        :width="'271px'"
                        style="padding-bottom: 12px; float: left"
                        :marginRight="'8px'"
                        :tooltip="'Số điện thoại cố động'"
                    />
                    <m-input
                        :fieldText="'Email'"
                        :width="'271px'"
                        style="padding-bottom: 12px; float: left"
                        :marginRight="'8px'"
                        :value="employee.email"
                        @inputValue="employee.email = $event"
                        :placeHolder="'example@gmail.com'"
                    />
                    <m-input
                        :fieldText="'Tài khoản ngân hàng'"
                        :width="'271px'"
                        style="float: left; clear: left"
                        :marginRight="'8px'"
                    />
                    <m-input
                        :fieldText="'Tên ngân hàng'"
                        :width="'271px'"
                        style="float: left"
                        :marginRight="'8px'"
                    />
                    <m-input
                        :fieldText="'Chi nhánh'"
                        :width="'271px'"
                        style="float: left"
                        :marginRight="'8px'"
                    />
                </div>
            </div>
            <div class="modal-footer">
                <label
                    for="show-modal"
                    class="btn btn-secondary modal-btn-cancel"
                    @click="hideModal"
                    tabindex="3"
                    >Hủy</label
                >
                <div class="modal-footer__wrapper">
                    <button
                        type="submit"
                        class="btn btn-secondary modal-btn__secondary"
                        tabindex="1"
                    >
                        Cất
                    </button>
                    <button type="submit" class="btn btn-primary" tabindex="2">Cất và thêm</button>
                </div>
            </div>
        </form>
        <div class="modal-error" v-if="isPopUp.isOpenError || isPopUp.isOpenInfo">
            <m-pop-up-error
                v-if="isPopUp.isOpenError"
                :title="'Lỗi'"
                :text-error="
                    error.employeeCodeError.textError ||
                    error.employeeNameError.textError ||
                    error.dateOfBrithError.textError ||
                    error.identityDateError.textError ||
                    error.phoneNumberError.textError ||
                    error.emailError.textError
                "
                @closeError="isPopUp.isOpenError = !isPopUp.isOpenError"
            />
            <m-pop-up-info
                v-if="isPopUp.isOpenInfo"
                :title="'Thông báo'"
                text-info="Dữ liệu đã bị thay đổi. Bạn có muốn cất không?"
                @closeInfo="isPopUp.isOpenInfo = !isPopUp.isOpenInfo"
                @closeForm="hideModal"
                @submitForm="
                    hanldeSubmitForm();
                    isPopUp.isOpenInfo = !isPopUp.isOpenInfo;
                "
            />
        </div>
    </div>
</template>

<style scoped></style>
