<template>
  <div>
    <template v-if="hasInfo === true">
      <a-card
        title="基本健康信息"
        style="width: 60%; margin-left: 20%; margin-top: 20px"
      >
        <a-form
          label-align="left"
          auto-label-width
          style="max-width: 480px; margin: 0 auto"
          :model="info"
          @submit="handleSubmit"
        >
          <a-form-item label="性别:">
            <a-radio-group v-model="info.gender">
              <a-radio value="man">男</a-radio>
              <a-radio value="woman">女</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="年龄:">
            <a-input v-model="info.age" placeholder="请输入年龄"></a-input>
          </a-form-item>
          <a-form-item label="身高:">
            <a-input v-model="info.height" placeholder="请输入身高"></a-input>
          </a-form-item>
          <a-form-item label="体重:">
            <a-input v-model="info.weight" placeholder="请输入体重"></a-input>
          </a-form-item>
          <a-form-item label="左眼视力:">
            <a-input
              v-model="info.leftEyeVision"
              placeholder="请输入左眼视力"
            ></a-input>
          </a-form-item>
          <a-form-item label="右眼视力:">
            <a-input
              v-model="info.rightEyeVision"
              placeholder="请输入右眼视力"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">保存</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </template>
    <template v-if="hasInfo === false">
      <a-card>
        <img class="no_data" src="../assets/noData.png" />
        <a-button type="primary" @click="addDialog = true">新增</a-button>
      </a-card>
    </template>
  </div>

  <a-modal
    v-model:visible="addDialog"
    title="更改密码"
    @ok="addInfo"
    @cancel="addDialog = false"
  >
    <a-form
      label-align="left"
      auto-label-width
      style="max-width: 480px; margin: 0 auto"
      :model="addForm"
      @submit="addInfo"
    >
      <a-form-item label="性别:">
        <a-radio-group default-value="man" v-model="addForm.gender">
          <a-radio value="man" @click="addForm.gender = 'man'">男</a-radio>
          <a-radio value="woman" @click="addForm.gender = 'woman'">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="年龄:">
        <a-input v-model="addForm.age" placeholder="填写年龄"></a-input>
      </a-form-item>
      <a-form-item label="身高:">
        <a-input v-model="addForm.height" placeholder="填写身高"></a-input>
      </a-form-item>
      <a-form-item label="体重:">
        <a-input v-model="addForm.weight" placeholder="填写体重"></a-input>
      </a-form-item>
      <a-form-item label="左眼视力:">
        <a-input
          v-model="addForm.leftEyeVision"
          placeholder="填写左眼视力"
        ></a-input>
      </a-form-item>
      <a-form-item label="右眼视力:">
        <a-input
          v-model="addForm.rightEyeVision"
          placeholder="填写右眼视力"
        ></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref } from "vue";
import {
  BasicHealthInfoControllerService,
  BasicHealthInfoDTO,
} from "../../generated";
import { useStore } from "vuex";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();
const store = useStore();
const user = store.state.user.loginUser;
const hasInfo = ref();
const addDialog = ref(false);
const info = ref();

const addForm = reactive({
  age: undefined,
  gender: "man",
  height: undefined,
  weight: undefined,
  leftEyeVision: undefined,
  rightEyeVision: undefined,
} as BasicHealthInfoDTO);

onMounted(async () => {
  const res =
    await BasicHealthInfoControllerService.getBasicHealthInfoUsingGet();
  if (res.code === 0) {
    hasInfo.value = true;
    info.value = res.data;
  } else if (res.code === 40400) {
    hasInfo.value = false;
  } else {
    hasInfo.value = false;
    message.error("获取基本健康信息失败，" + res.msg);
  }
});
const handleSubmit = async () => {
  const res =
    await BasicHealthInfoControllerService.updateBasicHealthInfoUsingPost(
      info.value
    );
  if (res.code === 0) {
    message.success("更新成功");
  } else {
    message.error("更新失败，" + res.msg);
  }
};

const addInfo = async () => {
  const res =
    await BasicHealthInfoControllerService.addBasicHealthInfoUsingPost(addForm);
  if (res.code === 0) {
    message.success("添加成功");
    router.go(0);
  } else {
    message.error("添加失败，" + res.msg);
  }
};
</script>

<style scoped>
.no_data {
  height: 330px;
}
</style>
