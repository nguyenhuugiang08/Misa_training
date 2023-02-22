import axiosClient from "./axiosClient";

const baseUrl = "Departments";

/**
 * Các API liên quan đến department
 * Created by: NHGiang - (22/02/23)
 */
const departmentApi = {
    /**
     * Hàm lấy danh sách phòng ban
     * Created by: NHGiang - (22/02/23)
     */
    getAllDepartment: () => {
        try {
            return axiosClient.get(baseUrl);
        } catch (error) {
            console.log(error);
        }
    },
};

export default departmentApi;
