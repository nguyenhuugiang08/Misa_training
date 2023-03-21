import { ref } from "vue";
import { MISA_RESOURCE } from "../base/resource";
import { MISA_ENUM } from "../base/enum";
import employeeApi from "../api/employeeApi";
import diy from "../store/diy";

const { setListToast, setEmployees } = diy;

/**
 * Xử lý dữ liệu liên quan đến employee
 * CreatedBy:  NHGiang - (30/12/2022)
 */
export const useEmployee = () => {
    try {
        const listEmployees = ref([]); // Danh sách nhân viên
        const newEmployeeCode = ref(null); // Mã nhân viên mới
        const listAllEmployees = ref([]); // Danh sách tất cả nhân viên
        const editEmployee = ref(null); // Thông tin nhân viên được chọn để chỉnh sửa
        const totalRecord = ref(0); // Tổng số bản ghi có trong DB
        const totalPage = ref(1); // Tổng số trang

        /**
         * hàm gọi API và lấy danh sách tất cả nhân viên
         * Created by: NHGiang - (20/02/23)
         */
        const getAllEmployees = async () => {
            try {
                const response = await employeeApi.getEmployees();
                const Options = response.map((employee) => {
                    return {
                        optionId: employee.EmployeeId,
                        optionCode: employee.EmployeeCode,
                        optionName: employee.FullName,
                        optionOrganization: employee.DepartmentName,
                        optionPhone: employee.PhoneNumber,
                    };
                });
                setEmployees(Options);
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm gọi API và lấy mã nhân viên mới
         * Created by: NHGiang - (20/02/23)
         */
        const getEmployeeCode = async () => {
            try {
                const response = await employeeApi.getEmployeeCode();

                newEmployeeCode.value = response;
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm gọi API thực hiện thêm nhân viên mới
         * @param {*} employee -- Object chứa thông tin của nhân viên mói
         * @param {*} emit
         * @param {*} formMode -- Chế độ form thêm
         * @param {*} isCloseForm -- trạng thái Đóng/Mở form
         * Created by: NHGiang - (20/02/23)
         */
        const addNewEmloyee = async (employee, emit, formMode, isCloseForm) => {
            try {
                const response = await employeeApi.addNewEmloyee(employee);

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

        /**
         * hàm gọi API và lấy thông tin của nhân viên theo ID
         * @param {*} employeeId -- ID của nhân viên
         * Created by: NHGiang - (20/02/23)
         */
        const getAnEmployee = async (employeeId) => {
            try {
                const response = await employeeApi.getEmployeeById(employeeId);

                editEmployee.value = response;
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * hàm gọi API và sửa thông tin nhân viên theo ID
         * @param {*} employee -- Thông tin của nhân viên sau sửa
         * @param {*} emit
         * @param {*} isCloseForm -- Trạng thái Đóng/Mở form
         */
        const editAnEmployee = async (employee, emit, isCloseForm) => {
            try {
                const response = await employeeApi.editEmployee(employee);

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

        /**
         * Hàm gọi API và lấy danh sách nhân viên theo bộ lọc và phân trang
         * @param {*} keyword -- Từ khóa tìm kiếm
         * @param {*} pageSize -- Số bản ghi trên 1 trang, mặc định là 20 bản ghi trên 1 trang
         * @param {*} pageNumber -- trang thứ bao nhiêu, mặc định là trang đầu tiên
         * Created by: NHGiang - (20/02/23)
         */
        const handleFilterPage = async (keyword, pageSize = 20, pageNumber = MISA_ENUM.PAGENUMBER_DEFAULT) => {
            try {
                const response = await employeeApi.getEmployeesByFilterAndPaging(
                    keyword,
                    pageSize,
                    pageNumber
                );

                const { Data, TotalRecord, TotalPage } = response;
                listEmployees.value = [...Data];
                totalRecord.value = TotalRecord;
                totalPage.value = TotalPage;
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm gọi API và thực hiện xóa nhân viên theo ID
         * @param {String} employeeId -- ID của nhân viên cần xóa
         * Created by: NHGiang - (20/02/23)
         */
        const handleDeleteEmployee = async (employeeId) => {
            try {
                const response = await employeeApi.deleteEmployee(employeeId);
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm gọi API và thực hiện xuất danh sách nhân viên ra file excel
         * @param {*} param0
         * Created by: NHGiang - (20/02/23)
         */
        const handlExportExcel = async ({ keyword, dataCount, pageNumber }) => {
            try {
                const outputFilename = MISA_RESOURCE.FILE_EXCEL_NAME;

                const response = await employeeApi.exportExcel(keyword, dataCount, pageNumber);

                // Thực hiện tạo 1 thẻ a để thực hiện tải file khi xuất xong
                const url = URL.createObjectURL(new Blob([response]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", outputFilename);
                document.body.appendChild(link);
                link.click();
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm gọi API và thực hiện xóa nhiều nhân viên được chọn
         * @param {*} employeeIds -- Danh sách ID của các nhân viên muốn xóa
         * Created by: NHGiang - (20/02/23)
         */
        const handleBulkDelete = async (employeeIds) => {
            try {
                const response = await employeeApi.deleteMultipleEmployees(employeeIds);

                const toastMessage = {
                    toastMessage: MISA_RESOURCE.TOAST.DELETE_MULTIPLE_SUCCESS.TOAST_MESSAGE,
                    statusMessage: MISA_RESOURCE.TOAST.DELETE_MULTIPLE_SUCCESS.STATUS_MESSAGE,
                    status: MISA_RESOURCE.TOAST.DELETE_MULTIPLE_SUCCESS.STATUS,
                };
                setListToast(toastMessage);
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
