<script setup>
import TheSidebar from "../components/TheSidebar.vue";
import TheHeader from "../components/TheHeader.vue";
import { ref } from "vue";

const isShowSidebar = ref(false);

const handleChangeStatusSidebar = (e) => {
    try {
        isShowSidebar.value = e;
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="container">
        <the-sidebar :isShow="isShowSidebar" @showSidebar="handleChangeStatusSidebar($event)" />
        <div class="main">
            <the-header @hideSidebar="handleChangeStatusSidebar($event)" :isHide="isShowSidebar" />
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped></style>
