import axiosClient from "./axiosClient";

const baseUrl = "PaymentDetails";

const paymentDetailApi = {
    /**
     * Hàm thêm nhiều phiếu chi chi tiết
     * @param {*} paymentDetails -- danh sách phiếu chi chi tiết
     * @returns
     * Created by: NHGiang - (21/03/23)
     */
    insertPaymentDetails: (paymentDetails) => {
        try {
            return axiosClient.post(`${baseUrl}/insertPaymentDetails`, paymentDetails);
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm lấy ra danh sách chi tiết phiếu chi theo ID của phiếu chi
     * @param {*} paymentId
     * @returns
     * Created by : NHGiang - (23/03/23)
     */
    getPaymentDetailsByPaymentId: (paymentId, pageSize, pageNumber) => {
        try {
            return axiosClient.get(`${baseUrl}/paymentId`, {
                params: {
                    paymentId: paymentId,
                    pageSize: pageSize,
                    pageNumber: pageNumber,
                },
            });
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm sửa chi tiết phiếu chi theo ID của phiếu chi
     * @param {*} paymentId
     * @param {*} paymentDetails
     * @returns
     */
    editPaymentDetailsByPaymentId: (paymentDetails) => {
        try {
            return axiosClient.put(`${baseUrl}/updatePaymentDetails`, paymentDetails);
        } catch (error) {
            console.log(error);
        }
    },
};

export default paymentDetailApi;
