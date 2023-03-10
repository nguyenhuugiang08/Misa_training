<script setup>
import MInput from "./MInput.vue";
import MCheckbox from "./MCheckbox.vue";
import { MISA_RESOURCE, ACCOUNT_TRACK } from "../base/resource";
import { ref } from "vue";

const emit = defineEmits(["closeForm"]);

const isShowTrackDetail = ref(true); // Trạng thái Đóng/Mở của theo dõi chi tiết
const isResize = ref(false); // Trạng thái Mở rộng/ Thu gọn
const isChecked = ref(false);
</script>

<template>
    <div class="overlay-form">
        <div :class="{ 'account-form': true, 'account-form--extend': isResize }">
            <div class="modal__header">
                <div class="modal__header-left">
                    <div class="modal__header-left-text">Thêm tài khoản</div>
                </div>
                <div class="modal__header-right">
                    <div class="modal__close-btn">
                        <label
                            for="show-modal"
                            :style="{
                                background:
                                    'url(../../src/assets/img/Sprites.64af8f61.svg) no-repeat -147px -147px',
                                width: '18px',
                                height: '18px',
                                cursor: 'pointer',
                            }"
                        ></label>
                    </div>
                </div>
            </div>
            <div class="account-main">
                <div class="row">
                    <m-input
                        field-text="Số tài khoản"
                        required
                        width="25%"
                        bottom="12px"
                        full-width
                    />
                </div>
                <div class="row">
                    <m-input
                        field-text="Tên tài khoản"
                        required
                        width="100%"
                        bottom="12px"
                        full-width
                    />
                    <m-input
                        field-text="Tên tiếng anh"
                        width="100%"
                        bottom="12px"
                        full-width
                        style="margin-left: 8px"
                    />
                </div>
                <div class="row">
                    <div class="checkbox-wrapper" style="width: 25%; margin-right: 8px">
                        <m-checkbox
                            text-label="Tài khoản tổng hợp"
                            width="100%"
                            bottom="12px"
                            :default="MISA_RESOURCE.ACCOUNT_NATURE[1].optionId"
                            :options="MISA_RESOURCE.ACCOUNT_NATURE"
                        />
                    </div>
                    <div class="checkbox-wrapper" style="width: 25%">
                        <m-checkbox
                            text-label="Tính chất"
                            required=""
                            width="100%"
                            bottom="12px"
                            :default="MISA_RESOURCE.ACCOUNT_NATURE[1].optionId"
                            :options="MISA_RESOURCE.ACCOUNT_NATURE"
                        />
                    </div>
                </div>
                <div class="row" style="width: 100%">
                    <div class="textarea-wrapper">
                        <label class="textfield__label modal-label"> Diễn giải</label>
                        <textarea class="account-form__textarea"></textarea>
                    </div>
                </div>
                <div class="row">
                    <label
                        for="accounting"
                        class="modal__header-left-wrapper account-checkbox"
                        tabindex="0"
                    >
                        <input type="checkbox" id="accounting" />
                        <div class="check-icon"></div>
                    </label>
                    <span>Có hạch toán ngoại tệ</span>
                </div>
            </div>
            <div class="account-track-detail">
                <div
                    class="row account-track__title"
                    @click="isShowTrackDetail = !isShowTrackDetail"
                >
                    <div class="m-icon">
                        <div
                            class="account-track-detail__icon"
                            :style="{
                                transform: !isShowTrackDetail ? 'rotate(90deg)' : 'rotate(0deg)',
                            }"
                        ></div>
                    </div>
                    Theo dõi chi tiết theo
                </div>
                <div class="track-detail" :style="{ height: !isShowTrackDetail ? '0' : '300px' }">
                    <div
                        class="row account-track__left-row"
                        v-for="(item, index) in ACCOUNT_TRACK"
                        :key="index"
                        style="width: 50%; float: left"
                    >
                        <div
                            class="row-left"
                            :style="{ marginLeft: index % 2 !== 0 ? '32px' : '0' }"
                        >
                            <label
                                for="subject"
                                class="modal__header-left-wrapper account-checkbox"
                                tabindex="0"
                                @click="isChecked = !isChecked"
                            >
                                <input type="checkbox" id="subject" :checked="isChecked" />
                                <div class="check-icon"></div>
                            </label>
                            <span class="track-text">{{ item.trackText }}</span>
                        </div>
                        <div
                            v-if="item.isComboBox"
                            class="checkbox-wrapper"
                            :style="{ width: '50%', marginRight: index % 2 === 0 ? '32px' : '0' }"
                        >
                            <m-checkbox
                                width="100%"
                                :default="item.default"
                                :options="item.options"
                                :disabled="!isChecked"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer account-form__footer">
                <div class="modal-footer__wrapper">
                    <button
                        type="submit"
                        class="btn btn-secondary modal-btn__secondary btn-save"
                        tabindex="0"
                    >
                        Cất
                    </button>
                    <button class="btn btn-primary btn-save-add" tabindex="0" ref="refSaveBtn">
                        Cất và thêm
                    </button>
                </div>
                <label
                    for="show-modal"
                    class="btn btn-secondary modal-btn-cancel"
                    tabindex="0"
                    ref="refCancelBtn"
                    @click="emit('closeForm')"
                    >Hủy</label
                >
            </div>

            <div class="account-form__resize" @click="isResize = !isResize">
                <div class="form-resize__icon"></div>
            </div>
        </div>
    </div>
</template>

<style>
.textarea-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.account-form__textarea {
    resize: none;
    border-radius: 3px;
    border: 1px solid #babec5;
    font-family: inherit;
    display: block;
    padding: 9px;
    color: #000;
    font-size: 13px;
    width: 100%;
    height: 100%;
    border: 1px solid var(--border-color);
    outline: none;
    margin-bottom: 12px;
}

.account-form__textarea:focus {
    border: 1px solid var(--primary-color);
}

.account-form__textarea:hover {
    background-color: #f6f6f6;
}

.track-text {
    line-height: 28px;
}
</style>
