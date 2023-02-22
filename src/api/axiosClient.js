import axios from "axios";
import queryString from "query-string";
import { handleSetStatusForm } from "../utilities/setDefaultStateForm";
import { error as validateError } from "../utilities/validateForm";

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
         */
        if (status === 400) {
            const { MoreInfo } = data;
            const keysValidateError = Object.keys(validateError);
            handleSetStatusForm();

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
         */
        if(status === 500) {

        }
        throw error;
    }
);

export default axiosClient;
