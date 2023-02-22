import axios from "axios";
import { MISA_RESOURCE } from "../base/resource";
import axiosClient from "./axiosClient";

const baseUrl = "Employees";

/**
 * Các API liên quan đến employee
 * Created by: NHGiang - (22/02/23)
 */
const employeeApi = {
    /**
     * Hàm lấy danh sách tất cả nhân viên
     * @returns reponse
     */
    getEmployees: () => {
        try {
            return axiosClient.get(baseUrl);
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm lấy mã mới
     * @returns response
     * Created by: NHGiang - (22/02/23)
     */
    getEmployeeCode: () => {
        try {
            return axiosClient.get(`${baseUrl}/NewEmployeeCode`);
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm thêm 1 nhân viên mới
     * @param {*} employee -- Thông tin nhân viên cần thêm
     * @returns response
     */
    addNewEmloyee: (employee) => {
        try {
            return axiosClient.post(`${baseUrl}`, employee);
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm lấy danh sách nhân viên theo bộ lọc và phân trang
     * @param {*} keyword -- Từ khóa tìm kiếm
     * @param {*} pageSize -- Số bản ghi trên 1 trang
     * @param {*} pageNumber -- trang thứ bao nhiêu
     * @returns response
     * Created by: NHGiang - (20/02/23)
     */
    getEmployeesByFilterAndPaging: (keyword, pageSize, pageNumber) => {
        try {
            return axiosClient.get(`${baseUrl}/filter`, {
                params: {
                    entityFilter: keyword,
                    pageSize: pageSize,
                    pageNumber: pageNumber,
                },
            });
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm lấy thông tin nhân viên theo ID
     * @param {*} employeeId -- ID của nhân viên cần lấy thông tin
     * @returns response
     */
    getEmployeeById: (employeeId) => {
        try {
            return axiosClient.get(`${baseUrl}/${employeeId}`);
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm sửa thông tin 1 nhân viên
     * @param {*} employee -- Thông tin nhân viên sau khi sửa
     * @returns response
     */
    editEmployee: (employee) => {
        try {
            return axiosClient.put(`${baseUrl}/${employee.EmployeeId}`, employee);
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm xóa nhân viên theo ID
     * @param {*} employeeId -- ID của nhân viên cần xóa
     * @returns response
     */
    deleteEmployee: (employeeId) => {
        try {
            return axiosClient.delete(`${baseUrl}/${employeeId}`);
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm xuất danh sách nhân viên ra Excel
     * @param {*} keyword -- Từ khóa tìm kiếm
     * @param {*} dataCount -- Tổng số bản ghi muốn xuất
     * @param {*} pageNumber
     * @returns response
     */
    exportExcel: (keyword, dataCount, pageNumber) => {
        try {
            const outputFilename = MISA_RESOURCE.FILE_EXCEL_NAME;

            const headers = {
                "Content-Disposition": `attachment; filename=${outputFilename}`,
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            };
            const config = {
                method: "GET",
                url: URL,
                responseType: "arraybuffer",
                headers,
            };

            return axiosClient.get(
                `${baseUrl}/export?keyword=${keyword}&dataCount=${dataCount}&pageNumber=${pageNumber}`,
                config
            );
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm xóa nhiều nhân viên
     * @param {*} employeeIds -- danh sách ID nhân viên cần xóa
     * @returns response
     */
    deleteMultipleEmployees: (employeeIds) => {
        try {
            return axiosClient.delete(`${baseUrl}/deleteMultipleEmployee`, {
                data: employeeIds,
            });
        } catch (error) {
            console.log(error);
        }
    },
};

export default employeeApi;
