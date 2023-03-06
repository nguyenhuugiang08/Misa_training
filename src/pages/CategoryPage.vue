<script setup></script>

<template>
    <div class="content">
        <div class="content__header category">
            <div class="content__header-text category-title">Danh mục</div>
            <div class="category-content">
                <span class="category-label">Tài khoản</span>
                <ul class="category-list">
                    <router-link to="account-system" class="category-item"
                        >Hệ thống tài khoản</router-link
                    >
                    <router-link to="/" class="category-item">Tài khoản kết chuyển</router-link>
                    <router-link to="/" class="category-item">Tài khoản ngầm định</router-link>
                </ul>
            </div>
        </div>
    </div>
</template>
