import { reactive } from "vue";
import { MISA_RESOURCE } from "../resource";

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
    return /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(phoneNumber);
};

/**
 * Xử lý validate form
 * CreatedBy: NHGiang
 */
const useValidate = (employee, list) => {
    try {
        // Validate employee code
        if (!employee.employeeCode) {
            error.employeeCodeError.textError = employeeCodeErrorText.blank;
            error.employeeCodeError.status = true;
            error.status = true;
        } else {
            const listCodes = list.map((emp) => emp.EmployeeCode);
            if (listCodes.includes(employee.employeeCode)) {
                error.employeeCodeError.textError = employeeCodeErrorText.duplicate;
                error.employeeCodeError.status = true;
                error.status = true;
            } else {
                error.employeeCodeError.textError = "";
                error.employeeCodeError.status = false;
                error.status = false;
            }
        }

        // Valide employee name
        if (!employee.fullName) {
            error.employeeNameError.textError = employeeNameErrorText.blank;
            error.employeeNameError.status = true;
            error.status = true;
        } else {
            error.employeeNameError.textError = "";
            error.employeeNameError.status = false;
            error.status = false;
        }

        //Validate ngày sinh
        if (employee.dateOfBirth) {
            if (!handleCheckDatetime(employee.dateOfBirth)) {
                error.dateOfBrithError.textError = dateOfBirthErrorText.invalid;
                error.dateOfBrithError.status = true;
                error.status = true;
            } else {
                const yearOfBirth = employee.dateOfBirth.split("/")[2];
                const currentYear = new Date().getFullYear();
                if (currentYear - yearOfBirth < 18) {
                    error.dateOfBrithError.textError = dateOfBirthErrorText.over;
                    error.dateOfBrithError.status = true;
                    error.status = true;
                }
            }
        }

        //Validate ngày cấp
        if (employee.identityDate) {
            if (!handleCheckDatetime(employee.identityDate)) {
                error.identityDateError.textError = identityDateErrorText.invalid;
                error.identityDateError.status = true;
                error.status = true;
            }
        }

        // Validate số điện thoại
        if (employee.phoneNumber) {
            if (!handleCheckPhonenumber(employee.phoneNumber)) {
                error.phoneNumberError.textError = phoneNumberErrorText.invalid;
                error.phoneNumberError.status = true;
                error.status = true;
            }
        }

        return error.status;
    } catch (err) {
        console.log(err);
    }
};

export { error, useValidate };
