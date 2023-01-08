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
    status: false,
});

const {
    employeeCodeErrorText,
    employeeNameErrorText,
    dateOfBirthErrorText,
    identityDateErrorText,
    phoneNumberErrorText,
    emailErrorText,
} = MISA_RESOURCE;

/**
 * Xử lý validate định dạng ngày tháng
 * CreatedBy: NHGiang
 */
const handleCheckDatetime = (dateTime) => {
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
        return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
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
        if (!employee.employeeCode) {
            error.employeeCodeError.textError = employeeCodeErrorText.blank;
            error.employeeCodeError.status = true;
        } else {
            if (identityForm === 0) {
                const listCodes = list.map((emp) => emp.EmployeeCode);
                if (listCodes.includes(employee.employeeCode)) {
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
                if (listCodes.includes(employee.employeeCode)) {
                    error.employeeCodeError.textError = employeeCodeErrorText.duplicate;
                    error.employeeCodeError.status = true;
                } else {
                    error.employeeCodeError.textError = "";
                    error.employeeCodeError.status = false;
                }
            }
        }

        // Valide employee name
        if (!employee.fullName) {
            error.employeeNameError.textError = employeeNameErrorText.blank;
            error.employeeNameError.status = true;
        } else {
            error.employeeNameError.textError = "";
            error.employeeNameError.status = false;
        }

        //Validate ngày sinh
        if (employee.dateOfBirth) {
            if (!handleCheckDatetime(employee.dateOfBirth)) {
                error.dateOfBrithError.textError = dateOfBirthErrorText.invalid;
                error.dateOfBrithError.status = true;
            } else {
                const yearOfBirth = employee.dateOfBirth.split("/")[2];
                const currentYear = new Date().getFullYear();
                if (currentYear - yearOfBirth < 18) {
                    error.dateOfBrithError.textError = dateOfBirthErrorText.over;
                    error.dateOfBrithError.status = true;
                } else {
                    error.dateOfBrithError.textError = "";
                    error.dateOfBrithError.status = false;
                }
            }
        }

        //Validate ngày cấp
        if (employee.identityDate) {
            if (!handleCheckDatetime(employee.identityDate)) {
                error.identityDateError.textError = identityDateErrorText.invalid;
                error.identityDateError.status = true;
            } else {
                error.identityDateError.textError = "";
                error.identityDateError.status = false;
            }
        }

        // Validate số điện thoại
        if (employee.phoneNumber) {
            if (!handleCheckPhonenumber(employee.phoneNumber)) {
                error.phoneNumberError.textError = phoneNumberErrorText.invalid;
                error.phoneNumberError.status = true;
            } else {
                error.phoneNumberError.textError = "";
                error.phoneNumberError.status = false;
            }
        }

        // Validate email
        if (employee.email) {
            if (!handleCheckEmail(employee.email)) {
                error.emailError.textError = emailErrorText.invalid;
                error.emailError.status = true;
            } else {
                error.emailError.textError = "";
                error.emailError.status = false;
            }
        }

        error.status =
            error.employeeCodeError.status ||
            error.employeeNameError.status ||
            error.dateOfBrithError.status ||
            error.identityDateError.status ||
            error.phoneNumberError.status ||
            error.emailError.status;

        return error.status;
    } catch (err) {
        console.log(err);
    }
};

export { error, useValidate };
