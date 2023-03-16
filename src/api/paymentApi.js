import axiosClient from "./axiosClient";
import { MISA_RESOURCE } from "../base/resource";

const baseUrl = "Payments";

const paymentApi = {
    /**
     * Hàm lấy danh sách phiếu chi
     * Created by: NHGiang - (14/03/23)
     * @returns
     */
    getPayments: () => {
        try {
            return axiosClient.get(`${baseUrl}`);
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm lấy danh sách phiếu chi theo bộ lọc và phân trang
     * @param {*} keyword -- từ khóa tìm kiếm
     * @param {*} pageSize -- Số lượng bản ghi trên 1 trang
     * @param {*} pageNumber -- trang thứ bao nhiêu
     * @returns
     */
    getPaymentsByFilter: (keyword, pageSize, pageNumber) => {
        try {
            return axiosClient.get(`${baseUrl}/Filter`, {
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
     * Hàm xuất danh sách nhân viên ra Excel
     * @param {*} keyword -- Từ khóa tìm kiếm
     * @param {*} dataCount -- Tổng số bản ghi muốn xuất
     * @param {*} pageNumber
     * @returns response
     */
    exportExcel: (keyword, dataCount, pageNumber) => {
        try {
            const outputFilename = MISA_RESOURCE.FILE_EXCEL_PAYMENT_NAME;

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
     * @param {*} paymentIds -- danh sách ID phiếu chi cần xóa
     * @returns response
     */
    deleteMultiplePayments: (paymentIds) => {
        try {
            return axiosClient.delete(`${baseUrl}/deleteMultiple`, {
                data: paymentIds,
            });
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm lấy thông tin phiếu chi theo ID
     * @param {*} paymentId -- ID của phiếu chi
     * Created by: NHGiang - (16/03/23)
     */
    getPaymentById: (paymentId) => {
        try {
            return axiosClient.get(`${baseUrl}/${paymentId}`);
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm thêm phiếu chi
     * @param {*} payment -- thông tin phiếu chi
     * @returns 
     */
    addPayment: (payment) => {
        try {
            return axiosClient.post(`${baseUrl}`, payment);
        } catch (error) {
            console.log(error);
        }
    },
};

export default paymentApi;
