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
});

const setIsSidebar = () => {
    try {
        state.isSidebar = !state.isSidebar;
    } catch (error) {
        console.log(error);
    }
};

const setListEmployees = (list) => {
    try {
        state.listEmployees = list;
    } catch (error) {
        console.log(error);
    }
};

const setTitleForm = (title) => {
    try {
        state.titleForm = title;
    } catch (error) {
        console.log(error);
    }
};

const setIsForm = () => {
    try {
        state.isForm = !state.isForm;
    } catch (error) {
        console.log(error);
    }
};

const setEmployeeSelected = (employee) => {
    try {
        state.employeeSelected = employee;
    } catch (error) {
        console.log(error);
    }
};

const setTotalEmployee = (total) => {
    try {
        state.totalEmployee = total;
    } catch (error) {
        console.log(error);
    }
};

const setTotalPage = (total) => {
    try {
        state.totalPageValue = total;
    } catch (error) {
        console.log(error);
    }
};

const setIdentityForm = (val) => {
    try {
        state.identityForm = val;
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
};
