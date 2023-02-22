import { MISA_ENUM } from "./enum";

export const MISA_RESOURCE = {
    EmployeeCodeText: {
        blank: "Mã nhân viên không được để trống.", // Text lỗi khi mã nhân viên để trống.
        /**
         * Hàm trả về text lỗi khi mã trùng
         * @param {*} employeeCode -- Mã nhân viên cần check
         * @returns -- text lỗi
         */
        duplicate: (employeeCode) => `Mã <${employeeCode}> đã tồn tại.`,
        invalid: "Mã nhân viên không đúng định dạng."
    },
    FullNameText: {
        blank: "Tên không được để trống.", // Text lỗi khi tên nhân viên để trống.
    },
    DateOfBirthText: {
        invalid: "Ngày sinh không hợp lệ.", // Text lỗi khi ngày sinh không hợp lệ.
        over: "Nhân viên phải trên 18 tuổi.", // Text lỗi khi ngày sinh nhân viên chưa đủ 18 tuổi.
    },
    IdentityDateText: {
        invalid: "Ngày cấp không hợp lệ.",
        over: "Ngày cấp phải nhỏ hơn ngày hiện tại.",
    },
    PhoneNumberText: {
        invalid: "Số điện thoại không hợp lệ.",
    },
    LandlineNumberText: {
        invalid: "Số điện thoại cố định không hợp lệ.",
    },
    EmailText: {
        invalid: "Email không đúng định dạng.",
    },
    IdentityNumberText: {
        invalid: "Số căn cước không đúng định dạng.",
    },
    DepartmentIdText: {
        blank: "Đơn vị không được để trống.",
        notFound: "Dữ liệu <Đơn vị> không có trong danh mục.",
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
            STATUS_MESSAGE: "Thành công! ",
            STATUS: MISA_ENUM.STATUS_TOAST.SUCCESS, // trạng thái khi thêm thành công
        },
        ADD_FAILED: {
            TOAST_MESSAGE: "Thêm nhân viên thất bại, vui lòng kiểm tra lại.",
            STATUS_MESSAGE: "Lỗi!",
            STATUS: MISA_ENUM.STATUS_TOAST.ERROR, // trạng thái khi thêm thất bại
        },
        EDIT_SUCCESS: {
            TOAST_MESSAGE: "Thông tin nhân viên đã được thay đổi.",
            STATUS_MESSAGE: "Thành công! ",
            STATUS: MISA_ENUM.STATUS_TOAST.SUCCESS, // trạng thái khi sửa thất bại
        },
        EDIT_FAILED: {
            TOAST_MESSAGE: "Sửa thông tin nhân viên thất bại, vui lòng kiểm tra lại.",
            STATUS_MESSAGE: "Lỗi! ",
            STATUS: MISA_ENUM.STATUS_TOAST.ERROR, // trạng thái khi sửa thất bại
        },
        DUPLICATE_SUCCESS: {
            TOAST_MESSAGE: "Thông tin nhân viên đã được nhân bản.",
            STATUS_MESSAGE: "Thành công! ",
            STATUS: MISA_ENUM.STATUS_TOAST.SUCCESS, // trạng thái khi nhân bản thành công
        },
        DUPLICATE_FAILED: {
            TOAST_MESSAGE: "Nhân bản nhân viên thất bại, vui lòng kiểm tra lại.",
            STATUS_MESSAGE: "Lỗi! ",
            STATUS: MISA_ENUM.STATUS_TOAST.ERROR, // trạng thái khi nhân bản thất bại
        },
    },
    REGEX: {
        // biếu thức chính quy validate ngày tháng.
        DATE: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
        // Biểu thức chính quy validate email.
        EMAIL: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        // Biểu thức chính quy validate số điện thoại
        PHONE_NUMBER: /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,
        // biểu thức chính quy validate số chứng minh nhân dân
        IDENTITY_NUMBER: /^([0-9]{12})\b/,
        // Biểu thức chính quy validate mã nhân viên
        EMPLOYEE_CODE: /NV-[0-9]{5,17}\b/,
    },
    FILE_EXCEL_NAME: "Danh_sach_nhan_vien.xlsx", // Tên file excel khi xuất.
};
