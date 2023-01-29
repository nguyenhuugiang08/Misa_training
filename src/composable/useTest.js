import axios from "axios";
import { ref } from "vue";

export const useTest = () => {
    try {
        const listDepartments = ref([]);

        const getDepartments = async () => {
            try {
                const response = await axios.get(
                    "https://localhost:7057/api/Employees?limit=10&offset=0"
                );
                listDepartments.value = [...response.data.Data];
            } catch (error) {
                console.log(error);
            }
        };

        return {
            listDepartments,
            getDepartments,
        };
    } catch (error) {
        console.log(error);
    }
};
