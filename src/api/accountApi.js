import axiosClient from "./axiosClient";

const baseUrl = "Accounts";

const accountApi = {
    /**
     * Hàm lấy danh sách tài khoản
     * @returns
     */
    getAccounts: () => {
        try {
            return axiosClient.get(`${baseUrl}`);
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm lấy thông tin tài khoản theo ID
     * @param {*} accountId -- ID của tài khoản
     * @returns
     */
    getAccountById: (accountId) => {
        try {
            return axiosClient.get(`${baseUrl}/${accountId}`);
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm lấy danh sách tài khoản con theo ID của tài khoản cha
     * @param {*} parentId -- ID của tài khoản cha
     * @returns
     */
    getChildrens: () => {
        try {
            return axiosClient.get(`${baseUrl}/Childrens`);
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm lấy danh sách tài khoản theo bộ lọc và phân trang
     * @param {*} keyword -- từ khóa tìm kiếm
     * @param {*} pageSize -- Số lượng bản ghi trên 1 trang
     * @param {*} pageNumber -- trang thứ bao nhiêu
     * @returns 
     */
    getAccountsByFilter: (keyword, pageSize, pageNumber) => {
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
};

export default accountApi;
