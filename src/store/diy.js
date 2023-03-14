import { reactive, readonly } from "vue";
import { MISA_ENUM } from "../base/enum";

const state = reactive({
    isSidebar: false, // Trạng thái Đóng/Mở sidebar
    Entities: [], // Danh sách đối tượng
    titleForm: "", // Tiêu đề form
    isForm: false, // trạng thái Đóng/ Mở form
    entitySelected: {}, // Thông tin đối tượng đang được chọn
    totalEntities: 0, // Tổng số bản ghi
    totalPageValue: 1, // Tổng số trang
    identityForm: MISA_ENUM.FORM_MODE.ADD, // Định danh form - mặc định là form thêm
    listAllEntities: [], // Danh sách tất cả đối tượng
    listToast: [], // Danh sách toast message
    listItemChecked: [], // Danh sách các item được chọn
    listPageChecked: [], // Danh sách các page đã được check all
    keyword: "", // Từ khóa tìm kiếm
    isLoading: false, // Trạng thái Ẩn hiện loading
    objects: [],
    employees: [],
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
 * Set lại danh sách đối tượng
 * @param {*} list -- Danh sách đối tượng
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
 * lấy ra đối tượng được chọn để update thông tin
 * @param {*} entity -- Đối tượng Employee đã chọn
 * Created by: NHGiang - (17/02/23)
 */
const setEntitySelected = (entity) => {
    try {
        state.entitySelected = entity;
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

//Lây ra danh sách đối tượng đã tồn tại
const setlistAllEntities = (list) => {
    try {
        state.listAllEntities = list;
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

/**
 * Hàm set trạng lại loading
 * Created By: NHGiang - (12/02/23)
 */
const setIsLoading = () => {
    try {
        state.isLoading = !state.isLoading;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Lấy ra danh sách đối tượng
 * @param {*} objects 
 */
const setObjects = (objects) => {
    try {
        state.objects = [...objects];
    } catch (error) {
        console.log(error);
    }
};

/**
 * Lấy ra danh sách nhân viên
 * @param {*} objects 
 */
const setEmployees = (objects) => {
    try {
        state.employees = [...objects];
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
    setEntitySelected,
    setTotalEntities,
    setTotalPage,
    setIdentityForm,
    setlistAllEntities,
    setListToast,
    setListItemChecked,
    setKeyword,
    setListPageChecked,
    deleteToastHidden,
    setIsLoading,
    setObjects,
    setEmployees
};
