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
    EmployeeCode: employeeSelected?.EmployeeCode || newEmployeeCode,
    FullName: employeeSelected?.FullName || "",
    Gender: employeeSelected?.Gender || 0,
    DateOfBirth: employeeSelected?.DateOfBirth ? formatDate(employeeSelected?.DateOfBirth) : "",
    IdentityNumber: employeeSelected?.IdentityNumber || "",
    DepartmentId: employeeSelected?.DepartmentId || "",
    IdentityDate: employeeSelected?.IdentityDate ? formatDate(employeeSelected?.IdentityDate) : "",
    PositionId: employeeSelected?.PositionId || "",
    IdentityPlace: employeeSelected?.IdentityPlace || "",
    Address: employeeSelected?.Address || "",
    PhoneNumber: employeeSelected?.PhoneNumber || "",
    Email: employeeSelected?.Email || "",
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
const hanldeSubmitForm = async (isCloseForm = true) => {
    try {
        employee.DepartmentId = employee.DepartmentId || listDepartments.value?.[0].departmentId;
        const status = useValidate(
            employee,
            state.listAllEmployee,
            state.identityForm,
            employeeSelected.EmployeeCode
        );

        if (state.identityForm === MISA_ENUM.FORM_MODE.EDIT) {
            if (!status) {
                await handleEditEmployee(isCloseForm);
            } else {
                isPopUp.isOpenError = true;
            }
        }
        if (
            state.identityForm === MISA_ENUM.FORM_MODE.ADD ||
            state.identityForm === MISA_ENUM.FORM_MODE.DUPLICATE
        ) {
            if (!status) {
                await handleAddAndDuplicateEmployee(isCloseForm);
            } else {
                isPopUp.isOpenError = true;
            }
        }
    } catch (err) {
        console.log(err);
    }
};

/**
 * Xử lý Thêm 1 nhân viên mới và nhân bản
 * Created by: NHGiang (17/01/2023)
 */
const handleAddAndDuplicateEmployee = async (isCloseForm) => {
    try {
        emit("startEdit");
        await addNewEmloyee(
            {
                ...employee,
                IdentityDate: new Date(convertDatetime(employee.IdentityDate, true)).toJSON(),
                DateOfBirth: convertDatetime(employee.DateOfBirth, false),
            },
            emit,
            state.identityForm,
            isCloseForm
        );
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý sửa thông tin nhân viên
 * Created by: NHGiang (17/01/2023)
 */
const handleEditEmployee = async (isCloseForm) => {
    try {
        emit("startEdit");
        await editAnEmployee(
            {
                ...employee,
                EmployeeId: employeeSelected.EmployeeId,
                IdentityDate: new Date(convertDatetime(employee.IdentityDate, true)).toJSON(),
                DateOfBirth: convertDatetime(employee.DateOfBirth, false),
            },
            emit,
            isCloseForm
        );
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="overlay">
        <div class="modal">
            <div class="modal__header">
                <div class="modal__header-left">
                    <div class="modal__header-left-text">{{ title }}</div>
                    <label for="radio1" class="modal__header-left-wrapper">
                        <input type="checkbox" id="radio1" />
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
                            :value="employee.EmployeeCode"
                            :status="error.employeeCodeError.status"
                            @inputValue="employee.EmployeeCode = $event"
                            :text-error="error.employeeCodeError.textError"
                            @changeValue="error.employeeCodeError.status = $event"
                        />
                        <m-input
                            :fieldText="'Tên'"
                            :required="true"
                            :width="'233px'"
                            :value="employee.FullName"
                            :status="error.employeeNameError.status"
                            :text-error="error.employeeNameError.textError"
                            @inputValue="employee.FullName = $event"
                            @changeValue="error.employeeNameError.status = $event"
                        />
                    </div>
                    <m-checkbox
                        v-if="listDepartments.length"
                        :options="listDepartments"
                        default=""
                        @select="employee.DepartmentId = $event"
                        :text-label="'Đơn vị'"
                        :status="error.departmentError.status"
                        :required="true"
                    />
                    <m-input
                        :fieldText="'Chức danh'"
                        :width="'388px'"
                        style="padding-bottom: 12px"
                        :value="
                            listPositions?.find((emp) => emp.PositionId === employee.PositionId)
                                ?.PositionName
                        "
                        @inputValue="
                            employee.PositionId = listPositions?.find(
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
                            :value="employee.DateOfBirth"
                            :status="error.dateOfBrithError.status"
                            @dateField="employee.DateOfBirth = $event"
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
                                    :defaultValue="employee.Gender"
                                    @radio="employee.Gender = $event"
                                />
                                <m-radio
                                    :id="'female'"
                                    :value="MISA_ENUM.GENDER.FEMALE"
                                    :labelText="'Nữ'"
                                    :marginLeft="'10px'"
                                    :marginRight="'20px'"
                                    :defaultValue="employee.Gender"
                                    @radio="employee.Gender = $event"
                                />
                                <m-radio
                                    :id="'other'"
                                    :value="MISA_ENUM.GENDER.OTHER"
                                    :labelText="'Khác'"
                                    :marginLeft="'10px'"
                                    :defaultValue="employee.Gender"
                                    @radio="employee.Gender = $event"
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
                            :value="employee.IdentityNumber"
                            :status="error.identityNumberError.status"
                            @inputValue="employee.IdentityNumber = $event"
                            @changeValue="error.identityNumberError.status = $event"
                            :tooltip="'Số chứng minh nhân dân'"
                        />
                        <m-date-field
                            :width="'166px'"
                            :fieldText="'Ngày cấp'"
                            :value="employee.IdentityDate"
                            @dateField="employee.IdentityDate = $event"
                        />
                    </div>

                    <m-input
                        :fieldText="'Nơi cấp'"
                        :width="'414px'"
                        style="padding-bottom: 12px"
                        :value="employee.IdentityPlace"
                        @inputValue="employee.IdentityPlace = $event"
                    />
                </div>
                <div class="modal-contact">
                    <m-input
                        :fieldText="'Địa chỉ'"
                        :width="'829px'"
                        style="padding-bottom: 12px"
                        :value="employee.Address"
                        @inputValue="employee.Address = $event"
                    />
                    <m-input
                        :fieldText="'ĐT di động'"
                        :width="'271px'"
                        style="padding-bottom: 12px; float: left"
                        :marginRight="'8px'"
                        :value="employee.PhoneNumber"
                        :status="error.phoneNumberError.status"
                        @inputValue="employee.PhoneNumber = $event"
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
                        :value="employee.Email"
                        @inputValue="employee.Email = $event"
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
                <div class="modal-footer__wrapper">
                    <button
                        type="submit"
                        class="btn btn-secondary modal-btn__secondary"
                        tabindex="0"
                        @click="hanldeSubmitForm(true)"
                    >
                        Cất
                    </button>
                    <button @click="hanldeSubmitForm(false)" class="btn btn-primary" tabindex="0">
                        Cất và thêm
                    </button>
                </div>
                <label
                    for="show-modal"
                    class="btn btn-secondary modal-btn-cancel"
                    @click="hideModal"
                    tabindex="0"
                    >Hủy</label
                >
            </div>
        </div>
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
                    error.emailError.textError ||
                    error.identityNumberError.textError ||
                    error.departmentError.textError
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
