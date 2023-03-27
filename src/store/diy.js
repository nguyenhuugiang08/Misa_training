import { MISA_RESOURCE } from "../base/resource";
import { reactive, readonly } from "vue";
import { MISA_ENUM } from "../base/enum";

const state = reactive({
    isSidebar: false, // Trạng thái Đóng/Mở sidebar
    Entities: [], // Danh sách đối tượng
    titleForm: "", // Tiêu đề form
    isForm: false, // trạng thái Đóng/ Mở form
    entitySelected: {}, // Thông tin đối tượng đang được chọn
    totalEntities: 0, // Tổng số bản ghi
    totalPageValue: 1, // Tổng số trang
    identityForm: MISA_ENUM.FORM_MODE.ADD, // Định danh form - mặc định là form thêm
    listAllEntities: [], // Danh sách tất cả đối tượng
    listToast: [], // Danh sách toast message
    listItemChecked: [], // Danh sách các item được chọn
    listPageChecked: [], // Danh sách các page đã được check all
    keyword: "", // Từ khóa tìm kiếm
    isLoading: false, // Trạng thái Ẩn hiện loading
    objects: [], // Danh sách đối tượng lấy từ BE
    employees: [], // Danh sách nhân viên lấy từ BE
    payments: [], // Danh sách phiếu chi
    parentId: MISA_RESOURCE.GUID_EMPTY, // lấy ra id của tài khoản khi click 1 dòng trên bảng
    objectSelected: {},
    newRefNo: "", // Số phiếu chi mới lấy từ BE
    paymentDetails: [
        {
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
        },
    ], // Mảng các chi tiết phiếu chi trên UI detail
    paymentDetail: {
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
    }, // Object cập nhật thông tin của chi tiết phiếu chi khi đang được sửa
    gradeAccountSelected: MISA_ENUM.GRADE_DEFAULT, // Bậc của tài khoản được chọn khi click chọn 2 dòng trên bảng tài khoản
    totalPayment: 0, // tổng tiền của phiếu chi
    indexRowEditable: 0, // index của dòng đang được chọn để edit trên UI detail
    indexTabRouter: 0, // index của tab router
    sidebarSelected: 0, // Page được chọn khi click chọn 1 tab trên sidebar
    rowPaymentSelected: 0, // index của dòng đang được chọn trên UI Master payment
    totalPagePaymentDetail: 0, // tổng số trang phiếu chi chi tiết UI Detail
    totalRecordPaymentDetail: 0, // tổng số trang phiếu chi chi tiết UI Detail
    paymentIdFilter: "", // ID của phiếu chi dùng để lấy danh sách các chi tiết phiếu chi
    listAllAccounts: [], // danh sách tất cả các tài khoản
    // trạng thái disable của các trường nhập dữ liệu UI payment form
    disableFiled: {
        objectCode: false,
        objectName: false,
        address: false,
        attachment: false,
        employeeId: false,
        postedDate: false,
        reason: false,
        reasonType: false,
        receiver: false,
        refDate: false,
        refNo: false,
    },
    // trạng thái disable của các trường nhập dữ liệu trên Row detail
    disableFiledRow: {
        objectCode: false,
        description: false,
        amount: false,
        debitAccount: false,
        creditAccount: false,
    },
    isClickRow: false, // trạng thái có thể click dòng UI detail hay không
    isEditButton: false, // trạng thái của nút submit UI payment form (cất hoặc sửa)
    editable: false,
});

/**
 * Set trạng thái Đóng/Mở sidebar
 * Created by: NHGiang - (17/02/23)
 */
const setIsSidebar = () => {
    try {
        state.isSidebar = !state.isSidebar;
        const root = document.querySelector(":root");

        // set lại độ rộng cho sidebar
        if (state.isSidebar) {
            root.style.setProperty("--width-sidebar", "52px");
        } else {
            root.style.setProperty("--width-sidebar", "178px");
        }
    } catch (error) {
        console.log(error);
    }
};

/** ------------------------------------------------
 * Set lại danh sách đối tượng
 * @param {*} list -- Danh sách đối tượng
 * Created By: NHGiang - (17/02/23)
 */
const setEntities = (list) => {
    try {
        state.Entities = list;
    } catch (error) {
        console.log(error);
    }
};

/** ----------------------------------------------
 * Set tiêu đề cho form
 * @param {*} title -- Tiêu đề của Form
 * Created by: NHGiang - (17/02/23)
 */
const setTitleForm = (title) => {
    try {
        state.titleForm = title;
    } catch (error) {
        console.log(error);
    }
};

/** -----------------------------------------------
 * set giá trị để đóng/ mở form
 * Created by: NHGiang - (17/02/23)
 */
const setIsForm = () => {
    try {
        state.isForm = !state.isForm;
    } catch (error) {
        console.log(error);
    }
};

/** ------------------------------------------------
 * lấy ra đối tượng được chọn để update thông tin
 * @param {*} entity -- Đối tượng Employee đã chọn
 * Created by: NHGiang - (17/02/23)
 */
const setEntitySelected = (entity) => {
    try {
        state.entitySelected = entity;
    } catch (error) {
        console.log(error);
    }
};

/** ------------------------------------------------
 * lấy ra tổng số bản ghi trong database
 * @param {*} total -- Tổng số bản ghi
 * Created by: NHGiang - (17/02/23)
 */
const setTotalEntities = (total) => {
    try {
        state.totalEntities = total;
    } catch (error) {
        console.log(error);
    }
};

/** ------------------------------------------------
 * Lấy ra tổng số trang theo số bản ghi trên 1 trang
 * @param {*} total -- Số bản ghi trên 1 trang
 * Created by: NHGiang - (17/02/23)
 */
const setTotalPage = (total) => {
    try {
        state.totalPageValue = total;
    } catch (error) {
        console.log(error);
    }
};

// định nghĩa form theo action (0: thêm, 1: sửa)
/** ------------------------------------------------
 * Lấy ra tổng số trang theo số bản ghi trên 1 trang
 * @param {*} val
 * Created by: NHGiang - (17/02/23)
 */
const setIdentityForm = (val) => {
    try {
        state.identityForm = val;
    } catch (error) {
        console.log(error);
    }
};

//Lây ra danh sách đối tượng đã tồn tại
const setlistAllEntities = (list) => {
    try {
        state.listAllEntities = list;
    } catch (error) {
        console.log(error);
    }
};

// thêm toast message vào danh sách
const setListToast = (toast) => {
    try {
        state.listToast.push(toast);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm xóa toast message khỏi mảng sau khi bị ẩn khỏi giao diện
 * Created by: NHGiang - (23/02/23)
 */
const deleteToastHidden = () => {
    try {
        state.listToast.pop();
    } catch (error) {
        console.log(error);
    }
};

// Lấy ra danh sách các item được check
const setListItemChecked = (list) => {
    try {
        state.listItemChecked = list;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Đặt lại từ khóa tìm khi nhập ô tìm kiếm
 * @param {*} searchString Từ khóa tìm kiếm
 * Craeted by: NHGiang - (19/02/23)
 */
const setKeyword = (searchString) => {
    try {
        state.keyword = searchString;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lưu lại các trang đã được check all
 * @param {*} list -- danh sách các trang đã check all
 * Created by: NHGiang - (22/02/23)
 */
const setListPageChecked = (list) => {
    try {
        state.listPageChecked = list;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm set trạng lại loading
 * Created By: NHGiang - (12/02/23)
 */
const setIsLoading = () => {
    try {
        state.isLoading = !state.isLoading;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Lấy ra danh sách đối tượng
 * @param {*} objects
 */
const setObjects = (objects) => {
    try {
        state.objects = [...objects];
    } catch (error) {
        console.log(error);
    }
};

/**
 * Lấy ra danh sách nhân viên
 * @param {*} objects
 */
const setEmployees = (objects) => {
    try {
        state.employees = [...objects];
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lấy danh sách phiếu chi
 * @param {*} payments
 */
const setPayments = (payments) => {
    try {
        state.payments = [...payments];
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lấy ra tài khoản tổng hợp khi click vào 1 dòng trene bảng hệ thống tài khoản
 * @param {} parentId
 * Created by: NHGiang - (17/03/23)
 */
const setParentId = (parentId) => {
    try {
        state.parentId = parentId;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lấy ra đối tượng
 * @param {*} obj
 */
const setObjectSelected = (obj) => {
    try {
        state.objectSelected = { ...obj };
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lấy ra số phiếu chi mới
 * Created by: NHGiang - (20/03/23)
 * @param {} newRefNo
 */
const setNewRefNo = (newRefNo) => {
    try {
        state.newRefNo = newRefNo;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm gán lại item mảng paymentDetails
 * @param {*} paymentDetail
 * @param {*} index
 * Created by: NHGiang - (21/03/23)
 */
const setPaymentDetailsDefault = () => {
    try {
        state.paymentDetails = [
            {
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
            },
        ];
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm gán lại item mảng paymentDetails theo index
 * @param {*} paymentDetail
 * @param {*} index
 * Created by: NHGiang - (21/03/23)
 */
const setPaymentDetailsByIndex = (paymentDetail, index) => {
    try {
        state.paymentDetails[index] = paymentDetail;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lấy ra danh sách các paymentDetails
 * Created by: NHGiang - (23/03/23)
 * @param {} paymentDetails
 */
const setPaymentDetails = (paymentDetails) => {
    try {
        state.paymentDetails = [...paymentDetails];
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm thêm 1 item vào mảng paymentDetails khi click thêm dòng
 * @param {*} paymentDetail
 * Created by: NHGiang - (21/03/23)
 */
const addPaymentDetails = (paymentDetail) => {
    try {
        state.paymentDetails.push(paymentDetail);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm xóa 1 item vào mảng paymentDetails khi click thêm dòng
 * @param {*} paymentDetail
 * Created by: NHGiang - (21/03/23)
 */
const deletePaymentDetails = (index) => {
    try {
        state.paymentDetails = state.paymentDetails.filter((paymentDetail, i) => i !== index);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm gán lại object paymentDetail khi thực hiện nhập dữ liệu
 * @param {*} paymentDetail
 * Created by: NHGiang - (21/03/23)
 */
const setPaymentDetail = (paymentDetail) => {
    try {
        state.paymentDetail = paymentDetail;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm gán lại object paymentDetail với giá trị mặc định
 * Created by: NHGiang - (21/03/23)
 */
const setPaymentDetailDefault = () => {
    try {
        state.paymentDetail = {
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
        };
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lấy ra bậc của tài khoản khi click chọn 1 dòng trong bảng tài khoản
 * @param {*} grade
 *  Created by: NHGiang - (21/03/23)
 */
const setGradeAccountSelected = (grade) => {
    try {
        state.gradeAccountSelected = grade;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lấy ra tổng tiền phiếu chi
 * @param {*} totalPayment
 * Created by: NHGiang - (21/03/23)
 */
const setTotalPayment = (totalPayment) => {
    try {
        state.totalPayment = totalPayment;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm đặt lại index cho dòng có trạng thái edit trên UI detail
 * Created by: NHGiang - (21/03/23)
 * @param {*} index
 */
const setIndexRowEditable = (index) => {
    try {
        state.indexRowEditable = index;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm set lại tabrouter đang được select
 * Created by: NHGiang - (23/03/23)
 * @param {*} indexTab
 */
const setIndexTabRouter = (indexTab) => {
    try {
        state.indexTabRouter = indexTab;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lấy ra index của page đang được chọn trên sidebar
 * Created by: NHGiang - (23/03/23)
 * @param {*} index
 */
const setSidebarSelected = (index) => {
    try {
        state.sidebarSelected = index;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lấy ra index của dòng đang được chọn trên UI master payment
 * Created by: NHGiang - (23/03/23)
 * @param {*} index
 */
const setRowPaymentSelected = (index) => {
    try {
        state.rowPaymentSelected = index;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lấy ra tổng số trang payment Detail trên UI detail
 * Created by: NHGiang - (23/03/23)
 * @param {*} totalPage
 */
const setTotalPagePaymentDetail = (totalPage) => {
    try {
        state.totalPagePaymentDetail = totalPage;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lấy ra tổng số bản ghi payment Detail trên UI detail
 * Created by: NHGiang - (23/03/23)
 * @param {*} totalPage
 */
const setTotalRecordPaymentDetail = (totalRecord) => {
    try {
        state.totalRecordPaymentDetail = totalRecord;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm lấy ra paymentId dùng để lấy danh sách phiếu chi chi tiết
 * Created by : NHGiang - (23/03/23)
 * @param {*} id
 */
const setPaymentIdFilter = (id) => {
    try {
        state.paymentIdFilter = id;
    } catch (error) {
        console.log(error);
    }
};

const setListAllAccounts = (accounts) => {
    try {
        state.listAllAccounts = accounts;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm set trạng thái các trường nhập liệu trên UI payment form
 * @param {*} listField
 * @param {*} status
 */
const setDisableFiled = (listField, status) => {
    try {
        listField.forEach((element) => {
            state.disableFiled[`${element}`] = status;
        });
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm set trạng thái các trường nhập liệu trên UI payment form
 * @param {*} listField
 * @param {*} status
 * Created by: NHGiang - (27/03/23)
 */
const setDisableFiledDefault = () => {
    try {
        state.disableFiled = {
            objectCode: false,
            objectName: false,
            address: false,
            attachment: false,
            employeeId: false,
            postedDate: false,
            reason: false,
            reasonType: false,
            receiver: false,
            refDate: false,
            refNo: false,
        };
    } catch (error) {
        console.log(error);
    }
};

/**
 * hàm set trạng thái click row detail
 * Created by: NHGiang - (27/03/23)
 */
const setIsClickRow = (status) => {
    try {
        state.isClickRow = status;
    } catch (error) {
        console.log(error);
    }
};

/**
 * hàm set trạng thái button submit (cất hoặc sửa)
 * Created by: NHGiang - (27/03/23)
 */
const setIsEditButton = (status) => {
    try {
        state.isEditButton = status;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm set trạng thái các trường nhập liệu Row detail
 * @param {*} listField
 * @param {*} status
 * Created by: NHGiang - (27/03/23)
 */
const setDisableFiledRowDefault = () => {
    try {
        state.disableFiledRow = {
            objectCode: false,
            description: false,
            amount: false,
            debitAccount: false,
            creditAccount: false,
        };
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm set trạng thái các trường nhập liệu trên UI payment form
 * @param {*} listField
 * @param {*} status
 */
const setDisableFiledRow = (listField, status) => {
    try {
        listField.forEach((element) => {
            state.disableFiledRow[`${element}`] = status;
        });
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm set trạng thái chỉnh sửa dòng UI Detail
 * Created by: NHGiang - (27/03/23)
 * @param {*} status
 */
const setEditable = (status) => {
    try {
        state.editable = status;
    } catch (error) {
        console.log(error);
    }
};

export default {
    state: readonly(state),
    setIsSidebar,
    setEntities,
    setTitleForm,
    setIsForm,
    setEntitySelected,
    setTotalEntities,
    setTotalPage,
    setIdentityForm,
    setlistAllEntities,
    setListToast,
    setListItemChecked,
    setKeyword,
    setListPageChecked,
    deleteToastHidden,
    setIsLoading,
    setObjects,
    setEmployees,
    setPayments,
    setParentId,
    setObjectSelected,
    setNewRefNo,
    setPaymentDetails,
    setPaymentDetail,
    addPaymentDetails,
    setGradeAccountSelected,
    setTotalPayment,
    setIndexRowEditable,
    setPaymentDetailsDefault,
    deletePaymentDetails,
    setIndexTabRouter,
    setPaymentDetailsByIndex,
    setSidebarSelected,
    setRowPaymentSelected,
    setTotalPagePaymentDetail,
    setTotalRecordPaymentDetail,
    setPaymentIdFilter,
    setPaymentDetailDefault,
    setListAllAccounts,
    setDisableFiled,
    setIsClickRow,
    setIsEditButton,
    setDisableFiledDefault,
    setDisableFiledRow,
    setDisableFiledRowDefault,
    setEditable,
};
