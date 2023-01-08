import { error } from "./validateForm";

/**
 * set lại trang thái lỗi ban đầu cho form khi mở lên
 */
export const handleSetStatusForm = () => {
    try {
        error.employeeCodeError = {
            textError: "",
            status: false,
        };
        error.employeeNameError = {
            textError: "",
            status: false,
        };
        error.phoneNumberError = {
            textError: "",
            status: false,
        };
        error.emailError = {
            textError: "",
            status: false,
        };
        error.dateOfBrithError = {
            textError: "",
            status: false,
        };
        error.identityDateError = {
            textError: "",
            status: false,
        };
        error.status = false;
    } catch (error) {
        console.log(error);
    }
};
