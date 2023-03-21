import paymentDetailApi from "../api/paymentDetailApi";

export const usePaymentDeatil = () => {
    try {
        /**
         * Hàm thêm nhiều phiếu chi chi tiết
         * @param {*} paymentDetails -- danh sách phiếu chi chi tiết
         * @returns
         * Created by: NHGiang - (21/03/23)
         */
        const insertPaymentDetails = async (paymentDetails) => {
            try {
                await paymentDetailApi.insertPaymentDetails(paymentDetails);
            } catch (error) {
                console.log(error);
            }
        };

        return {
            insertPaymentDetails,
        };
    } catch (error) {
        console.log(error);
    }
};
