<script setup>
import { MISA_ENUM } from "../base/enum";
import { inject } from "vue";
import { usePayment } from "../composable/usePayment";
import { useRouter } from "vue-router";
import { handleSetStatusForm } from "../utilities/setDefaultStateForm";

const {
    setEntitySelected,
    setObjectSelected,
    setIdentityForm,
    setPaymentDetailsDefault,
    setPaymentDetail,
    setEditable,
} = inject("diy");

const { getNewRefNo } = usePayment();
const router = useRouter();

/**
 * Thực hiện hiển thị form chi tiết phiếu chi
 * Created by: NHGiang - (15/03/23)
 */
const handleShowPaymentDetail = async () => {
    try {
        setEntitySelected({});
        setObjectSelected({});
        await getNewRefNo();
        setIdentityForm(MISA_ENUM.FORM_MODE.ADD);
        handleSetStatusForm();
        router.push("/pay/pay-detail");
        setPaymentDetailsDefault();
        setPaymentDetail({
            PaymentId: "",
            ObjectId: "",
            ObjectCode: "",
            ObjectName: "",
            Amount: 0,
            DebitAccount: "",
            DebitAccountName: "",
            CreditAccount: "",
            CreditAccountName: "",
            Description: "",
        });
        setEditable(false);
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="wrapper-procedure">
        <div class="procedure">
            <div class="procedure-title">nghiệp vụ tiền mặt</div>
            <div class="procedure-content">
                <img src="https://actappg2.misacdn.net/img/qt_TienMat.1f64b87b.svg" alt="ảnh" />
                <router-link to="/cash/procedure" class="revice"> Thu tiền </router-link>
                <div class="payment" @click="handleShowPaymentDetail">Chi tiền</div>
                <router-link to="/cash/procedure" class="audit"> Kiểm kê quỹ </router-link>
            </div>
        </div>
        <router-link to="/account-system" class="account-system">
            <div class="account-system__icon"></div>
            Hệ thống tài khoản
        </router-link>
    </div>
</template>

<style scoped>
.wrapper-procedure {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
    height: calc(100% - 53px);
}

.procedure {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 688px;
    background: #fff;
    flex-direction: column;
}

.procedure-content {
    position: relative;
}

.procedure-title {
    text-transform: uppercase;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    border-bottom: 1px solid rgb(229, 229, 229);
    width: 100%;
}

.account-system {
    margin-top: 10px;
    background: #fff;
    width: 688px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 12px 0;
    text-decoration: none;
    color: #111;
}

.account-system__icon {
    background: url("../../src/assets/img/Sprites.svg") no-repeat -1378px -257px;
    width: 21px;
    height: 22px;
}

.revice {
    position: absolute;
    left: 92px;
    top: 40px;
    text-decoration: none;
    color: #111;
    width: 90px;
    padding-top: 60px;
    text-align: center;
    padding-bottom: 10px;
    transition: all 0.2s ease 0s;
}

.revice:hover {
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 25%) 0px 3px 6px;
}

.payment {
    position: absolute;
    left: 92px;
    bottom: 50px;
    text-decoration: none;
    color: #111;
    width: 90px;
    padding-top: 60px;
    text-align: center;
    padding-bottom: 10px;
    transition: all 0.2s ease 0s;
}

.payment:hover {
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 25%) 0px 3px 6px;
}

.audit {
    position: absolute;
    left: 352px;
    bottom: 140px;
    text-decoration: none;
    color: #111;
    width: 90px;
    padding-top: 60px;
    text-align: center;
    padding-bottom: 10px;
    transition: all 0.2s ease 0s;
}

.audit:hover {
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 25%) 0px 3px 6px;
}
</style>
