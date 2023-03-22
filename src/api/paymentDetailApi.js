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

    getPaymentDetailsByPaymentId: (paymentId) => {
        try {
        return axiosClient.get(`${baseUrl}/paymentId`)
        } catch (error) {
          console.log(error);
        }
    }
};

export default paymentDetailApi;
