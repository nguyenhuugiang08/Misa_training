import axios from "axios";
import { MISA_RESOURCE } from "../base/resource";
import queryString from "query-string";
import { handleSetStatusForm } from "../utilities/setDefaultStateForm";
import { error as validateError } from "../utilities/validateForm";
import diy from "../store/diy";
import { MISA_ENUM } from "../base/enum";

const { setListToast } = diy;

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_MISA_API,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
    paramsSerializer: {
        encode: queryString.parse,
        serialize: (params) => queryString.stringify(params),
    },
});

axiosClient.interceptors.request.use(async (config) => {
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        // Handle errors
        const { status, data } = error.response;

        /**
         * Xử lý lỗi API với mã lỗi 400
         * Created by: NHGiang - (26/02/23)
         */
        if (status === MISA_ENUM.STATUS_CODE.BAD_REQUEST) {
            const { MoreInfo } = data;
            const keysValidateError = Object.keys(validateError);
            handleSetStatusForm(); // xét lại trạng thái chưa có lỗi ban đầu

            if (MoreInfo) {
                const keysMoreInfo = Object.keys(MoreInfo);
                if (keysMoreInfo.length > 0) validateError.status = true;
                keysValidateError.forEach((keyValidate) => {
                    if (keysMoreInfo.includes(keyValidate)) {
                        validateError[`${keyValidate}`].textError = MoreInfo[`${keyValidate}`];
                        validateError[`${keyValidate}`].status = true;
                    }
                });
            }
        }

        /**
         * Xử lý lỗi API với mã lỗi 500
         * Created by: NHGiang - (26/02/23)
         */
        if (status === MISA_ENUM.STATUS_CODE.INTERNAL_SERVER_ERROR) {
            const errorMessage = {
                toastMessage: MISA_RESOURCE.TOAST.SERVER_ERROR.TOAST_MESSAGE,
                statusMessage: MISA_RESOURCE.TOAST.SERVER_ERROR.STATUS_MESSAGE,
                status: MISA_RESOURCE.TOAST.SERVER_ERROR.STATUS,
            };

            setListToast(errorMessage);
        }
        throw error;
    }
);

export default axiosClient;
