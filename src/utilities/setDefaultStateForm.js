import { error } from "./validateForm";

/**
 * set lại trang thái lỗi ban đầu cho form khi mở lên
 */
export const handleSetStatusForm = () => {
    try {
        error.EmployeeCode = {
            textError: "",
            status: false,
        };
        error.FullName = {
            textError: "",
            status: false,
        };
        error.PhoneNumber = {
            textError: "",
            status: false,
        };
        error.Email = {
            textError: "",
            status: false,
        };
        error.DateOfBirth = {
            textError: "",
            status: false,
        };
        error.IdentityDate = {
            textError: "",
            status: false,
        };
        error.LandlineNumber = {
            textError: "",
            status: false,
        };
        error.DepartmentId = {
            textError: "",
            status: false,
        };
        error.IdentityNumber = {
            textError: "",
            status: false,
        };
        error.AccountNumber = {
            textError: "",
            status: false,
        };
        error.AccountName = {
            textError: "",
            status: false,
        };
        error.Type = {
            textError: "",
            status: false,
        };
        error.status = false;
    } catch (error) {
        console.log(error);
    }
};
