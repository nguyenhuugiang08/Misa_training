/**
 * Xử lý format ngày tháng
 * CreatedBy: NHGiang - (30/12/2022)
 */

export const formatDate = (dateTime) => {
    try {
        if (dateTime) {
            dateTime = new Date(dateTime);
            let date = dateTime.getDate();
            let month = dateTime.getMonth() + 1;
            let year = dateTime.getFullYear();

            date = date < 10 ? `0${date}` : date;
            month = month < 10 ? `0${month}` : month;

            return `${date}/${month}/${year}`;
        } else {
            return "";
        }
    } catch (error) {
        return "";
    }
};
