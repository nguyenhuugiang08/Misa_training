import { ref } from "vue";
import axios from "axios";

/**
 * Xử lý dữ liệu liên quan đến position
 * CreatedBy: NHGiang
 */
export const usePosition = () => {
    try {
        const listPositions = ref([]);

        const getAllPositions = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_MISA_POSITION_API}`);
                listPositions.value = [...response.data];
            } catch (error) {
                console.log(error);
            }
        };

        return {
            listPositions,
            getAllPositions,
        };
    } catch (error) {
        console.log(error);
    }
};
