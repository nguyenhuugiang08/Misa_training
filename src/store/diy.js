import { reactive, readonly } from "vue";
import { MISA_ENUM } from "../base/enum";

const state = reactive({
    isSidebar: false, // Trạng thái Đóng/Mở sidebar
    Entities: [], // Danh sách nhân viên
    titleForm: "", // Tiêu đề form
    isForm: false, // trạng thái Đóng/ Mở form
    entitySelected: {}, // Thông tin nhân viên đang được chọn
    totalEntities: 0, // Tổng số bản ghi
    totalPageValue: 1, // Tổng số trang
    identityForm: MISA_ENUM.FORM_MODE.ADD, // Định danh form - mặc định là form thêm
    listAllEmployee: [], // Danh sách tất cả nhân viên
    listToast: [], // Danh sách toast message
    listItemChecked: [], // Danh sách các item được chọn
    listPageChecked: [], // Danh sách các page đã được check all
    keyword: "", // Từ khóa tìm kiếm
});

/**
 * Set trạng thái Đóng/Mở sidebar
 * Created by: NHGiang - (17/02/23)
 */
const setIsSidebar = () => {
    try {
        state.isSidebar = !state.isSidebar;
        const root = document.querySelector(":root");

        // set lại độ rộng cho sidebar
        if (state.isSidebar) {
            root.style.setProperty("--width-sidebar", "52px");
        } else {
            root.style.setProperty("--width-sidebar", "178px");
        }
    } catch (error) {
        console.log(error);
    }
};

/** ------------------------------------------------
 * Set lại danh sách nhân viên
 * @param {*} list -- Danh sách nhân viên
 * Created By: NHGiang - (17/02/23)
 */
const setEntities = (list) => {
    try {
        state.Entities = list;
    } catch (error) {
        console.log(error);
    }
};

/** ----------------------------------------------
 * Set tiêu đề cho form
 * @param {*} title -- Tiêu đề của Form
 * Created by: NHGiang - (17/02/23)
 */
const setTitleForm = (title) => {
    try {
        state.titleForm = title;
    } catch (error) {
        console.log(error);
    }
};

/** -----------------------------------------------
 * set giá trị để đóng/ mở form
 * Created by: NHGiang - (17/02/23)
 */
const setIsForm = () => {
    try {
        state.isForm = !state.isForm;
    } catch (error) {
        console.log(error);
    }
};

/** ------------------------------------------------
 * lấy ra nhân viên được chọn để update thông tin
 * @param {*} employee -- Đối tượng Employee đã chọn
 * Created by: NHGiang - (17/02/23)
 */
const setEmployeeSelected = (employee) => {
    try {
        state.employeeSelected = employee;
    } catch (error) {
        console.log(error);
    }
};

/** ------------------------------------------------
 * lấy ra tổng số bản ghi trong database
 * @param {*} total -- Tổng số bản ghi
 * Created by: NHGiang - (17/02/23)
 */
const setTotalEntities = (total) => {
    try {
        state.totalEntities = total;
    } catch (error) {
        console.log(error);
    }
};

/** ------------------------------------------------
 * Lấy ra tổng số trang theo số bản ghi trên 1 trang
 * @param {*} total -- Số bản ghi trên 1 trang
 * Created by: NHGiang - (17/02/23)
 */
const setTotalPage = (total) => {
    try {
        state.totalPageValue = total;
    } catch (error) {
        console.log(error);
    }
};

// định nghĩa form theo action (0: thêm, 1: sửa)
/** ------------------------------------------------
 * Lấy ra tổng số trang theo số bản ghi trên 1 trang
 * @param {*} val
 * Created by: NHGiang - (17/02/23)
 */
const setIdentityForm = (val) => {
    try {
        state.identityForm = val;
    } catch (error) {
        console.log(error);
    }
};

//Lây ra danh sách nhân viên đã tồn tại
const setlistAllEmployee = (list) => {
    try {
        state.listAllEmployee = list;
    } catch (error) {
        console.log(error);
    }
};

// thêm toast message vào danh sách
const setListToast = (toast) => {
    try {
        state.listToast.push(toast);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm xóa toast message khỏi mảng sau khi bị ẩn khỏi giao diện
 * Created by: NHGiang - (23/02/23)
 */
const deleteToastHidden = () => {
    try {
        state.listToast.pop();
    } catch (error) {
        console.log(error);
    }
};

// Lấy ra danh sách các item được check
const setListItemChecked = (list) => {
    try {
        state.listItemChecked = list;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Đặt lại từ khóa tìm khi nhập ô tìm kiếm
 * @param {*} searchString Từ khóa tìm kiếm
 * Craeted by: NHGiang - (19/02/23)
 */
const setKeyword = (searchString) => {
    try {
        state.keyword = searchString;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lưu lại các trang đã được check all
 * @param {*} list -- danh sách các trang đã check all
 * Created by: NHGiang - (22/02/23)
 */
const setListPageChecked = (list) => {
    try {
        state.listPageChecked = list;
    } catch (error) {
        console.log(error);
    }
};

export default {
    state: readonly(state),
    setIsSidebar,
    setEntities,
    setTitleForm,
    setIsForm,
    setEmployeeSelected,
    setTotalEntities,
    setTotalPage,
    setIdentityForm,
    setlistAllEmployee,
    setListToast,
    setListItemChecked,
    setKeyword,
    setListPageChecked,
    deleteToastHidden,
};
