/**
 * Xử lý convert string sang định dạng Datetime (dd/mm/yyyy)
 * CreatedBy: NHGiang
 */
export const convertDatetime = (dateString, isJson) => {
    try {
        if (dateString) {
            const date = dateString.split("/")[0];
            const month = dateString.split("/")[1];
            const year = dateString.split("/")[2];
            const newDateString = `${year}/${month}/${date}`;

            const dtFormat = new Intl.DateTimeFormat("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });

            const newDateTime = new Date(newDateString);
            if (isJson) {
                newDateTime.setHours(newDateTime.getHours() + 24);
            }

            return dtFormat.format(newDateTime);
        }
    } catch (error) {
        console.log(error);
    }
};
