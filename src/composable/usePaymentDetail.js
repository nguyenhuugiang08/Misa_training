import paymentDetailApi from "../api/paymentDetailApi";
import diy from "../store/diy";
import { ref } from "vue";

const {
    setPaymentDetails,
    setTotalPagePaymentDetail,
    setTotalRecordPaymentDetail,
    setPaymentIdFilter,
} = diy;

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

        /**
         * Hàm lấy ra danh sách chi tiết phiếu chi theo ID của phiếu chi
         * @param {*} paymentId
         * @returns
         * Created by : NHGiang - (23/03/23)
         */
        const getPaymentDetailsByPaymentId = async (paymentId, pageSize = 20, pageNumber = 1) => {
            try {
                setPaymentIdFilter(paymentId);
                const response = await paymentDetailApi.getPaymentDetailsByPaymentId(
                    paymentId,
                    pageSize,
                    pageNumber
                );

                const { Data, TotalPage, TotalRecord } = response;

                setPaymentDetails(Data);
                setTotalPagePaymentDetail(TotalPage);
                setTotalRecordPaymentDetail(TotalRecord);
            } catch (error) {
                console.log(error);
            }
        };

        return {
            insertPaymentDetails,
            getPaymentDetailsByPaymentId,
        };
    } catch (error) {
        console.log(error);
    }
};
