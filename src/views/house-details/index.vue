<template>
    <h1>House Details</h1>
    {{ houseDetails || tips }}
    <br>
    <br>
    <br>
    <el-button type="primary" :disabled="!canAppointment" @click="appointment">预约看房</el-button>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ACTIONS } from '@/constants/store';
import messager from '@/utils/message';

const route = useRoute()
const store = useStore<AppState.RootState>()
const houseDetails = computed(() => store.state.houses.houseDetails)
const tips = ref('');
const canAppointment = ref(false);

onMounted(async () => {
    tips.value = 'loading...'
    await store.dispatch(ACTIONS.GET_HOUSE_DETAILS, route.params.id).finally(() => tips.value = 'No Data')
    canAppointment.value = true
})

const appointment = () => {
    messager.success('预约成功')
}

</script>
