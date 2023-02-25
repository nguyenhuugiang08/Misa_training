<script setup>
import { ref } from "vue";
import MRadio from "./MRadio.vue";
import { formatBytes } from "../utilities/formatCapacity";

const file = ref(null);
const refFile = ref(null);

/**
 * Hàm thực hiện chọn file khi bấm chọn file
 * @param {*} event
 * Created by: NHGiang - (23/02/23)
 */
const handleChangeFile = (event) => {
    try {
        file.value = event.target.files?.[0];
    } catch (error) {
        console.log(error);
    }
};

/**
 * Hàm thực hiện chọn file khi kéo/thả file
 * @param {*} e
 */
const drop = (e) => {
    file.value = e.dataTransfer.files[0];
};
</script>

<template>
    <div class="content-one">
        <div class="content-one__left">
            <div class="file-description">
                <div class="file-description__icon"></div>
                <div class="file-type">Chọn tệp Excel</div>
                <div class="file-capacity">Dung lượng tối đa 20MB</div>
            </div>
            <div>
                <label
                    class="file-label"
                    for="file"
                    @change="handleChangeFile"
                    @dragenter.prevent
                    @dragleave.prevent
                    @dragover.prevent
                    @drop.prevent="drop"
                >
                    <span v-if="file" class="file-info">
                        <span class="upload-file-name">{{ file.name }}</span>
                        <span class="upload-file-size"> ({{ formatBytes(file.size) }}) </span>
                    </span>
                    Kéo/ thả tệp vào đây hoặc bấm vào đây
                </label>
                <input
                    type="file"
                    id="file"
                    ref="refFile"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    @change="handleChangeFile"
                />
            </div>
            <a class="file-sample" href=""
                >Tải tệp mẫu
                <div class="download-file-sample"></div
            ></a>
            <div class="input-method">Phương thức nhập</div>
            <div class="modal__gender">
                <m-radio :id="'add'" :labelText="'Thêm mới'" />
            </div>
        </div>
        <div class="content-one__right">
            <div class="content-one__right-header">
                <img
                    class="content-right-icon"
                    src="https://actappg2.misacdn.net/img/48px_flashlight.d25a51ba.svg"
                    alt="Ảnh"
                />
                <div class="recommentation">Gợi ý</div>
            </div>
            <ul class="content-right__list">
                <li class="content-right__item">Tải tệp mẫu để nhập những thông tin cần thiết.</li>
                <li class="content-right__item">
                    Các thiết lập trong quá trình nhập sẽ được lưu để sử dụng trong các lần tiếp
                    sau.
                </li>
                <li class="content-right__item">
                    <strong>Thêm mới:</strong> Dữ liệu trên tệp mà chưa có trong hệ thống sẽ được
                    thêm mới vào. Dữ liệu mà đã có trên hệ thống sẽ không được cập nhật vào.
                </li>
            </ul>
        </div>
    </div>
</template>
