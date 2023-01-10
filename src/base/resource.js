import { MISA_ENUM } from "./enum";

export const MISA_RESOURCE = {
    employeeCodeErrorText: {
        blank: "Mã nhân viên không được để trống.",
        duplicate: "Mã nhân viên này đã tồn tại.",
    },
    employeeNameErrorText: {
        blank: "Tên nhân viên không được để trống.",
    },
    dateOfBirthErrorText: {
        invalid: "Ngày sinh không hợp lệ.",
        over: "Nhân viên phải trên 18 tuổi.",
    },
    identityDateErrorText: {
        invalid: "Ngày cấp không hợp lệ.",
    },
    phoneNumberErrorText: {
        invalid: "Số điện thoại không hợp lệ.",
    },
    emailErrorText: {
        invalid: "Email không đúng định dạng.",
    },
    FORM_TITLE: {
        ADD: "Thêm nhân viên", // tiêu đề form thêm
        EDIT: "Sửa thông tin nhân viên", // tiêu đề form sửa
        DUPLICATE: "Nhân bản nhân viên", // tiêu đề form nhân bản
    },
    MONTH_DATEPICKER: {
        Jan: "Tháng 1",
        Feb: "Tháng 2",
        Mar: "Tháng 3",
        Apr: "Tháng 4",
        May: "Tháng 5",
        Jun: "Tháng 6",
        Jul: "Tháng 7",
        Aug: "Tháng 8",
        Sep: "Tháng 9",
        Oct: "Tháng 10",
        Nov: "Tháng 11",
        Dec: "Tháng 12",
    },
    TOAST: {
        ADD_SUCCESS: {
            TOAST_MESSAGE: "Nhân viên đã được thêm.",
            STATUS_MESSAGE: "Thành công!",
            STATUS: MISA_ENUM.STATUS_TOAST.SUCCESS,
        },
        ADD_FAILED: {
            TOAST_MESSAGE: "Thêm nhân viên thất bại, vui lòng kiểm tra lại.",
            STATUS_MESSAGE: "Lỗi!",
            STATUS: MISA_ENUM.STATUS_TOAST.ERROR,
        },
        EDIT_SUCCESS: {
            TOAST_MESSAGE: "Thông tin nhân viên đã được thay đổi.",
            STATUS_MESSAGE: "Thành công!",
            STATUS: MISA_ENUM.STATUS_TOAST.SUCCESS,
        },
        EDIT_FAILED: {
            TOAST_MESSAGE: "Sửa thông tin nhân viên thất bại, vui lòng kiểm tra lại.",
            STATUS_MESSAGE: "Lỗi!",
            STATUS: MISA_ENUM.STATUS_TOAST.ERROR,
        },
    },
};
