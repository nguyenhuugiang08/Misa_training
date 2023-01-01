import { ref } from "vue";
import axios from "axios";

/**
 * Xử lý dữ liệu liên quan đến employee
 * CreatedBy:  NHGiang - (30/12/2022)
 */
export const useEmployee = () => {
    try {
        const listEmployees = ref([]);
        const newEmployeeCode = ref(null);
        const editEmployee = ref(null);

        // Lấy danh sách employees
        const getAllEmployees = async () => {
            const response = await axios.get(`${import.meta.env.VITE_MISA_EMPLOYEE_API}`);
            listEmployees.value = [...response.data];
        };

        // Lấy mã nhân viên mới khi thêm dữ liệu
        const getEmployeeCode = async () => {
            const response = await fetch(
                `${import.meta.env.VITE_MISA_EMPLOYEE_API}/NewEmployeeCode`
            );
            const data = await response.text();

            newEmployeeCode.value = data;
        };

        // Thêm nhân viên mới
        const addNewEmloyee = async (employee) => {
            console.log(employee);
            const response = await axios.post(
                `${import.meta.env.VITE_MISA_EMPLOYEE_API}`,
                employee
            );
            console.log(response);
        };

        // Tìm kiếm nhân viên theo tên, mã nhân viên
        const searchEmployees = async (keyword) => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_MISA_EMPLOYEE_API}/filter?employeeFilter=${keyword}`
                );
                const { Data } = response.data;
                listEmployees.value = [...Data];
            } catch (error) {
                console.log(error);
            }
        };

        // Lấy thông tin 1 nhân viên
        const getAnEmployee = async (employeeId) => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_MISA_EMPLOYEE_API}/${employeeId}`
                );

                const data = response.data;
                editEmployee.value = data;
            } catch (error) {
                console.log(error);
            }
        };

        // Sửa thông tin của nhân viên
        const editAnEmployee = async (employee) => {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_MISA_EMPLOYEE_API}/${employee.employeeId}`,
                    employee
                );
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };

        // Xử lý phân trang
        const handleFilterPage = async (pageSize = 20, pageNumber = 1) => {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_MISA_EMPLOYEE_API
                    }/filter?pageSize=${pageSize}&pageNumber=${pageNumber}`
                );
            } catch (error) {
                console.log(error);
            }
        };

        return {
            listEmployees,
            newEmployeeCode,
            editEmployee,
            getAllEmployees,
            getEmployeeCode,
            addNewEmloyee,
            searchEmployees,
            getAnEmployee,
            editAnEmployee,
            handleFilterPage,
        };
    } catch (error) {
        console.log(error);
    }
};
