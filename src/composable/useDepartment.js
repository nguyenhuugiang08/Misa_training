import { ref } from "vue";
import departmentApi from "../api/departmentApi";

/**
 * Hàm xử lý logic liên quan đến department
 * @param {Number} pageSize
 * @param {Number} pageNumber
 * @returns Object chứa các hàm, Giá trị
 */
export const useDepartment = (pageSize = 20, pageNumber = 1) => {
    try {
        // danh sách các phòng ban (lấy ra mã và tên phòng ban)
        const listDepartments = ref([]);

        /**
         * Hàm xử lý gọi API lấy ra danh sách các phòng ban
         * Created by : NHGiang - (20/02/23)
         */
        const getAllDepartments = async () => {
            const response = await departmentApi.getAllDepartment();

            listDepartments.value = [
                ...response?.map((department) => {
                    return {
                        optionId: department.DepartmentId,
                        optionName: department.DepartmentName,
                    };
                }),
            ];
        };
        return {
            listDepartments,
            getAllDepartments,
        };
    } catch (error) {
        console.log(error);
    }
};
