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
    emailErrorText,
    identityNumberErrorText,
    departmentErrorText,
} = MISA_RESOURCE;

/**
 * Xử lý validate định dạng ngày tháng
 * CreatedBy: NHGiang
 */
export const handleCheckDatetime = (dateTime) => {
    try {
        return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
            dateTime
        );
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý check định dạng số điện thoại
 * CreatedBy: NHGiang
 */
const handleCheckPhonenumber = (phoneNumber) => {
    try {
        return /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(phoneNumber);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý check định đạng email
 */
const handleCheckEmail = (email) => {
    try {
        return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
            email
        );
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý check định đạng email
 */
const handleCheckIndentityNumber = (identityNumber) => {
    try {
        return /^([0-9]{12})\b/.test(identityNumber);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý validate form
 * CreatedBy: NHGiang
 */
const useValidate = (employee, list, identityForm, employeeSelectedCode) => {
    try {
        // Validate employee code
        if (!employee.EmployeeCode) {
            error.employeeCodeError.textError = employeeCodeErrorText.blank;
            error.employeeCodeError.status = true;
        } else {
            if (identityForm === 0) {
                const listCodes = list.map((emp) => emp.EmployeeCode);
                if (listCodes.includes(employee.EmployeeCode)) {
                    error.employeeCodeError.textError = employeeCodeErrorText.duplicate;
                    error.employeeCodeError.status = true;
                } else {
                    error.employeeCodeError.textError = "";
                    error.employeeCodeError.status = false;
                }
            }

            if (identityForm === 1) {
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
            if (!handleCheckDatetime(employee.DateOfBirth)) {
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
            if (!handleCheckDatetime(employee.IdentityDate)) {
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
            if (!handleCheckPhonenumber(employee.PhoneNumber)) {
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

        // Validate email
        if (employee.Email) {
            if (!handleCheckEmail(employee.Email)) {
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
            if (!handleCheckIndentityNumber(employee.IdentityNumber)) {
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
        if (!employee.DepartmentId) {
            console.log(employee.PositionId);
            error.departmentError.textError = departmentErrorText.blank;
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
            error.emailError.status ||
            error.departmentError.status ||
            error.identityNumberError.status;

        return error.status;
    } catch (err) {
        console.log(err);
    }
};

export { error, useValidate };
