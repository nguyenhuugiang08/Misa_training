<script setup>
import { inject } from "vue";
const { state, setIsSidebar } = inject("diy");
</script>

<template>
    <div class="navbar" :style="{ width: state.isSidebar ? '52px' : '178px' }">
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
            <li class="sidebar-item" tabindex="0">
                <div class="sidebar-item__icon">
                    <div
                        :style="{
                            background:
                                'url(../../src/assets/img/Sprites.ee5d4fa7.svg) no-repeat -33px -1630px',
                            width: '18px',
                            height: '20px',
                        }"
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Tổng quan</p>
            </li>
            <li class="sidebar-item" tabindex="0">
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -78px -1631px;
                            width: 14px;
                            height: 18px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Tiền mặt</p>
            </li>
            <li class="sidebar-item" tabindex="0">
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -121px -1633px;
                            width: 16px;
                            height: 16px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Tiền gửi</p>
            </li>
            <li class="sidebar-item" tabindex="0">
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -165px -1632px;
                            width: 16px;
                            height: 18px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Mua hàng</p>
            </li>
            <li class="sidebar-item" tabindex="0">
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -206px -1631px;
                            width: 20px;
                            height: 18px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Bán hàng</p>
            </li>
            <li class="sidebar-item" tabindex="0">
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -254px -1632px;
                            width: 14px;
                            height: 17px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Quản lý đơn hàng</p>
            </li>
            <li class="sidebar-item" tabindex="0">
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -294px -1632px;
                            width: 18px;
                            height: 17px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Kho</p>
            </li>
            <li class="sidebar-item" tabindex="0">
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -339px -1633px;
                            width: 18px;
                            height: 17px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Công cụ dụng cụ</p>
            </li>
            <li class="sidebar-item" tabindex="0">
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -382px -1632px;
                            width: 17px;
                            height: 18px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Tài sản cố định</p>
            </li>
            <li class="sidebar-item" tabindex="0">
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -427px -1634px;
                            width: 16px;
                            height: 16px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Thuế</p>
            </li>
            <li class="sidebar-item" tabindex="0">
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -471px -1633px;
                            width: 17px;
                            height: 17px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Giá thành</p>
            </li>
            <li class="sidebar-item" tabindex="0">
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -514px -1632px;
                            width: 16px;
                            height: 18px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Tổng hợp</p>
            </li>
            <li class="sidebar-item" tabindex="0">
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -381px -1663px;
                            width: 18px;
                            height: 18px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Ngân sách</p>
            </li>
            <li class="sidebar-item" tabindex="0">
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -552px -1636px;
                            width: 14px;
                            height: 13px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Báo cáo</p>
            </li>
            <li class="sidebar-item" tabindex="0">
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -207px -1667px;
                            width: 17px;
                            height: 14px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Phân tích tài chính</p>
            </li>
            <li class="sidebar__line"></li>
            <li class="sidebar-item" tabindex="0">
                <div class="sidebar-item__icon">
                    <div
                        style="
                            background: url('../../src/assets/img/Sprites.ee5d4fa7.svg') no-repeat -552px -1666px;
                            width: 16px;
                            height: 15px;
                        "
                    ></div>
                </div>
                <p v-if="!state.isSidebar">Kiến thức</p>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>
