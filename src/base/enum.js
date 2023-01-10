export const MISA_ENUM = {
    pageSizeOptions: [
        {
            optionId: 10,
            optionName: "10 bản ghi trên 1 trang",
        },
        {
            optionId: 20,
            optionName: "20 bản ghi trên 1 trang",
        },
        {
            optionId: 30,
            optionName: "30 bản ghi trên 1 trang",
        },
        {
            optionId: 50,
            optionName: "50 bản ghi trên 1 trang",
        },
        {
            optionId: 100,
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
    }
};
