import { objectApi } from "../api/objectApi";
import diy from "../store/diy";

const { setObjects } = diy;

export const useObject = () => {
    try {
        const getObjects = async () => {
            try {
                const response = await objectApi.getObjects();
                const Options = response.map((object) => {
                    return {
                        optionId: object.ObjectId,
                        optionCode: object.ObjectCode,
                        optionName: object.ObjectName,
                        optionAddress: object.Address,
                        optionPhone: object.PhoneNumber,
                    };
                });
                setObjects(Options);
            } catch (error) {
                console.log(error);
            }
        };

        return {
            getObjects,
        };
    } catch (error) {
        console.log(error);
    }
};
