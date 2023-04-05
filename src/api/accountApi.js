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

    /**
     * Hàm thêm 1 tài khoản mới
     * @param {*} account -- thông tin tài khoản
     * @returns
     */
    addAccount: (account) => {
        try {
            return axiosClient.post(`${baseUrl}`, account);
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm sửa thông tin tài khoản theo ID
     * @param {*} account -- thông tin tài khoản
     * @param {*} accountId -- ID của tài khoản
     * @returns
     */
    editAccount: (account, accountId) => {
        try {
            return axiosClient.put(`${baseUrl}/${accountId}`, account);
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm xóa 1 tài khoản con
     * @param {*} accountId -- ID của tài khoản cần xóa
     * @param {*} parentId -- ID của tài khoản cha
     * @returns
     */
    deleteAccountChild: (accountId, parentId) => {
        try {
            return axiosClient.delete(`${baseUrl}/child`, {
                params: {
                    id: accountId,
                    parentId: parentId,
                },
            }); 
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm xóa 1 tài khoản
     * @param {*} accountId -- ID của tài khoản cần xóa
     * @returns
     */
    deleteAccount: (accountId) => {
        try {
            return axiosClient.delete(`${baseUrl}/${accountId}`);
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm cập nhật trạng thái tài khoản
     * @param {*} accountIds -- Danh sách ID của tài khoản
     * @returns
     */
    updateIsActiveAccount: (accountIds, isActive) => {
        try {
            return axiosClient.put(`${baseUrl}/active?isActive=${isActive}`, accountIds);
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Hàm lấy danh sách tài khoản có bậc lớn hơn 1 theo bộ lọc và phân trang
     * @param {*} keyword
     * @param {*} pageSize
     * @param {*} pageNumber
     * @returns
     */
    getAccountsGradeGreaterThanOne: (keyword) => {
        try {
            return axiosClient.get(`${baseUrl}/greaterThanOne`, {
                params: {
                    entityFilter: keyword,
                },
            });
        } catch (error) {
            console.log(error);
        }
    },
};

export default accountApi;
