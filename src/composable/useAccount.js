import { MISA_RESOURCE } from "../base/resource";
import { ref } from "vue";
import accountApi from "../api/accountApi";
import diy from "../store/diy";

const {
    state,
    setEntities,
    setTotalPage,
    setTotalEntities,
    setIsLoading,
    setKeyword,
    setlistAllEntities,
    setEntitySelected,
    setIsForm,
} = diy;

export const useAccount = () => {
    try {
        const accounts = ref([]);
        const totalPage = ref(1);
        const totalRecord = ref(0);

        /**
         * Hàm lấy danh sách tài khoản theo bộ lọc và phân trang
         * @param {*} keyword -- từ khóa tìm kiếm
         * @param {*} pageSize -- Số lượng bản ghi trên 1 trang
         * @param {*} pageNumber -- trang thứ bao nhiêu
         * @returns
         */
        const getAccountsByFilter = async (keyword, pageSize = 20, pageNumber = 1) => {
            try {
                setKeyword(keyword);
                setIsLoading();
                setTimeout(async () => {
                    const response = await accountApi.getAccountsByFilter(
                        keyword,
                        pageSize,
                        pageNumber
                    );

                    const res = await accountApi.getChildrens();
                    const { Data, TotalRecord, TotalPage } = response;
                    accounts.value = [...Data];

                    // lấy ra danh sách các AccountId
                    let accountIds = accounts.value.map((account) => account.AccountId);
                    // Lấy ra số tài khoản cha được tìm thấy tương ứng với các tài khoản cha
                    let countRecords = 0;

                    // Xử lý lấy ra những tài khoản con
                    res.forEach((child) => {
                        try {
                            if (accountIds.includes(child.ParentId)) {
                                accounts.value.push(child);
                                accountIds = accounts.value.map((account) => account.AccountId);
                                countRecords++;
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    });

                    // Xử lý dữ liệu tài khoản
                    accounts.value.forEach((element) => {
                        if (element.Grade === 1) element.ParentId = 0;

                        // xử lý trường tính chất
                        const indexType = MISA_RESOURCE.ACCOUNT_NATURE.findIndex(
                            (type) => type.optionId === element.Type
                        );
                        element.Type = MISA_RESOURCE.ACCOUNT_NATURE[indexType].optionName;
                    });
                    totalRecord.value = countRecords
                        ? TotalRecord + countRecords
                        : state.listAllEntities.length;
                    totalPage.value = TotalPage;
                    setEntities(accounts);
                    setTotalPage(totalPage);
                    setTotalEntities(totalRecord);
                    setIsLoading();
                }, 500);
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm lấy ra danh sách tài khoản
         * Created by: NHGiang - (12/03/23)
         */
        const getAccounts = async () => {
            try {
                const response = await accountApi.getAccounts();

                const Options = response.map((account) => {
                    return {
                        optionId: account.AccountId,
                        optionName: account.AccountNumber,
                        optionDes: account.AccountName,
                        optionGrade: account.Grade,
                    };
                });
                setlistAllEntities(Options);
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm thêm 1 tài khoản mới
         * @param {*} account -- thông tin tài khoản
         * Created by: NHGiang - (12/03/23)
         */
        const addAccount = async (account) => {
            try {
                await accountApi.addAccount(account);
                setIsForm();
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm lấy thông tin tài khoản theo ID
         * @param {*} accountId -- ID của tài khoản
         * Created by: NHGiang - (12/03/23)
         */
        const getAccountById = async (accountId) => {
            try {
                const response = await accountApi.getAccountById(accountId);
                setEntitySelected(response);
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm sửa thông tin tài khoản theo ID
         * @param {*} account -- thông tin tài khoản
         * @param {*} accountId -- ID của tài khoản
         * @returns
         */
        const editAccount = async (account, accountId) => {
            try {
                await accountApi.editAccount(account, accountId);
                setIsForm();
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm xóa 1 tài khoản
         * @param {*} accountId -- ID của tài khoản cần xóa
         * @param {*} parentId -- ID của tài khoản cha
         * @returns
         */
        const deleteAccountChild = async (accountId, parentId) => {
            try {
                await accountApi.deleteAccountChild(accountId, parentId);
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm xóa 1 tài khoản
         * @param {*} accountId -- ID của tài khoản cần xóa
         * @returns
         */
        const deleteAccount = async (accountId) => {
            try {
                await accountApi.deleteAccount(accountId);
            } catch (error) {
                console.log(error);
            }
        };

        /**
         * Hàm cập nhật trạng thái tài khoản
         * @param {*} accountIds -- Danh sách ID của tài khoản
         * @returns
         */
        const updateIsActiveAccount = async (accountIds, isActive) => {
            try {
                await accountApi.updateIsActiveAccount(accountIds, isActive);
            } catch (error) {
                console.log(error);
            }
        };

        return {
            accounts,
            totalRecord,
            totalPage,
            getAccountsByFilter,
            getAccounts,
            addAccount,
            getAccountById,
            editAccount,
            deleteAccountChild,
            deleteAccount,
            updateIsActiveAccount,
        };
    } catch (error) {
        console.log(error);
    }
};
