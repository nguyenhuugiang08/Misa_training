import paymentApi from "../api/paymentApi";
import diy from "../store/diy";
import { MISA_RESOURCE } from "../base/resource";

const {
    setPayments,
    setTotalPage,
    setTotalEntities,
    setIsLoading,
    setKeyword,
    setListItemChecked,
    setListToast,
    setEntitySelected,
    setlistAllEntities,
    setNewRefNo,
} = diy;

export const usePayment = () => {
    try {
        /**
         * Hàm lấy danh sách phiếu chi
         * Created By: NHGiang - (14/03/23)
         */
        const getPayments = async () => {
            try {
                const response = await paymentApi.getPayments();
                setlistAllEntities(response);
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm lấy danh sách phiếu chi theo bộ lọc và phân trang
         * @param {*} keyword -- từ khóa tìm kiếm
         * @param {*} pageSize -- Số lượng bản ghi trên 1 trang
         * @param {*} pageNumber -- trang thứ bao nhiêu
         * @returns
         */
        const getPaymentsByFilter = async (keyword, pageSize = 20, pageNumber = 1) => {
            try {
                setKeyword(keyword);
                setIsLoading();
                setTimeout(async () => {
                    const response = await paymentApi.getPaymentsByFilter(
                        keyword,
                        pageSize,
                        pageNumber
                    );

                    const { Data, TotalRecord, TotalPage } = response;

                    setPayments(Data);
                    setTotalEntities(TotalRecord);
                    setTotalPage(TotalPage);
                    setIsLoading();
                }, 500);
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
                const outputFilename = MISA_RESOURCE.FILE_EXCEL_PAYMENT_NAME;

                setIsLoading();
                const response = await paymentApi.exportExcel(keyword, dataCount, pageNumber);

                // Thực hiện tạo 1 thẻ a để thực hiện tải file khi xuất xong
                const url = URL.createObjectURL(new Blob([response]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", outputFilename);
                document.body.appendChild(link);
                link.click();
                setIsLoading();
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm gọi API và thực hiện xóa nhiều nhân viên được chọn
         * @param {*} paymentIds -- Danh sách ID của các nhân viên muốn xóa
         * Created by: NHGiang - (20/02/23)
         */
        const handleBulkDelete = async (paymentIds) => {
            try {
                await paymentApi.deleteMultiplePayments(paymentIds);

                const toastMessage = {
                    toastMessage: MISA_RESOURCE.TOAST.DELETE_MULTIPLE_SUCCESS.TOAST_MESSAGE,
                    statusMessage: MISA_RESOURCE.TOAST.DELETE_MULTIPLE_SUCCESS.STATUS_MESSAGE,
                    status: MISA_RESOURCE.TOAST.DELETE_MULTIPLE_SUCCESS.STATUS,
                };
                setListToast(toastMessage);
                setListItemChecked([]);
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm lấy thông tin phiếu chi theo ID
         * @param {*} paymentId -- ID của phiếu chi
         * Created by: NHGiang - (16/03/23)
         */
        const getPaymentById = async (paymentId) => {
            try {
                const response = await paymentApi.getPaymentById(paymentId);
                setEntitySelected(response);
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm thêm phiếu chi
         * @param {*} payment -- thông tin phiếu chi
         * @returns
         */
        const addPayment = async (payment) => {
            try {
                const paymentId = await paymentApi.addPayment(payment);
                const toastMessage = {
                    toastMessage: MISA_RESOURCE.TOAST.ADD_PAYMENT_SUCCESS.TOAST_MESSAGE,
                    statusMessage: MISA_RESOURCE.TOAST.ADD_PAYMENT_SUCCESS.STATUS_MESSAGE,
                    status: MISA_RESOURCE.TOAST.ADD_PAYMENT_SUCCESS.STATUS,
                };
                setListToast(toastMessage);
                return paymentId;
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm xóa phiếu chi theo ID
         * @param {*} paymentId
         * @returns
         * Created by: NHGiang - (18/03/23)
         */
        const deletePaymentById = async (paymentId) => {
            try {
                await paymentApi.deletePaymentById(paymentId);
                const toastMessage = {
                    toastMessage: MISA_RESOURCE.TOAST.DELETE_PAYMENT_SUCCESS.TOAST_MESSAGE,
                    statusMessage: MISA_RESOURCE.TOAST.DELETE_PAYMENT_SUCCESS.STATUS_MESSAGE,
                    status: MISA_RESOURCE.TOAST.DELETE_PAYMENT_SUCCESS.STATUS,
                };
                setListToast(toastMessage);
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm lấy ra Số phiếu chi mới
         * Created by: NHGiang - (20/03/23)
         * @returns
         */
        const getNewRefNo = async () => {
            try {
                const newRefNo = await paymentApi.getNewRefNo();
                setNewRefNo(newRefNo);
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm sửa phiếu chi
         * @param {*} payment -- thông tin phiếu chi
         * @returns
         * Created by: NHGiang - (20/03/23)
         */
        const editPayement = async (payment, paymentId) => {
            try {
                await paymentApi.editPayement(payment, paymentId);
            } catch (error) {
                console.log(error);
            }
        };

        return {
            getPayments,
            getPaymentsByFilter,
            handlExportExcel,
            handleBulkDelete,
            getPaymentById,
            addPayment,
            deletePaymentById,
            getNewRefNo,
            editPayement,
        };
    } catch (error) {
        console.log(error);
    }
};
