<template>
    <h1>Post house</h1>
    <el-dialog v-model="dialogVisible" width="30%">
        <span>继续上次编辑的内容？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="continueLastEdit">确认</el-button>
            </span>
        </template>
    </el-dialog>
    <el-row>
        <el-col :lg="{ span: 12, offset: 6 }">
            <el-form ref="formRef" label-position="top" label-width="100px" :model="formModel" :rules="formRules">
                <el-form-item label="城市" prop="city">
                    <el-input v-model="formModel.city" />
                </el-form-item>
                <el-form-item label="小区" prop="community">
                    <el-input v-model="formModel.community" />
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="formModel.address" />
                </el-form-item>
                <el-form-item label="期望价格(元/月)" prop="expectPrice">
                    <el-input v-model="formModel.expectPrice" type="number" step="100" max="1000000" min="0" />
                </el-form-item>
                <el-form-item label="出租类型" prop="rentType">
                    <el-select v-model="formModel.rentType" placeholder="请选择出租类型" style="width: 100%">
                        <el-option
                            v-for="{ label, value } in rentTypeOptions"
                            :key="value"
                            :label="label"
                            :value="value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="formModel.phone" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="large" :loading="postLoading" @click="postHouse(formRef)"
                        >发布委托</el-button
                    >
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { FormInstance, FormRules, messageProps } from 'element-plus'
import { PostedHouseInfo } from '@/types/houses'
import { RENT_TYPE_OPTIONS, RENT_TYPE } from '@/constants/houses'
import { postHouseInfo, getLastPostFailedHouseInfo } from '@/data-access/houses'
import messager from '@/utils/message'

onMounted(() => {
    if (getLastPostFailedHouseInfo()) {
        dialogVisible.value = true
    }
})

let formModel = ref<PostedHouseInfo>({
    city: '',
    community: '',
    address: '',
    expectPrice: 0,
    rentType: 0,
    phone: '',
})

const formRules = reactive<FormRules>({
    city: [{ required: true, message: '请输入城市' }],
    community: [{ required: true, message: '请输入小区' }],
    address: [{ required: true, message: '请输入地址' }],
    expectPrice: [{ required: true, message: '请输入期望租金' }],
    rentType: [{ required: true, message: '请请选择出租类型' }],
    phone: [{ required: true, message: '请输入手机号' }],
})

const rentTypeOptions = [
    {
        label: RENT_TYPE_OPTIONS[RENT_TYPE.WHOLE],
        value: RENT_TYPE.WHOLE,
    },
    {
        label: RENT_TYPE_OPTIONS[RENT_TYPE.PATIAL],
        value: RENT_TYPE.PATIAL,
    },
]

const formRef = ref<FormInstance>()

const postLoading = ref(false)
const dialogVisible = ref(false)

const continueLastEdit = () => {
    formModel.value = getLastPostFailedHouseInfo() as PostedHouseInfo
    dialogVisible.value = false
}

const postHouse = async (formInstance: FormInstance | undefined) => {
    if (formInstance) {
        await formInstance.validate()
        postLoading.value = true
        await postHouseInfo(formModel.value).finally(() => (postLoading.value = false))
        formInstance.resetFields()
        messager.success('委托成功')
    }
}
</script>
