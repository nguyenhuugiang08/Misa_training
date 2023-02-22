<script setup>
import MCheckbox from "./MCheckbox.vue";
import MInput from "./MInput.vue";
import MDateField from "./MDateField.vue";
import MRadio from "./MRadio.vue";
import MPopUpError from "./MPopUpError.vue";
import MPopUpInfo from "./MPopUpInfo.vue";
import { useDepartment } from "../composable/useDepartment";
import { useEmployee } from "../composable/useEmployee";
import { reactive, inject, onMounted, ref, defineComponent } from "vue";
import { formatDate } from "../utilities/formatDate";
import { convertDatetime } from "../utilities/convertDatetime";
import { error, useValidate } from "../utilities/validateForm";
import { MISA_ENUM } from "../base/enum";

//Định nghĩa các component được import
const components = defineComponent({
    MCheckbox,
    MInput,
    MDateField,
    MRadio,
    MPopUpError,
    MPopUpInfo,
});

/**
 * Định nghĩa các props nhận
 * created by: NHGiang - (17/02/23)
 */
const props = defineProps({
    title: String,
});

/**
 * Inject
 * CreatedBy: NHGiang - (20/02/23)
 */
const { state, setListToast } = inject("diy");
const { employeeSelected } = state;

const { listDepartments, getAllDepartments } = useDepartment();
getAllDepartments();

const { newEmployeeCode, getEmployeeCode, addNewEmloyee, editAnEmployee } = useEmployee();
if (state.identityForm !== MISA_ENUM.FORM_MODE.EDIT) {
    getEmployeeCode();
}

/**
 * Khởi tạo 1 đối tượng Employee
 * CreatedBy: NHGiang - (17/02/23)
 */
const employee = reactive({
    EmployeeCode: employeeSelected?.EmployeeCode || newEmployeeCode,
    FullName: employeeSelected?.FullName || "",
    Gender: employeeSelected?.Gender || 0,
    DateOfBirth: employeeSelected?.DateOfBirth ? formatDate(employeeSelected?.DateOfBirth) : "",
    DepartmentId: employeeSelected?.DepartmentId || "",
    DepartmentName: employeeSelected?.DepartmentName || "",
    LandlineNumber: employeeSelected?.LandlineNumber || "",
    PhoneNumber: employeeSelected?.PhoneNumber || "",
    Email: employeeSelected?.Email || "",
    Address: employeeSelected?.Address || "",
    IdentityNumber: employeeSelected?.IdentityNumber || "",
    IdentityDate: employeeSelected?.IdentityDate ? formatDate(employeeSelected?.IdentityDate) : "",
    IdentityPlace: employeeSelected?.IdentityPlace || "",
    Position: employeeSelected?.Position || "",
    BankAccount: employeeSelected?.BankAccount || "",
    BankName: employeeSelected?.BankName || "",
    BankBranch: employeeSelected?.BankBranch || "",
});

// Object lưu trạng thái của pop up error và pop info
const isPopUp = reactive({
    isOpenError: false,
    isOpenInfo: false,
});

// Định nghĩa các hàm được emit ra ngoài
const emit = defineEmits(["hideModal"]);

// Biến giúp tham chiếu đến Element input EmployeeCode trong DOM
const refEmployeeCode = ref(null);

/**
 * Ẩn modal
 * CreatedBy: NHGiang - (20/02/23)
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
 * CreatedBy: NHGiang - (20/02/23)
 */
const handleShowPopUpInfo = () => {
    try {
        const {
            EmployeeId,
            GenderName,
            CreatedDate,
            CreatedBy,
            ModifiedDate,
            ModifiedBy,
            ...employeeToCompare
        } = employeeSelected;

        employeeToCompare.DateOfBirth = formatDate(employeeToCompare.DateOfBirth);
        employeeToCompare.IdentityDate = formatDate(employeeToCompare.IdentityDate);

        if (JSON.stringify(employeeToCompare) !== JSON.stringify(employee)) {
            isPopUp.isOpenInfo = true;
        } else {
            hideModal();
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý submit form
 * @param {*} isCloseForm -- Trạng thái Đóng/Mở form
 * Created by: NHGiang - (20/02/23)
 */
const hanldeSubmitForm = async (isCloseForm = true) => {
    try {
        employee.DepartmentId = employee.DepartmentId || listDepartments.value?.[0].departmentId;
        // const status = useValidate(
        //     employee,
        //     state.listAllEmployee,
        //     state.identityForm,
        //     employeeSelected.EmployeeCode,
        //     listDepartments
        // );

        if (state.identityForm === MISA_ENUM.FORM_MODE.EDIT) {
            await handleEditEmployee(isCloseForm);
            // if (!status) {
            //     await handleEditEmployee(isCloseForm);
            // } else {
            //     isPopUp.isOpenError = true;
            // }
        }
        if (
            state.identityForm === MISA_ENUM.FORM_MODE.ADD ||
            state.identityForm === MISA_ENUM.FORM_MODE.DUPLICATE
        ) {
            await handleAddAndDuplicateEmployee(isCloseForm);
            // if (!status) {
            //     await handleAddAndDuplicateEmployee(isCloseForm);
            // } else {
            //     isPopUp.isOpenError = true;
            // }
        }
    } catch (err) {
        console.log(err);
    }
};

/**
 * Xử lý Thêm mới hoặc nhân bản 1 nhân viên
 * @param {*} isCloseForm -- Trạng thái Đóng/Mở form
 * Created by: NHGiang - (20/02/23)
 */
const handleAddAndDuplicateEmployee = async (isCloseForm) => {
    try {
        emit("startEdit");
        await addNewEmloyee(
            {
                ...employee,
                IdentityDate: new Date(convertDatetime(employee.IdentityDate, true)),
                DateOfBirth: new Date(convertDatetime(employee.DateOfBirth, true)),
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
 * Xử lý sửa thông tin của 1 nhân viên
 * @param {*} isCloseForm -- Trạng thái Đóng/Mở form
 * Created by: NHGiang - (20/02/23)
 */
const handleEditEmployee = async (isCloseForm) => {
    try {
        emit("startEdit");
        await editAnEmployee(
            {
                ...employee,
                EmployeeId: employeeSelected.EmployeeId,
                IdentityDate: new Date(convertDatetime(employee.IdentityDate, true)),
                DateOfBirth: new Date(convertDatetime(employee.DateOfBirth, true)),
            },
            emit,
            isCloseForm
        );
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý focus input employee code
 * Created by: NHGiang - (20/02/23)
 */
onMounted(() => {
    try {
        refEmployeeCode.value.handleFocus();
    } catch (error) {
        console.log(error);
    }
});

/**
 * Xử lý set lại tabindex khi hết
 * @param {*} e event object
 * Created by: NHGiang - (20/02/23)
 */
const handleSetTabindex = (e) => {
    try {
        if (e.keyCode === 9) {
            e.preventDefault();

            refEmployeeCode.value.handleFocus();
        }
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
                    <div class="modal__close-btn" @click="handleShowPopUpInfo">
                        <label
                            for="show-modal"
                            :style="{
                                background:
                                    'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -147px -147px',
                                width: '18px',
                                height: '18px',
                                cursor: 'pointer',
                            }"
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
                            :status="error.EmployeeCode.status"
                            :statusPublic="error.status"
                            @inputValue="employee.EmployeeCode = $event"
                            :text-error="error.EmployeeCode.textError"
                            @changeValue="error.EmployeeCode.status = $event"
                            ref="refEmployeeCode"
                        />
                        <m-input
                            :fieldText="'Tên'"
                            :required="true"
                            :width="'233px'"
                            :value="employee.FullName"
                            :status="error.FullName.status"
                            :statusPublic="error.status"
                            :text-error="error.FullName.textError"
                            @inputValue="employee.FullName = $event"
                            @changeValue="error.FullName.status = $event"
                        />
                    </div>
                    <m-checkbox
                        v-if="listDepartments.length"
                        :options="listDepartments"
                        :default="employee.DepartmentId"
                        @select="
                            (employee.DepartmentId = $event.optionId),
                                (employee.DepartmentName = $event.optionName)
                        "
                        :text-label="'Đơn vị'"
                        :status="error.DepartmentId.status"
                        :statusPublic="error.status"
                        :required="true"
                        :textError="error.DepartmentId.textError"
                    />
                    <m-input
                        :fieldText="'Chức danh'"
                        :width="'388px'"
                        style="padding-bottom: 12px"
                        :value="employee.Position"
                        @inputValue="employee.Position = $event"
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
                            :status="error.DateOfBirth.status"
                            :textError="error.DateOfBirth.textError"
                            :statusPublic="error.status"
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
                                    :statusPublic="error.status"
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
                            <p v-if="error.status" class="textfield-error">
                                {{ textError }}
                            </p>
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
                            :status="error.IdentityNumber.status"
                            :statusPublic="error.status"
                            @inputValue="employee.IdentityNumber = $event"
                            @changeValue="error.IdentityNumber.status = $event"
                            :tooltip="'Số chứng minh nhân dân'"
                            :text-error="error.IdentityNumber.textError"
                        />
                        <m-date-field
                            :width="'166px'"
                            :fieldText="'Ngày cấp'"
                            :value="employee.IdentityDate"
                            :status="error.IdentityDate.status"
                            :textError="error.IdentityDate.textError"
                            :statusPublic="error.status"
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
                        :status="error.PhoneNumber.status"
                        @inputValue="employee.PhoneNumber = $event"
                        :tooltip="'Số điện thoại di động'"
                        :text-error="error.PhoneNumber.textError"
                    />
                    <m-input
                        :fieldText="'ĐT cố định'"
                        :width="'271px'"
                        style="padding-bottom: 12px; float: left"
                        :marginRight="'8px'"
                        :tooltip="'Số điện thoại cố động'"
                        :value="employee.LandlineNumber"
                        :status="error.LandlineNumber.status"
                        @inputValue="employee.LandlineNumber = $event"
                        :text-error="error.LandlineNumber.textError"
                    />
                    <m-input
                        :fieldText="'Email'"
                        :width="'271px'"
                        style="padding-bottom: 12px; float: left"
                        :marginRight="'8px'"
                        :value="employee.Email"
                        @inputValue="employee.Email = $event"
                        :placeHolder="'example@gmail.com'"
                        :status="error.Email.status"
                        :text-error="error.Email.textError"
                    />
                    <m-input
                        :fieldText="'Tài khoản ngân hàng'"
                        :width="'271px'"
                        style="float: left; clear: left"
                        :marginRight="'8px'"
                        :value="employee.BankAccount"
                        @inputValue="employee.BankAccount = $event"
                    />
                    <m-input
                        :fieldText="'Tên ngân hàng'"
                        :width="'271px'"
                        style="float: left"
                        :marginRight="'8px'"
                        :value="employee.BankName"
                        @inputValue="employee.BankName = $event"
                    />
                    <m-input
                        :fieldText="'Chi nhánh'"
                        :width="'271px'"
                        style="float: left"
                        :marginRight="'8px'"
                        :value="employee.BankBranch"
                        @inputValue="employee.BankBranch = $event"
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
                    @keydown="handleSetTabindex"
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
                    error.EmployeeCode.textError ||
                    error.FullName.textError ||
                    error.DateOfBirth.textError ||
                    error.IdentityDate.textError ||
                    error.PhoneNumber.textError ||
                    error.LandlineNumber.textError ||
                    error.Email.textError ||
                    error.IdentityNumber.textError ||
                    error.DepartmentId.textError
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
