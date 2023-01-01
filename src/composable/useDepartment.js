import { ref } from "vue";

/**
 * Xử lý dữ liệu liên quan đến department
 * CreatedBy:  NHGiang - (30/12/2022)
 */
export const useDepartment = () => {
    try {
        const listDepartments = ref([]);

        // láy danh sách các departments
        const getAllDepartments = async () => {
            const response = await fetch(`${import.meta.env.VITE_MISA_DEPARTMENT_API}`);
            const data = await response.json();
            listDepartments.value = [
                ...data?.map((department) => {
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
