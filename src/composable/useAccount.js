import { ref } from "vue";
import accountApi from "../api/accountApi";
import diy from "../store/diy";

const { state, setEntities, setTotalPage, setTotalEntities } = diy;

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

                // Xử lý lấy ra những tài khoản con
                res.forEach((child) => {
                    try {
                        if (accountIds.includes(child.ParentId)) {
                            accounts.value.push(child);
                            accountIds = accounts.value.map((account) => account.AccountId);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });

                // Xử lý dữ liệu tài khoản 
                accounts.value.forEach((element) => {
                    if (element.Grade === 1) element.ParentId = 0;
                    if (element.IsActive) element.IsActive = "Đang sử dụng";
                    else element.IsActive = "Ngừng sử dụng";
                });
                totalRecord.value = TotalRecord;
                totalPage.value = TotalPage;

                setEntities(accounts);
                setTotalPage(totalPage);
                setTotalEntities(totalRecord);
            } catch (error) {
                console.log(error);
            }
        };

        return {
            accounts,
            totalRecord,
            totalPage,
            getAccountsByFilter,
        };
    } catch (error) {
        console.log(error);
    }
};
