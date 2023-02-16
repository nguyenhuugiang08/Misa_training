import { ref } from "vue";
import axios from "axios";
import { MISA_RESOURCE } from "../base/resource";
import { MISA_ENUM } from "../base/enum";

/**
 * Xử lý dữ liệu liên quan đến employee
 * CreatedBy:  NHGiang - (30/12/2022)
 */
export const useEmployee = () => {
    try {
        const listEmployees = ref([]);
        const newEmployeeCode = ref(null);
        const listAllEmployees = ref([]);
        const editEmployee = ref(null);
        const totalRecord = ref(0);
        const totalPage = ref(1);

         // Lấy danh sách employees
         const getAllEmployees = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_MISA_EMPLOYEE_API}`);
                listAllEmployees.value = [...response.data];
            } catch (error) {
                console.log(error);
            }
        };

        // Lấy mã nhân viên mới khi thêm dữ liệu
        const getEmployeeCode = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_MISA_EMPLOYEE_API}/NewEmployeeCode`
                );
                const data = await response.text();

                newEmployeeCode.value = data;
            } catch (error) {
                console.log(error);
            }
        };

        // Thêm nhân viên mới
        const addNewEmloyee = async (employee, emit, formMode, isCloseForm) => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_MISA_EMPLOYEE_API}`,
                    employee
                );

                if (formMode !== MISA_ENUM.FORM_MODE.DUPLICATE) {
                    emit("endAdd", {
                        toastMessage: MISA_RESOURCE.TOAST.ADD_SUCCESS.TOAST_MESSAGE,
                        statusMessage: MISA_RESOURCE.TOAST.ADD_SUCCESS.STATUS_MESSAGE,
                        status: MISA_RESOURCE.TOAST.ADD_SUCCESS.STATUS,
                        isCloseForm,
                    });
                } else {
                    emit("endAdd", {
                        toastMessage: MISA_RESOURCE.TOAST.DUPLICATE_SUCCESS.TOAST_MESSAGE,
                        statusMessage: MISA_RESOURCE.TOAST.DUPLICATE_SUCCESS.STATUS_MESSAGE,
                        status: MISA_RESOURCE.TOAST.DUPLICATE_SUCCESS.STATUS,
                        isCloseForm,
                    });
                }
            } catch (error) {
                if (formMode !== MISA_ENUM.FORM_MODE.DUPLICATE) {
                    emit("endAdd", {
                        toastMessage: MISA_RESOURCE.TOAST.ADD_FAILED.TOAST_MESSAGE,
                        statusMessage: MISA_RESOURCE.TOAST.ADD_FAILED.STATUS_MESSAGE,
                        status: MISA_RESOURCE.TOAST.ADD_FAILED.STATUS,
                    });
                } else {
                    emit("endAdd", {
                        toastMessage: MISA_RESOURCE.TOAST.DUPLICATE_FAILED.TOAST_MESSAGE,
                        statusMessage: MISA_RESOURCE.TOAST.DUPLICATE_FAILED.STATUS_MESSAGE,
                        status: MISA_RESOURCE.TOAST.DUPLICATE_FAILED.STATUS,
                    });
                }
                console.log(error);
            }
        };

        // Tìm kiếm nhân viên theo tên, mã nhân viên
        const searchEmployees = async (keyword) => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_MISA_EMPLOYEE_API}/filter?entityFilter=${keyword}`
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
        const editAnEmployee = async (employee, emit, isCloseForm) => {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_MISA_EMPLOYEE_API}/${employee.EmployeeId}`,
                    employee
                );
                emit("endEdit", {
                    toastMessage: MISA_RESOURCE.TOAST.EDIT_SUCCESS.TOAST_MESSAGE,
                    statusMessage: MISA_RESOURCE.TOAST.EDIT_SUCCESS.STATUS_MESSAGE,
                    status: MISA_RESOURCE.TOAST.EDIT_SUCCESS.STATUS,
                    isCloseForm,
                });
            } catch (error) {
                emit("endEdit", {
                    toastMessage: MISA_RESOURCE.TOAST.EDIT_FAILED.TOAST_MESSAGE,
                    statusMessage: MISA_RESOURCE.TOAST.EDIT_FAILED.STATUS_MESSAGE,
                    status: MISA_RESOURCE.TOAST.EDIT_FAILED.STATUS,
                });
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

                const { Data, TotalRecord, TotalPage } = response.data;
                listEmployees.value = [...Data];
                totalRecord.value = TotalRecord;
                totalPage.value = TotalPage;
            } catch (error) {
                console.log(error);
            }
        };

        // xử lý xóa nhân viên theo mẫ
        const handleDeleteEmployee = async (employeeId) => {
            try {
                const response = await axios.delete(
                    `${import.meta.env.VITE_MISA_EMPLOYEE_API}/${employeeId}`
                );
            } catch (error) {
                console.log(error);
            }
        };

        // Xuất ra Excel
        const handlExportExcel = async ({ keyword, dataCount, pageNumber }) => {
            try {
                const outputFilename = MISA_RESOURCE.FILE_EXCEL_NAME;

                const headers = {
                    "Content-Disposition": `attachment; filename=${outputFilename}`,
                    "Content-Type":
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                };
                const config = {
                    method: "GET",
                    url: URL,
                    responseType: "arraybuffer",
                    headers,
                };

                const response = await axios.get(
                    `${
                        import.meta.env.VITE_MISA_EMPLOYEE_API
                    }/export?keyword=${keyword}&dataCount=${dataCount}&pageNumber=${pageNumber}`,
                    config
                );

                const url = URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", outputFilename);
                document.body.appendChild(link);
                link.click();
            } catch (error) {
                console.log(error);
            }
        };

        // Thực hiện xóa nhiều bản ghi
        const handleBulkDelete = async (employeeIds) => {
            try {
                const response = await axios.delete(
                    `${import.meta.env.VITE_MISA_EMPLOYEE_API}/deleteMultipleEmployee`,
                    {
                        data: employeeIds,
                    }
                );
            } catch (error) {
                console.log(error);
            }
        };

        return {
            listEmployees,
            newEmployeeCode,
            listAllEmployees,
            editEmployee,
            totalRecord,
            totalPage,
            getEmployeeCode,
            addNewEmloyee,
            searchEmployees,
            getAnEmployee,
            getAllEmployees,
            editAnEmployee,
            handleFilterPage,
            handleDeleteEmployee,
            handlExportExcel,
            handleBulkDelete,
        };
    } catch (error) {
        console.log(error);
    }
};
