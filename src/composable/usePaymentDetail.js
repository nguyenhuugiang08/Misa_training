import { MISA_RESOURCE } from "../base/resource";
import paymentDetailApi from "../api/paymentDetailApi";
import diy from "../store/diy";

const {
    setPaymentDetails,
    setTotalPagePaymentDetail,
    setTotalRecordPaymentDetail,
    setPaymentIdFilter,
    setListToast,
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
                const ids = await paymentDetailApi.insertPaymentDetails(paymentDetails);
                const toastMessage = {
                    toastMessage: MISA_RESOURCE.TOAST.ADD_PAYMENT_SUCCESS.TOAST_MESSAGE,
                    statusMessage: MISA_RESOURCE.TOAST.ADD_PAYMENT_SUCCESS.STATUS_MESSAGE,
                    status: MISA_RESOURCE.TOAST.ADD_PAYMENT_SUCCESS.STATUS,
                };
                setListToast(toastMessage);
                return ids;
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

        /**
         * Hàm sửa chi tiết phiếu chi theo ID của phiếu chi
         * @param {*} paymentId
         * @param {*} paymentDetails
         * @returns
         */
        const editPaymentDetailsByPaymentId = async (paymentDetails) => {
            try {
                await paymentDetailApi.editPaymentDetailsByPaymentId(paymentDetails);
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm lấy danh sách phiếu chi chi tiết theo ID của tài khoản
         * @param {*} accountId -- ID của tài khoản
         * @returns
         */
        const getPaymentDetailsByAccountId = async (accountId) => {
            try {
                const paymentDetails = await paymentDetailApi.getPaymentDetailsByAccountId(
                    accountId
                );
                return paymentDetails;
            } catch (error) {
                console.log(error);
            }
        };

        return {
            insertPaymentDetails,
            getPaymentDetailsByPaymentId,
            editPaymentDetailsByPaymentId,
            getPaymentDetailsByAccountId,
        };
    } catch (error) {
        console.log(error);
    }
};
