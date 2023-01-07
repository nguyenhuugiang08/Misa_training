import { reactive, readonly } from "vue";

const state = reactive({
    isSidebar: false,
    listEmployees: [],
    titleForm: "",
    isForm: false,
    employeeSelected: {},
    totalEmployee: 0,
    totalPageValue: 1,
    identityForm: 0,
    listAllEmployee: [],
});

// set giá trị cho isSidebar thực hiện chức năng thu gọn/mở rộng sidebar
const setIsSidebar = () => {
    try {
        state.isSidebar = !state.isSidebar;
    } catch (error) {
        console.log(error);
    }
};

// set danh sách các nhân viên dùng chung cho nhiều components
const setListEmployees = (list) => {
    try {
        state.listEmployees = list;
    } catch (error) {
        console.log(error);
    }
};

// set title cho form
const setTitleForm = (title) => {
    try {
        state.titleForm = title;
    } catch (error) {
        console.log(error);
    }
};

// set giá trị để đóng/ mở form
const setIsForm = () => {
    try {
        state.isForm = !state.isForm;
    } catch (error) {
        console.log(error);
    }
};

// lấy ra nhân viên được chọn để update thông tin
const setEmployeeSelected = (employee) => {
    try {
        state.employeeSelected = employee;
    } catch (error) {
        console.log(error);
    }
};

// lấy ra tổng số bản ghi trong database
const setTotalEmployee = (total) => {
    try {
        state.totalEmployee = total;
    } catch (error) {
        console.log(error);
    }
};

// Lấy ra tổng số trang theo số bản ghi trên 1 trang
const setTotalPage = (total) => {
    try {
        state.totalPageValue = total;
    } catch (error) {
        console.log(error);
    }
};

// định nghĩa form theo action (0: thêm, 1: sửa)
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

export default {
    state: readonly(state),
    setIsSidebar,
    setListEmployees,
    setTitleForm,
    setIsForm,
    setEmployeeSelected,
    setTotalEmployee,
    setTotalPage,
    setIdentityForm,
    setlistAllEmployee,
};
