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
        invalid: "Mã nhân viên không đúng định dạng.",
    },
    FullNameText: {
        blank: "Tên không được để trống.", // Text lỗi khi tên nhân viên để trống.
        invalid: "Tên nhân viên không đúng định dạng.",
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
        duplicate: "Số căn cước đã tồn tại trong hệ thống.",
    },
    DepartmentIdText: {
        blank: "Đơn vị không được để trống.",
        notFound: "Dữ liệu <Đơn vị> không có trong danh mục.",
    },
    FORM_TITLE: {
        ADD: "Thêm nhân viên", // tiêu đề form thêm
        EDIT: "Sửa thông tin nhân viên", // tiêu đề form sửa
        DUPLICATE: "Nhân bản nhân viên", // tiêu đề form nhân bản
        ADD_ACCOUNT: "Thêm tài khoản",
        EDIT_ACCOUNT: "Sửa tài khoản",
        DUPLICATE_ACCOUNT: "Nhân bản tài khoản",
    },
    MONTH_DATEPICKER: {
        "Thg 1": "Tháng 1",
        "Thg 2": "Tháng 2",
        "Thg 3": "Tháng 3",
        "Thg 4": "Tháng 4",
        "Thg 5": "Tháng 5",
        "Thg 6": "Tháng 6",
        "Thg 7": "Tháng 7",
        "Thg 8": "Tháng 8",
        "Thg 9": "Tháng 9",
        "Thg 10": "Tháng 10",
        "Thg 11": "Tháng 11",
        "Thg 12": "Tháng 12",
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
            STATUS: MISA_ENUM.STATUS_TOAST.SUCCESS, // trạng thái khi sửa thành công
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
        SERVER_ERROR: {
            TOAST_MESSAGE: "Có lỗi xảy ra, vui lòng liên hệ MISA để được giúp đỡ.",
            STATUS_MESSAGE: "Lỗi!",
            STATUS: MISA_ENUM.STATUS_TOAST.ERROR,
        },
        DELETE_MULTIPLE_SUCCESS: {
            TOAST_MESSAGE: "Xóa thành công các nhân viên đã chọn.",
            STATUS_MESSAGE: "Thành công! ",
            STATUS: MISA_ENUM.STATUS_TOAST.SUCCESS,
        },
    },
    REGEX: {
        // biếu thức chính quy validate ngày tháng.
        DATE: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
        // Biểu thức chính quy validate email.
        EMAIL: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        // Biểu thức chính quy validate số điện thoại
        PHONE_NUMBER: /0[0-9]{9}\b/,
        // biểu thức chính quy validate số chứng minh nhân dân
        IDENTITY_NUMBER: /^([0-9]{12})\b/,
        // Biểu thức chính quy validate mã nhân viên
        EMPLOYEE_CODE: /NV-[0-9]{5,17}\b/,
        // Biểu thức chính quy validate tên nhân viên
        FULL_NAME:
            /^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{1,100}$)\b/,
    },
    FILE_EXCEL_NAME: "Danh_sach_nhan_vien.xlsx", // Tên file excel khi xuất.
    COLUMNS_NAME_TABLE: [
        {
            columnName: "Số tài khoản",
            isLarge: false,
        },
        {
            columnName: "Tên tài khoản",
            isLarge: true,
        },
        {
            columnName: "Tính chất",
            isLarge: false,
        },
        {
            columnName: "Tên tiếng anh",
            isLarge: true,
        },
        {
            columnName: "Diễn giải",
            isLarge: true,
        },
        {
            columnName: "Trạng thái",
            isLarge: false,
        },
    ],
    TAB: [
        {
            tabName: "Quy trình",
            tabLink: "/cash/procedure",
        },
        {
            tabName: "Chi tiền",
            tabLink: "/cash/pay",
        },
    ],
    SAVE_ACTIVE: [
        {
            optionName: "Cất và đóng",
            optionId: 0,
        },
        {
            optionName: "Cất và thêm",
            optionId: 1,
        },
    ],
    PAY_ACTIVE: [
        {
            optionId: 0,
            optionName: "1. Trả tiền nhà cung cấp (không theo hóa đơn)",
        },
        {
            optionId: 1,
            optionName: "2. Trả các khoản vay",
        },
        {
            optionId: 2,
            optionName: "3. Tạm ứng cho nhân viên",
        },
        {
            optionId: 3,
            optionName: "4. Chi mua ngoài có hóa đơn",
        },
        {
            optionId: 4,
            optionName: "5. Trả lương nhân viên",
        },
        {
            optionId: 5,
            optionName: "6. Chuyển tiền cho chi nhánh khác",
        },
        {
            optionId: 6,
            optionName: "7. Chi khác",
        },
    ],
    COLUMNS_NAME_TABLE_DETAIL: [
        {
            columnName: "#",
            width: "34px",
            align: "left",
            isMoney: false,
            isSticky: true,
        },
        {
            columnName: "Diễn giải",
            width: "522px",
            align: "left",
            isMoney: false,
            isSticky: false,
        },
        {
            columnName: "TK Nợ",
            width: "150px",
            align: "left",
            isMoney: false,
            isSticky: false,
        },
        {
            columnName: "TK Có",
            width: "150px",
            align: "left",
            isMoney: false,
            isSticky: false,
        },
        {
            columnName: "Số tiền",
            width: "150px",
            align: "right",
            isMoney: true,
            isSticky: false,
        },
        {
            columnName: "Đối tượng",
            width: "150px",
            align: "left",
            isMoney: false,
            isSticky: false,
        },
        {
            columnName: "Tên đối tượng",
            width: "280px",
            align: "left",
            isMoney: false,
            isSticky: false,
        },
        {
            columnName: "",
            width: "35px",
            align: "center",
            isMoney: false,
            isSticky: true,
            isLast: true,
        },
    ],
    BUTTON_ACTION_SAVE: [
        {
            optionName: "Cất và đóng",
            tooltip: "Cất và đóng (Ctrl + Q)",
        },
        {
            optionName: "Cất và thêm",
            tooltip: "Cất và thêm (Ctrl + Shift + S)",
        },
    ],
    ACCOUNT_NATURE: [
        {
            optionId: 0,
            optionName: "Dư Có",
        },
        {
            optionId: 1,
            optionName: "Dư Nợ",
        },
        {
            optionId: 2,
            optionName: "Lưỡng tính",
        },
        {
            optionId: 3,
            optionName: "Không có số dư",
        },
    ],
    COLUMNS_NAME_TABLE_PAY: [
        {
            columnName: "Ngày hạch toán",
            width: "150px",
            align: "center",
        },
        {
            columnName: "Ngày chứng từ",
            width: "150px",
            align: "center",
        },
        {
            columnName: "Số chứng từ",
            width: "150px",
            align: "left",
        },
        {
            columnName: "Diễn giải",
            width: "310px",
            align: "left",
        },
        {
            columnName: "Số tiền",
            width: "150px",
            align: "right",
        },
        {
            columnName: "Mã Đối tượng",
            width: "150px",
            align: "left",
        },
        {
            columnName: "Đối tượng",
            width: "280px",
            align: "left",
        },
        {
            columnName: "Địa chỉ",
            width: "280px",
            align: "left",
        },
    ],
    COLUMNS_NAME_PAYMENT_DETAIL: [
        {
            columnName: "#",
            width: "34px",
            align: "left",
            isMoney: false,
            isSticky: true,
        },
        {
            columnName: "Diễn giải",
            width: "320px",
            align: "left",
            isMoney: false,
            isSticky: false,
        },
        {
            columnName: "TK Nợ",
            width: "150px",
            align: "left",
            isMoney: false,
            isSticky: false,
        },
        {
            columnName: "TK Có",
            width: "150px",
            align: "left",
            isMoney: false,
            isSticky: false,
        },
        {
            columnName: "Số tiền",
            width: "150px",
            align: "right",
            isMoney: true,
            isSticky: false,
        },
        {
            columnName: "Đối tượng",
            width: "150px",
            align: "left",
            isMoney: false,
            isSticky: false,
        },
        {
            columnName: "Tên đối tượng",
            width: "350px",
            align: "left",
            isMoney: false,
            isSticky: false,
        },
    ],
    OBJECT_TYPE: [
        {
            optionId: 0,
            optionName: "Nhà cung cấp",
        },
        {
            optionId: 1,
            optionName: "Khách hàng",
        },
        {
            optionId: 2,
            optionName: "Nhân viên",
        },
    ],
    TRACK_TYPE: [
        {
            optionId: 0,
            optionName: "Bắt buộc nhập",
        },
        {
            optionId: 1,
            optionName: "Chỉ cảnh báo",
        },
    ],
    COLUMNS_NAME_COMBOBOX_EMPLOYEE: [
        {
            columnName: "Mã nhân viên",
            width: "150px",
            align: "left",
            identityOption: "optionCode",
            isWrap: false,
        },
        {
            columnName: "Tên nhân viên",
            width: "150px",
            align: "left",
            identityOption: "optionName",
            isWrap: false,
        },
        {
            columnName: "Đơn vị",
            width: "200px",
            align: "left",
            identityOption: "optionOrganization",
            isWrap: true,
        },
        {
            columnName: "Số điện thoại",
            width: "150px",
            align: "left",
            identityOption: "optionPhone",
            isWrap: false,
        },
    ],
    COLUMNS_NAME_COMBOBOX_ACCOUNT: [
        {
            columnName: "Số tài khoản",
            width: "100px",
            align: "left",
            identityOption: "optionName",
            isWrap: false,
        },
        {
            columnName: "Tên tài khoản",
            width: "200px",
            align: "left",
            identityOption: "optionDes",
            isWrap: true,
        },
    ],
    COLUMNS_NAME_COMBOBOX_OBJECT: [
        {
            columnName: "Đối tượng",
            width: "150px",
            align: "left",
            identityOption: "optionCode",
            isWrap: false,
        },
        {
            columnName: "Tên đối tượng",
            width: "200px",
            align: "left",
            identityOption: "optionName",
            isWrap: false,
        },
        {
            columnName: "Địa chỉ",
            width: "250px",
            align: "left",
            identityOption: "optionAddress",
            isWrap: true,
        },
        {
            columnName: "Số điện thoại",
            width: "150px",
            align: "left",
            identityOption: "optionPhone",
            isWrap: false,
        },
    ],
    TITLE: {
        TITLE_DELETE_ACCOUNT: {
            title: "Xác nhận xóa",
            text: (accountNumber) =>
                `Bạn có thực sự muốn xóa Tài khoản <${accountNumber}> đã chọn không?`,
        },
        TITLE_DELETE_ACCOUNT_PARENT: {
            title: "Xóa không thành công",
            text: "Bạn phải xóa tất cả các tài khoản con trước khi xóa tài khoản cha.",
        },
        TITLE_CONFIRM_ACTIVE_ACCOUNT_CHILD: {
            title: "Xác nhận",
            text: 'Bạn có muốn thiết lập trạng thái "Sử dụng" cho tất cả Tài khoản con không?',
        },
    },
};

export const ACCOUNT_TRACK = [
    {
        trackText: "Đối tượng",
        isComboBox: true,
        options: MISA_RESOURCE.OBJECT_TYPE,
        default: MISA_RESOURCE.OBJECT_TYPE[1].optionId,
        identity: "Object",
    },
    {
        trackText: "Tài khoản ngân hàng",
        isComboBox: false,
        options: MISA_RESOURCE.TRACK_TYPE,
        default: MISA_RESOURCE.TRACK_TYPE[1].optionId,
        identity: "BankAccount",
    },
    {
        trackText: "Đối tượng THCP",
        isComboBox: true,
        options: MISA_RESOURCE.TRACK_TYPE,
        default: MISA_RESOURCE.TRACK_TYPE[1].optionId,
        identity: "Job",
    },
    {
        trackText: "Công trình",
        isComboBox: true,
        options: MISA_RESOURCE.TRACK_TYPE,
        default: MISA_RESOURCE.TRACK_TYPE[1].optionId,
        identity: "ProjectWork",
    },
    {
        trackText: "Đơn đặt hàng",
        isComboBox: true,
        options: MISA_RESOURCE.TRACK_TYPE,
        default: MISA_RESOURCE.TRACK_TYPE[1].optionId,
        identity: "Order",
    },
    {
        trackText: "Hợp đồng bán",
        isComboBox: true,
        options: MISA_RESOURCE.TRACK_TYPE,
        default: MISA_RESOURCE.TRACK_TYPE[1].optionId,
        identity: "PurchaseContract",
    },
    {
        trackText: "Hợp đồng mua",
        isComboBox: true,
        options: MISA_RESOURCE.TRACK_TYPE,
        default: MISA_RESOURCE.TRACK_TYPE[1].optionId,
        identity: "SaleContract",
    },
    {
        trackText: "Khoản mục CP",
        isComboBox: true,
        options: MISA_RESOURCE.TRACK_TYPE,
        default: MISA_RESOURCE.TRACK_TYPE[1].optionId,
        identity: "ExpenseItem",
    },
    {
        trackText: "Đơn vị",
        isComboBox: true,
        options: MISA_RESOURCE.TRACK_TYPE,
        default: MISA_RESOURCE.TRACK_TYPE[1].optionId,
        identity: "OrganizationUnit",
    },
    {
        trackText: "Mã thống kê",
        isComboBox: true,
        options: MISA_RESOURCE.TRACK_TYPE,
        default: MISA_RESOURCE.TRACK_TYPE[1].optionId,
        identity: "Item",
    },
];
