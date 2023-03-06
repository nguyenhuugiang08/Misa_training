import { MISA_ENUM } from "../base/enum";
import { reactive } from "vue";
import { MISA_RESOURCE } from "../base/resource";

const error = reactive({
    EmployeeCode: {
        textError: "",
        status: false,
    },
    FullName: {
        textError: "",
        status: false,
    },
    DateOfBirth: {
        textError: "",
        status: false,
    },
    IdentityDate: {
        textError: "",
        status: false,
    },
    PhoneNumber: {
        textError: "",
        status: false,
    },
    LandlineNumber: {
        textError: "",
        status: false,
    },
    Email: {
        textError: "",
        status: false,
    },
    IdentityNumber: {
        textError: "",
        status: false,
    },
    DepartmentId: {
        textError: "",
        status: false,
    },
    status: false,
});

const {
    EmployeeCodeText,
    FullNameText,
    DateOfBirthText,
    IdentityDateText,
    PhoneNumberText,
    LandlineNumberText,
    EmailText,
    IdentityNumberText,
    DepartmentIdText,
} = MISA_RESOURCE;

/**
 * Xử lý check định đạng
 * Created by: NHGiang
 */
export const handleCheckFormat = (regex, value) => {
    try {
        return regex.test(value);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý validate form
 * CreatedBy: NHGiang
 */
const useValidate = (
    employee,
    list,
    identityForm,
    employeeSelectedCode,
    employeeSelectedIdentityNumber,
    listDepartments
) => {
    try {
        // Validate employee code
        if (!employee.EmployeeCode.trim()) {
            error.EmployeeCode.textError = EmployeeCodeText.blank;
            error.EmployeeCode.status = true;
        } else if (!handleCheckFormat(MISA_RESOURCE.REGEX.EMPLOYEE_CODE, employee.EmployeeCode)) {
            error.EmployeeCode.textError = EmployeeCodeText.invalid;
            error.EmployeeCode.status = true;
        } else {
            if (
                identityForm === MISA_ENUM.FORM_MODE.ADD ||
                identityForm === MISA_ENUM.FORM_MODE.DUPLICATE
            ) {
                const listCodes = list.map((emp) => emp.EmployeeCode);
                if (listCodes.includes(employee.EmployeeCode)) {
                    error.EmployeeCode.textError = EmployeeCodeText.duplicate(
                        employee.EmployeeCode
                    );
                    error.EmployeeCode.status = true;
                } else {
                    error.EmployeeCode.textError = "";
                    error.EmployeeCode.status = false;
                }
            }

            if (identityForm === MISA_ENUM.FORM_MODE.EDIT) {
                const listCodes = list
                    .filter((item) => item.EmployeeCode !== employeeSelectedCode)
                    .map((emp) => emp.EmployeeCode);
                if (listCodes.includes(employee.EmployeeCode)) {
                    error.EmployeeCode.textError = EmployeeCodeText.duplicate(
                        employee.EmployeeCode
                    );
                    error.EmployeeCode.status = true;
                } else {
                    error.EmployeeCode.textError = "";
                    error.EmployeeCode.status = false;
                }
            }
        }

        // Valide employee name
        if (!employee.FullName.trim()) {
            error.FullName.textError = FullNameText.blank;
            error.FullName.status = true;
        } else if (!handleCheckFormat(MISA_RESOURCE.REGEX.FULL_NAME, employee.FullName)) {
            error.FullName.textError = FullNameText.invalid;
            error.FullName.status = true;
        } else {
            error.FullName.textError = "";
            error.FullName.status = false;
        }

        //Validate ngày sinh
        if (employee.DateOfBirth) {
            if (!handleCheckFormat(MISA_RESOURCE.REGEX.DATE, employee.DateOfBirth)) {
                error.DateOfBirth.textError = DateOfBirthText.invalid;
                error.DateOfBirth.status = true;
            } else {
                const yearOfBirth = Number(employee.DateOfBirth.split("/")[2]);
                const dayOfBirth = Number(employee.DateOfBirth.split("/")[0]);
                const monthOfBirth = Number(employee.DateOfBirth.split("/")[1]);

                if (new Date(yearOfBirth + 18, monthOfBirth - 1, dayOfBirth) <= new Date()) {
                    error.DateOfBirth.textError = "";
                    error.DateOfBirth.status = false;
                } else {
                    error.DateOfBirth.textError = DateOfBirthText.over;
                    error.DateOfBirth.status = true;
                }
            }
        } else {
            error.DateOfBirth.textError = "";
            error.DateOfBirth.status = false;
        }

        //Validate ngày cấp
        if (employee.IdentityDate) {
            if (!handleCheckFormat(MISA_RESOURCE.REGEX.DATE, employee.IdentityDate)) {
                error.IdentityDate.textError = IdentityDateText.invalid;
                error.IdentityDate.status = true;
            } else {
                const yearOfBirth = Number(employee.IdentityDate.split("/")[2]);
                const dayOfBirth = Number(employee.IdentityDate.split("/")[0]);
                const monthOfBirth = Number(employee.IdentityDate.split("/")[1]);

                if (new Date(yearOfBirth, monthOfBirth - 1, dayOfBirth) <= new Date()) {
                    error.IdentityDate.textError = "";
                    error.IdentityDate.status = false;
                } else {
                    error.IdentityDate.textError = IdentityDateText.over;
                    error.IdentityDate.status = true;
                }
            }
        } else {
            error.IdentityDate.textError = "";
            error.IdentityDate.status = false;
        }

        // Validate số điện thoại
        if (employee.PhoneNumber.trim()) {
            if (!handleCheckFormat(MISA_RESOURCE.REGEX.PHONE_NUMBER, employee.PhoneNumber)) {
                error.PhoneNumber.textError = PhoneNumberText.invalid;
                error.PhoneNumber.status = true;
            } else {
                error.PhoneNumber.textError = "";
                error.PhoneNumber.status = false;
            }
        } else {
            error.PhoneNumber.textError = "";
            error.PhoneNumber.status = false;
        }

        // validate số điện thoại cố định
        if (employee.LandlineNumber.trim()) {
            if (!handleCheckFormat(MISA_RESOURCE.REGEX.PHONE_NUMBER, employee.LandlineNumber)) {
                error.LandlineNumber.textError = LandlineNumberText.invalid;
                error.LandlineNumber.status = true;
            } else {
                error.LandlineNumber.textError = "";
                error.LandlineNumber.status = false;
            }
        } else {
            error.LandlineNumber.textError = "";
            error.LandlineNumber.status = false;
        }

        // Validate email
        if (employee.Email.trim()) {
            if (!handleCheckFormat(MISA_RESOURCE.REGEX.EMAIL, employee.Email)) {
                error.Email.textError = EmailText.invalid;
                error.Email.status = true;
            } else {
                error.Email.textError = "";
                error.Email.status = false;
            }
        } else {
            error.Email.textError = "";
            error.Email.status = false;
        }

        // Validate số căn cước công dân
        if (employee.IdentityNumber.trim()) {
            if (!handleCheckFormat(MISA_RESOURCE.REGEX.IDENTITY_NUMBER, employee.IdentityNumber)) {
                error.IdentityNumber.textError = IdentityNumberText.invalid;
                error.IdentityNumber.status = true;
            } else {
                if (
                    identityForm === MISA_ENUM.FORM_MODE.ADD ||
                    identityForm === MISA_ENUM.FORM_MODE.DUPLICATE
                ) {
                    const listIdentityNumbers = list.map((emp) => emp.IdentityNumber);
                    if (listIdentityNumbers.includes(employee.IdentityNumber)) {
                        error.IdentityNumber.textError = IdentityNumberText.duplicate;
                        error.IdentityNumber.status = true;
                    } else {
                        error.IdentityNumber.textError = "";
                        error.IdentityNumber.status = false;
                    }
                }

                if (identityForm === MISA_ENUM.FORM_MODE.EDIT) {
                    const listIdentityNumbers = list
                        .filter((item) => item.IdentityNumber !== employeeSelectedIdentityNumber)
                        .map((emp) => emp.IdentityNumber);
                    if (listIdentityNumbers.includes(employee.IdentityNumber)) {
                        error.IdentityNumber.textError = IdentityNumberText.duplicate;
                        error.IdentityNumber.status = true;
                    } else {
                        error.IdentityNumber.textError = "";
                        error.IdentityNumber.status = false;
                    }
                }
            }
        } else {
            error.IdentityNumber.textError = "";
            error.IdentityNumber.status = false;
        }

        // Validate đơn vị
        const departmentNames = listDepartments.value.map((option) => option.optionName);
        if (!employee.DepartmentId) {
            error.DepartmentId.textError = DepartmentIdText.blank;
            error.DepartmentId.status = true;
        } else if (!departmentNames.includes(employee.DepartmentName)) {
            error.DepartmentId.textError = DepartmentIdText.notFound;
            error.DepartmentId.status = true;
        } else {
            error.DepartmentId.textError = "";
            error.DepartmentId.status = false;
        }

        error.status =
            error.EmployeeCode.status ||
            error.FullName.status ||
            error.DateOfBirth.status ||
            error.IdentityDate.status ||
            error.PhoneNumber.status ||
            error.LandlineNumber.status ||
            error.Email.status ||
            error.DepartmentId.status ||
            error.IdentityNumber.status;

        return error.status;
    } catch (err) {
        console.log(err);
    }
};

export { error, useValidate };
