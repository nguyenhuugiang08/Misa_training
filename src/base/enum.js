export const MISA_ENUM = {
    pageSizeOptions: [
        {
            optionId: 10, // 10 bản ghi trên 1 trang
            optionName: "10 bản ghi trên 1 trang",
        },
        {
            optionId: 20, // 20 bản ghi trên 1 trang
            optionName: "20 bản ghi trên 1 trang",
        },
        {
            optionId: 30, // 30 bản ghi trên 1 trang
            optionName: "30 bản ghi trên 1 trang",
        },
        {
            optionId: 50, // 50 bản ghi trên 1 trang
            optionName: "50 bản ghi trên 1 trang",
        },
        {
            optionId: 100, // 100 bản ghi trên 1 trang
            optionName: "100 bản ghi trên 1 trang",
        },
    ],
    FORM_MODE: {
        ADD: 0, // trạng thái form thêm
        EDIT: 1, // trạng thái form sửa
        DUPLICATE: 2, //trạng thái form nhân bản
    },
    GENDER: {
        MALE: 0, // nam
        FEMALE: 1, // nữ
        OTHER: 2, // khác
    },
    STATUS_TOAST: {
        SUCCESS: 0, // thành công
        ERROR: 1, // lỗi
        WARNING: 2, // cảnh báo
        INFO: 3, // thông báo
    },
    KEY_CODE: {
        ENTER: 13, // phím enter
        DOWN_ARROW: 40, // phím mũi tên xuống
        UP_ARROW: 38, // phím mũi tên lên
        ESCAPE: 27, // phím esc
        TAB: 9, // phím tab
        INSERT: 45, // phím insert
        DELETE: 46, // phím delete
    },
    STATUS_CODE: {
        BAD_REQUEST: 400, // status code 400
        INTERNAL_SERVER_ERROR: 500, // status code 500
    },
    HEIGHT_PAYMENT_CONTENT: 660, // Chiều cao phần content trang phiếu chi
    HEIGHT_PAYMENT_MASTER: 383, // Chiều cao phần master trang phiếu chi
    HEIGHT_PAYMENT_DETAIL: 264, // Chiều cao phần detail trang phiếu chi
    MAX_LENGTH_ACCOUNTNUMBER: 20,
    MIN_LENGTH_ACCOUNTNUMBER: 3,
    STATUS_SAVE_PAYMENT: {
        SAVE: 0, // Cất - không thực hiện đóng form -> hiển thị dữ liệu người dùng vừa nhập, disable các trường nhập dữ liệu
        SAVE_ADD: 1, // Cất và thêm
        SAVE_CLOSE: 2, // Cất và đóng
    },
    GRADE_DEFAULT: 0, // bậc tài khoản ban đầu
    PAGENUMBER_DEFAULT: 1, // Trang đầu tiêng
    INDEX_SIDEBAR_CATEGORY: 16, // index của page danh mục trên sidebar
    TIMEZONE_DIFFERENCE: 7, // giờ chênh lệch
    STATUS_SAVE_ACCOUNT: {
        SAVE: 0, // Cất
        SAVE_ADD: 1, // Cất và thêm
    },
    ACTION_SELECTED_DEFAULT: 0, // hành động mặc định combo button UI Payment detail (Cất và đóng)
};
