<script setup>
import { inject, ref } from "vue";
import MPopUpError from "./MPopUpError.vue";

// Lấy state và hàm set lại trạng thái của sidebar trong Store
const { state, setIsSidebar } = inject("diy");

// Khai báo biến set trạng thái của Popup thông báo chức năng đang thi công
const isOpen = ref(false);
</script>

<template>
    <div class="header">
        <div class="header__left">
            <div
                class="sidebar-item__icon header__left-three-strips"
                v-if="!state.isSidebar"
                @click="setIsSidebar"
            >
                <div
                    :style="{
                        background:
                            'url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -847px -35px',
                        width: '16px',
                        height: '14px',
                    }"
                ></div>
            </div>
            <div class="header__left-text">
                công ty TNHH sản xuất - thương mại - dịch vụ qui phúc
            </div>
        </div>

        <div class="header__right">
            <div
                class="sidebar-item__icon under-construction"
                @click="isOpen = true"
                style="
                    background: url('../../src/assets/img/Sprites.64af8f61.svg') no-repeat -788px -30px;
                "
            ></div>
            <div class="header__right-box">
                <div
                    class="sidebar-item__icon header__right-avt"
                    style="
                        background: url('../../src/assets/img/Sprites.64af8f61.svg') no-repeat -352px -894px;
                    "
                ></div>
                <div class="header__right-text">Nguyễn Hữu Giang</div>
                <div @click="isOpen = true" class="header__left-wrapper under-construction--special" >
                    <div
                        class="sidebar-item__icon"
                        style="
                            background: url('../../src/assets/img/Sprites.64af8f61.svg') no-repeat -1078px -38px;
                            height: 5px;
                            width: 10px;
                            margin: 0;
                        "
                    ></div>
                </div>
            </div>
        </div>
        <div class="modal-error" v-if="isOpen">
            <m-pop-up-error
                v-if="isOpen"
                :title="'Thông báo'"
                :text-error="`Chức năng chưa thi công.`"
                @closeError="isOpen = !isOpen"
            />
        </div>
    </div>
</template>

<style>
.under-construction {
    position: relative;
    cursor: pointer;
}
.under-construction::before {
    content: "Thông báo";
    position: absolute;
    width: max-content;
    z-index: 999;
    top: 32px;
    background-color: #434242;
    color: #fff;
    padding: 2px 6px;
    border-radius: 4px;
    animation: identifier 0.3s ease-in;
    display: none;
}

.under-construction:hover::before {
    display: block;
}

.under-construction--special {
    position: relative;
    cursor: pointer;
}
.under-construction--special::before {
    content: "Thông tin tài khoản";
    position: absolute;
    width: max-content;
    z-index: 999;
    top: 32px;
    right: -20px;
    background-color: #434242;
    color: #fff;
    padding: 2px 6px;
    border-radius: 4px;
    animation: identifier 0.3s ease-in;
    display: none;
}

.under-construction--special:hover::before {
    display: block;
}
</style>
