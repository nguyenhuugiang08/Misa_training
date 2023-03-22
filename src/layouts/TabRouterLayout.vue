<script setup>
import TheSidebar from "../components/TheSidebar.vue";
import TheHeader from "../components/TheHeader.vue";
import { MISA_RESOURCE } from "../base/resource";
import { ref, inject } from "vue";

const { state, setIndexTabRouter } = inject("diy");
</script>

<template>
    <div class="container">
        <the-sidebar />
        <div class="main">
            <the-header />
            <div class="content content-payment">
                <div class="content__header tab">
                    <ul class="tab-list">
                        <router-link
                            :to="tab.tabLink"
                            :class="`tab-item ${
                                state.indexTabRouter === index ? 'tab-item--active' : ''
                            }`"
                            v-for="(tab, index) in MISA_RESOURCE.TAB"
                            :key="index"
                            @click="setIndexTabRouter(index)"
                        >
                            {{ tab.tabName }}
                        </router-link>
                    </ul>
                    <div class="line"></div>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tab {
    padding-top: 10px;
}
.tab-list {
    list-style: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.tab-item {
    padding: 4px 20px;
    border-bottom: 4px solid transparent;
    cursor: pointer;
    text-decoration: none;
    color: #111;
}

.tab-item:hover {
    color: #2ca01c;
}

.tab-item--active {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #f2ebbf;
    border-bottom: 4px solid #2ca01c;
    box-shadow: 0 0 2px rgb(0 0 0 / 16%);
    font-weight: 700;
}

.line {
    position: absolute;
    width: 100%;
    height: 1px;
    background: #d4d7dc;
    top: calc(var(--tab__router-height) + 10px - 2px);
    left: -32px;
}
</style>
