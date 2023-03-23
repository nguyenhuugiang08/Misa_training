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
    AccountNumberText: {
        blank: "Số tài khoản không được để trống.",
        duplicate: (accountNumber) =>
            `Số tài khoản <${accountNumber}> đã tồn tại. Xin vui lòng kiểm tra lại.`,
        under: (length) => `Số tài khoản phải có độ dài >= ${length} ký tự.`,
        over: (length) => `Số tài khoản phải có độ dài <= ${length} ký tự.`,
    },
    AccountNameText: {
        blank: "Tên tài khoản không được để trống.",
    },
    TypeText: {
        blank: "Tính chất không được để trống.",
        notFound: "Dữ liệu <Tính chất> không có trong danh mục.",
    },
    RefNoText: {
        blank: "Số phiếu chi không được để trống.",
    },
    PostedDateText: {
        blank: "Ngày hạch toán không được để trống.",
        under: "Ngày hạch toán phải lớn hơn hoặc bằng Ngày chứng từ. Xin vui lòng kiểm tra lại.",
    },
    RefDateText: {
        blank: "Ngày phiếu chi không được để trống.",
    },
    ObjectIdText: {
        blank: "Đối tượng không được để trống.",
    },
    DebitAccountText: {
        blank: "Tài khoản nợ không được để trống.",
    },
    CreditAccountText: {
        blank: "Tài khoản có không được để trống.",
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
        DELETE_MULTIPLE_PAYMENT_SUCCESS: {
            TOAST_MESSAGE: "Xóa thành công các chứng từ đã chọn.",
            STATUS_MESSAGE: "Thành công! ",
            STATUS: MISA_ENUM.STATUS_TOAST.SUCCESS,
        },
        ADD_ACCOUNT_SUCCESS: {
            TOAST_MESSAGE: "Tài khoản đã được thêm.",
            STATUS_MESSAGE: "Thành công! ",
            STATUS: MISA_ENUM.STATUS_TOAST.SUCCESS,
        },
        EDIT_ACCOUNT_SUCCESS: {
            TOAST_MESSAGE: "Thông tin tài khoản đã được cập nhật.",
            STATUS_MESSAGE: "Thành công! ",
            STATUS: MISA_ENUM.STATUS_TOAST.SUCCESS,
        },
        DELETE_ACCOUNT_SUCCESS: {
            TOAST_MESSAGE: "Tài khoản đã được xóa.",
            STATUS_MESSAGE: "Thành công! ",
            STATUS: MISA_ENUM.STATUS_TOAST.SUCCESS,
        },
        ADD_PAYMENT_SUCCESS: {
            TOAST_MESSAGE: "Chứng từ đã được thêm.",
            STATUS_MESSAGE: "Thành công! ",
            STATUS: MISA_ENUM.STATUS_TOAST.SUCCESS,
        },
        EDIT_PAYMENT_SUCCESS: {
            TOAST_MESSAGE: "Thông tin chứng từ đã được cập nhật.",
            STATUS_MESSAGE: "Thành công! ",
            STATUS: MISA_ENUM.STATUS_TOAST.SUCCESS,
        },
        DELETE_PAYMENT_SUCCESS: {
            TOAST_MESSAGE: "Chứng từ đã được xóa.",
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
    FILE_EXCEL_PAYMENT_NAME: "Thu_chi_tien_mat.xlsx", // Tên file excel khi xuất.
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
            tooltip: "Tài khoản nợ",
        },
        {
            columnName: "TK Có",
            width: "150px",
            align: "left",
            isMoney: false,
            isSticky: false,
            tooltip: "Tài khoản có",
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
            dataShow: false,
        },
        {
            columnName: "Tên nhân viên",
            width: "150px",
            align: "left",
            identityOption: "optionName",
            isWrap: false,
            dataShow: true,
        },
        {
            columnName: "Đơn vị",
            width: "200px",
            align: "left",
            identityOption: "optionOrganization",
            isWrap: true,
            dataShow: false,
        },
        {
            columnName: "Số điện thoại",
            width: "150px",
            align: "left",
            identityOption: "optionPhone",
            isWrap: false,
            dataShow: false,
        },
    ],
    COLUMNS_NAME_COMBOBOX_ACCOUNT: [
        {
            columnName: "Số tài khoản",
            width: "100px",
            align: "left",
            identityOption: "optionName",
            isWrap: false,
            dataShow: true,
        },
        {
            columnName: "Tên tài khoản",
            width: "200px",
            align: "left",
            identityOption: "optionDes",
            isWrap: true,
            dataShow: false,
        },
    ],
    COLUMNS_NAME_COMBOBOX_OBJECT: [
        {
            columnName: "Đối tượng",
            width: "150px",
            align: "left",
            identityOption: "optionCode",
            isWrap: false,
            dataShow: true,
        },
        {
            columnName: "Tên đối tượng",
            width: "200px",
            align: "left",
            identityOption: "optionName",
            isWrap: false,
            dataShow: false,
        },
        {
            columnName: "Địa chỉ",
            width: "250px",
            align: "left",
            identityOption: "optionAddress",
            isWrap: true,
            dataShow: false,
        },
        {
            columnName: "Số điện thoại",
            width: "150px",
            align: "left",
            identityOption: "optionPhone",
            isWrap: false,
            dataShow: false,
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
    GUID_EMPTY: "00000000-0000-0000-0000-000000000000",
    REASON_PAYMENT_DEFAULT: "Chi tiền cho ",
    SIDEBAR_PAGES: [
        {
            sidebarTitle: "Tổng quan",
            img: "url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -33px -1630px",
            with: "18px",
            height: "20px",
            link: "/",
        },
        {
            sidebarTitle: "Tiền mặt",
            img: "url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -78px -1631px",
            with: "14px",
            height: "18px",
            link: "/cash/procedure",
            hasTabRouter: true,
        },
        {
            sidebarTitle: "Tiền gửi",
            img: "url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -121px -1633px",
            with: "16px",
            height: "16px",
            link: "/deposits",
        },
        {
            sidebarTitle: "Mua hàng",
            img: "url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -165px -1632px",
            with: "16px",
            height: "18px",
            link: "/purchase",
        },
        {
            sidebarTitle: "Bán hàng",
            img: "url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -206px -1631px",
            with: "20px",
            height: "18px",
            link: "/sell",
        },
        {
            sidebarTitle: "Quản lý đơn hàng",
            img: "url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -254px -1632px",
            with: "14px",
            height: "17px",
            link: "/order-management",
        },
        {
            sidebarTitle: "Kho",
            img: "url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -294px -1632px",
            with: "18px",
            height: "17px",
            link: "/granary",
        },
        {
            sidebarTitle: "Công cụ dụng cụ",
            img: "url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -339px -1633px",
            with: "18px",
            height: "17px",
            link: "/tools",
        },
        {
            sidebarTitle: "Tài sản cố định",
            img: "url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -382px -1632px",
            with: "17px",
            height: "18px",
            link: "/fixed-assets",
        },
        {
            sidebarTitle: "Thuế",
            img: "url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -427px -1634px",
            with: "16px",
            height: "16px",
            link: "/tax",
        },

        {
            sidebarTitle: "Giá thành",
            img: "url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -471px -1633px",
            with: "17px",
            height: "17px",
            link: "/worth",
        },
        {
            sidebarTitle: "Tổng hợp",
            img: "url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -514px -1632px",
            with: "16px",
            height: "18px",
            link: "/overall",
        },
        {
            sidebarTitle: "Ngân sách",
            img: "url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -381px -1663px",
            with: "18px",
            height: "18px",
            link: "/fund",
        },
        {
            sidebarTitle: "Báo cáo",
            img: "url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -552px -1636px",
            with: "14px",
            height: "13px",
            link: "/report",
        },
        {
            sidebarTitle: "Tổng hợp",
            img: "url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -207px -1667px",
            with: "17px",
            height: "14px",
            link: "/financial-analysis",
        },
    ],
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
        tooltip: "Đối tượng tập hợp chi phí",
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
        tooltip: "Khoản mục chi phí",
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
