<script setup>
import TheSidebar from "../components/TheSidebar.vue";
import TheHeader from "../components/TheHeader.vue";
</script>

<template>
    <div class="container">
        <the-sidebar />
        <div class="main">
            <the-header />
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped></style>
