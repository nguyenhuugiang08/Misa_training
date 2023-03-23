<script setup>
import { MISA_RESOURCE } from "../base/resource";
import { MISA_ENUM } from "../base/enum";
import { inject } from "vue";
const { state, setIsSidebar, setIndexTabRouter, setSidebarSelected } = inject("diy");
</script>

<template>
    <div class="navbar">
        <div class="navbar-header">
            <div class="sidebar-item__icon navbar-header__icon" v-if="!state.isSidebar">
                <div
                    :style="{
                        background:
                            'url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -428px -92px',
                        width: '16px',
                        height: '16px',
                    }"
                ></div>
            </div>
            <img
                src="../assets/img/Logo_Module_TiengViet_White.66947422.svg"
                alt=""
                class="navbar-header__logo"
                v-if="!state.isSidebar"
            />
            <div
                class="sidebar-item__icon header__left-three-strips"
                v-if="state.isSidebar"
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
        </div>
        <ul class="sidebar-list" :style="{ width: state.isSidebar ? '52px' : '178px' }">
            <router-link
                v-for="(sidebar, index) in MISA_RESOURCE.SIDEBAR_PAGES"
                :key="index"
                :to="sidebar.link"
                :class="{ 'sidebar-item--active': state.sidebarSelected === index }"
                @click="
                    setSidebarSelected(index);
                    sidebar.hasTabRouter && setIndexTabRouter(0);
                "
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        :style="{
                            background: sidebar.img,
                            width: sidebar.with,
                            height: sidebar.height,
                        }"
                    ></div>
                </div>
                <p v-if="!state.isSidebar">{{ sidebar.sidebarTitle }}</p>
            </router-link>
            <div class="separation-line"></div>
            <router-link
                to="/category"
                :class="{
                    'sidebar-item--active':
                        state.sidebarSelected === MISA_ENUM.INDEX_SIDEBAR_CATEGORY,
                }"
                @click="setSidebarSelected(MISA_ENUM.INDEX_SIDEBAR_CATEGORY)"
                class="sidebar-item"
            >
                <div class="sidebar-item__icon">
                    <div
                        :style="{
                            background:
                                'url(../../src/assets/img/Sprites.svg) no-repeat -1711px -33px',
                            width: '17px',
                            height: '14px',
                        }"
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Danh mục</p>
            </router-link>
        </ul>
    </div>
</template>

<style>
.separation-line {
    margin: 5px 20px;
    border-top: 1px solid #fff;
    opacity: 0.3;
}
</style>
