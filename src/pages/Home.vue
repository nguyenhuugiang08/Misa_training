<script setup>
import MTable from "../components/MTable.vue";
import MPagination from "../components/MPagination.vue";
import MPopUp from "../components/MPopUp.vue";
import MLoading from "../components/MLoading.vue";
import { ref, inject } from "vue";
import { useEmployee } from "../composable/useEmployee";

const { listEmployees, searchEmployees, getAllEmployees } = useEmployee();
const { state, setListEmployees, setTitleForm, setIsForm, setEmployeeSelected } = inject("diy");
const debounce = ref(null);
const keyword = ref("");
const isLoading = ref(false);

/**
 * Xử lý tìm kiếm nhân viên theo tên, mã nhân viên
 */
const debounceSearch = (e) => {
    keyword.value = e.target.value;
    isLoading.value = true;
    clearTimeout(debounce);
    debounce = setTimeout(async () => {
        await searchEmployees(keyword.value);
        setListEmployees(listEmployees);
        isLoading.value = false;
    }, 300);
};

/**
 * Xử lý khi kết thúc việc sửa nhân  viên
 * CreatedBy: NHGiang
 */
const handleEndEditEmployee = async() => {
    try {
        await getAllEmployees();
        setListEmployees(listEmployees);
        setIsForm(false);
        isLoading.value = false;
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="content">
        <div class="content__header">
            <div class="content__header-text">Nhân viên</div>
            <button
                class="btn btn-primary btn-add-emp"
                @click="
                    setIsForm();
                    setTitleForm('Thông tin nhân viên');
                    setEmployeeSelected({});
                "
            >
                Thêm mới nhân viên
            </button>
        </div>
        <div class="content-wrapper">
            <div class="content-wrapper__action">
                <div class="textfield">
                    <label for="" class="textfield__label">
                        <div
                            class="sidebar-item__icon textfield__icon content-icon"
                            :style="{
                                background:
                                    'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -317px -148px',
                            }"
                        ></div>
                    </label>
                    <input
                        type="text"
                        class="textfield__input"
                        id="search-input"
                        placeholder="Tìm kiếm mã, tên nhân viên"
                        @keyup="debounceSearch($event)"
                        autocomplete="off"
                    />
                </div>
                <div
                    class="sidebar-item__icon content-wrapper__action-refresh"
                    :style="{
                        background:
                            'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -425px -201px',
                    }"
                ></div>
            </div>
            <M-table />
            <m-pagination />
            <m-pop-up
                v-if="state.isForm"
                @hideModal="setIsForm"
                :title="state.titleForm"
                @startEdit="isLoading = true"
                @endEdit="handleEndEditEmployee"
            />
            <div v-if="isLoading" class="modal-loading">
                <m-Loading />
            </div>
        </div>
    </div>
</template>

<style>
.modal-loading {
    background-color: #0000004d;
    position: fixed;
    z-index: 99;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
