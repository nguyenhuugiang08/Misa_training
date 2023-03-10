/**
 * Xử lý format tiền
 * CreatedBy: NHGiang - (30/12/2022)
 */
export const formatMoney = (money) => {
    try {
        if (!money) {
            return "0";
        }
        money = new Intl.NumberFormat("vi-VI").format(
            money
        );
        return money;
    } catch (error) {
        return "";
    }
};
