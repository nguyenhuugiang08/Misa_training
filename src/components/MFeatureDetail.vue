<script setup>
import { ref } from "vue";

const isShowList = ref(false); // Trạng thái ẩn hiện danh sách chức năng (Nhân bản, Xóa)
const toDropList = ref(0); // Khoảng cách của danh sách chức năng so với top của cửa số trình duyệt

const props = defineProps({
    data: Object,
});

/**
 * hàm xử lý vị trí hiển thị của danh sách chức năng
 * @param {Object} e -- object event
 * Created by: NHGiang - (20/02/23)
 */
const handleDisplayHideListAction = (e) => {
    try {
        isShowList.value = !isShowList.value;
        if (e.target.getBoundingClientRect().y > 620) {
            toDropList.value = e.target.getBoundingClientRect().y - 130;
        } else {
            toDropList.value = e.target.getBoundingClientRect().y + 32;
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * xử lý click outside list action
 * CreatedBy: NHGiang
 */
const handleClickOutside = () => {
    try {
        isShowList.value = false;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Xử lý xóa đối tượng
 * @param {*} id
 * Created by: NHGiang - (08/03/23)
 */
const handleDelete = (id) => {
    try {
        alert(id);
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <td class="tbl-col tbl-col__last">
        <div class="tbl-col__action">
            <label class="tbl-col__action-edit">Sửa</label>
            <label
                class="sidebar-item__icon btn-dropdown"
                :class="isShowList ? 'btn-dropdown--active' : ''"
                style="display: flex; justify-content: center; align-items: center"
                @click="handleDisplayHideListAction"
                v-click-outside-element="handleClickOutside"
            >
                <div
                    :style="{
                        background:
                            'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -900px -365px',
                        width: '8px',
                        height: '5px',
                    }"
                ></div>
            </label>
        </div>
    </td>
    <ul
        class="tbl-col__action-list textfield-list--action"
        v-if="isShowList"
        :style="{ top: `${toDropList}px` }"
    >
        <li class="tbl-col__action-item">Nhân bản</li>
        <li class="tbl-col__action-item" @click="handleDelete(data.AccountId)">Xóa</li>
        <li class="tbl-col__action-item">Ngừng sử dụng</li>
    </ul>
</template>

<style scoped></style>
