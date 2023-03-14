import axiosClient from "./axiosClient";

const baseUrl = "MObjects";

export const objectApi = {
    getObjects: () => {
        try {
            return axiosClient.get(`${baseUrl}`);
        } catch (error) {
            console.log(error);
        }
    },
};
