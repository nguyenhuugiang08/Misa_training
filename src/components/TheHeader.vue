<script setup>
import { inject } from "vue";
const { state, setIsSidebar } = inject("diy");
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
                class="sidebar-item__icon"
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
                <div class="header__left-wrapper">
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
    </div>
</template>

<style scoped></style>
