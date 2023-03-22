import { error, paymentDetailErrors } from "./validateForm";

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
        error.RefDate = {
            textError: "",
            status: false,
        };
        error.RefNo = {
            textError: "",
            status: false,
        };
        error.PostedDate = {
            textError: "",
            status: false,
        };
        error.ObjectId = {
            textError: "",
            status: false,
        };
        error.DebitAccount = {
            textError: "",
            status: false,
        };
        error.CreditAccount = {
            textError: "",
            status: false,
        };

        paymentDetailErrors.splice(0, paymentDetailErrors.length);
        error.status = false;
    } catch (error) {
        console.log(error);
    }
};
