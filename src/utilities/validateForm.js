import { MISA_ENUM } from "../base/enum";
import { reactive } from "vue";
import { MISA_RESOURCE } from "../base/resource";

const error = reactive({
    employeeCodeError: {
        textError: "",
        status: false,
    },
    employeeNameError: {
        textError: "",
        status: false,
    },
    dateOfBrithError: {
        textError: "",
        status: false,
    },
    identityDateError: {
        textError: "",
        status: false,
    },
    phoneNumberError: {
        textError: "",
        status: false,
    },
    landlineNumberError: {
        textError: "",
        status: false,
    },
    emailError: {
        textError: "",
        status: false,
    },
    identityNumberError: {
        textError: "",
        status: false,
    },
    departmentError: {
        textError: "",
        status: false,
    },
    status: false,
});

const {
    employeeCodeErrorText,
    employeeNameErrorText,
    dateOfBirthErrorText,
    identityDateErrorText,
    phoneNumberErrorText,
    landlineNumberErrorText,
    emailErrorText,
    identityNumberErrorText,
    departmentErrorText,
} = MISA_RESOURCE;

/**
 * Xử lý check định đạng email
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
const useValidate = (employee, list, identityForm, employeeSelectedCode, listDepartments) => {
    try {
        // Validate employee code
        if (!employee.EmployeeCode) {
            error.employeeCodeError.textError = employeeCodeErrorText.blank;
            error.employeeCodeError.status = true;
        } else {
            if (identityForm === MISA_ENUM.FORM_MODE.ADD) {
                const listCodes = list.map((emp) => emp.EmployeeCode);
                if (listCodes.includes(employee.EmployeeCode)) {
                    error.employeeCodeError.textError = employeeCodeErrorText.duplicate;
                    error.employeeCodeError.status = true;
                } else {
                    error.employeeCodeError.textError = "";
                    error.employeeCodeError.status = false;
                }
            }

            if (identityForm === MISA_ENUM.FORM_MODE.EDIT) {
                const listCodes = list
                    .filter((item) => item.EmployeeCode !== employeeSelectedCode)
                    .map((emp) => emp.EmployeeCode);
                if (listCodes.includes(employee.EmployeeCode)) {
                    error.employeeCodeError.textError = employeeCodeErrorText.duplicate;
                    error.employeeCodeError.status = true;
                } else {
                    error.employeeCodeError.textError = "";
                    error.employeeCodeError.status = false;
                }
            }
        }

        // Valide employee name
        if (!employee.FullName) {
            error.employeeNameError.textError = employeeNameErrorText.blank;
            error.employeeNameError.status = true;
        } else {
            error.employeeNameError.textError = "";
            error.employeeNameError.status = false;
        }

        //Validate ngày sinh
        if (employee.DateOfBirth) {
            if (!handleCheckFormat(MISA_RESOURCE.REGEX.DATE, employee.DateOfBirth)) {
                error.dateOfBrithError.textError = dateOfBirthErrorText.invalid;
                error.dateOfBrithError.status = true;
            } else {
                const yearOfBirth = Number(employee.DateOfBirth.split("/")[2]);
                const dayOfBirth = Number(employee.DateOfBirth.split("/")[0]);
                const monthOfBirth = Number(employee.DateOfBirth.split("/")[1]);

                if (new Date(yearOfBirth + 18, monthOfBirth - 1, dayOfBirth) <= new Date()) {
                    error.dateOfBrithError.textError = "";
                    error.dateOfBrithError.status = false;
                } else {
                    error.dateOfBrithError.textError = dateOfBirthErrorText.over;
                    error.dateOfBrithError.status = true;
                }
            }
        } else {
            error.dateOfBrithError.textError = "";
            error.dateOfBrithError.status = false;
        }

        //Validate ngày cấp
        if (employee.IdentityDate) {
            if (!handleCheckFormat(MISA_RESOURCE.REGEX.DATE, employee.IdentityDate)) {
                error.identityDateError.textError = identityDateErrorText.invalid;
                error.identityDateError.status = true;
            } else {
                error.identityDateError.textError = "";
                error.identityDateError.status = false;
            }
        } else {
            error.identityDateError.textError = "";
            error.identityDateError.status = false;
        }

        // Validate số điện thoại
        if (employee.PhoneNumber) {
            if (!handleCheckFormat(MISA_RESOURCE.REGEX.PHONE_NUMBER, employee.PhoneNumber)) {
                error.phoneNumberError.textError = phoneNumberErrorText.invalid;
                error.phoneNumberError.status = true;
            } else {
                error.phoneNumberError.textError = "";
                error.phoneNumberError.status = false;
            }
        } else {
            error.phoneNumberError.textError = "";
            error.phoneNumberError.status = false;
        }

        // validate số điện thoại cố định
        if (employee.LandlineNumber) {
            if (!handleCheckFormat(MISA_RESOURCE.REGEX.PHONE_NUMBER, employee.LandlineNumber)) {
                error.landlineNumberError.textError = landlineNumberErrorText.invalid;
                error.landlineNumberError.status = true;
            } else {
                error.landlineNumberError.textError = "";
                error.landlineNumberError.status = false;
            }
        } else {
            error.landlineNumberError.textError = "";
            error.landlineNumberError.status = false;
        }

        // Validate email
        if (employee.Email) {
            if (!handleCheckFormat(MISA_RESOURCE.REGEX.EMAIL, employee.Email)) {
                error.emailError.textError = emailErrorText.invalid;
                error.emailError.status = true;
            } else {
                error.emailError.textError = "";
                error.emailError.status = false;
            }
        } else {
            error.emailError.textError = "";
            error.emailError.status = false;
        }

        // Validate số căn cước công dân
        if (employee.IdentityNumber) {
            if (!handleCheckFormat(MISA_RESOURCE.REGEX.IDENTITY_NUMBER, employee.IdentityNumber)) {
                error.identityNumberError.textError = identityNumberErrorText.invalid;
                error.identityNumberError.status = true;
            } else {
                error.identityNumberError.textError = "";
                error.identityNumberError.status = false;
            }
        } else {
            error.identityNumberError.textError = "";
            error.identityNumberError.status = false;
        }

        // Validate đơn vị
        const departmentNames = listDepartments.value.map((option) => option.optionName);
        if (!employee.DepartmentId) {
            error.departmentError.textError = departmentErrorText.blank;
            error.departmentError.status = true;
        } else if (!departmentNames.includes(employee.DepartmentName)) {
            error.departmentError.textError = departmentErrorText.notFound;
            error.departmentError.status = true;
        } else {
            error.departmentError.textError = "";
            error.departmentError.status = false;
        }

        error.status =
            error.employeeCodeError.status ||
            error.employeeNameError.status ||
            error.dateOfBrithError.status ||
            error.identityDateError.status ||
            error.phoneNumberError.status ||
            error.landlineNumberError.status ||
            error.emailError.status ||
            error.departmentError.status ||
            error.identityNumberError.status;

        return error.status;
    } catch (err) {
        console.log(err);
    }
};

export { error, useValidate };
