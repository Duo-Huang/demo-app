<template>
    <h1>House List</h1>
    <el-button type="primary" size="large" @click="postHouse">发布房源</el-button>
    <br />
    <br />
    <el-row>
        <el-col
            v-for="({ id, label, description, price, img }, index) in houses"
            :key="id"
            :span="4"
            :offset="index > 0 ? 2 : 0"
        >
            <el-card class="card" :body-style="{ padding: '0px' }" @click="viewDetails(id)">
                <img :src="img" :alt="label" />
                <div style="padding: 14px">
                    <span class="label">{{ label }}</span>
                    <div class="description">{{ description }}</div>
                    <div class="bottom">
                        <span class="price">{{ price }} 元/月</span>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const houses = [
    {
        id: '1',
        label: '整租·国际港 1室1厅 南',
        description: '朝阳-燕莎-国际港 / 70.53㎡ /南 / 1室1厅1卫',
        price: '3000',
        img: new URL('../../assets/house1.png', import.meta.url).href,
    },
    {
        id: '2',
        label: '整租·霞光里30号院 2室1厅 南',
        description: '朝阳-燕莎-霞光里30号院 / 70.25㎡ /南 / 2室1厅1卫',
        price: '5000',
        img: new URL('../../assets/house2.png', import.meta.url).href,
    },
]

const viewDetails = (id: string) => {
    router.push({ name: 'housesDetails', params: { id } })
}

const postHouse = () => {
    router.push('/houses/post')
}
</script>

<style lang="scss" scoped>
.card {
    cursor: pointer;

    img {
        width: 100%;
        display: block;
    }

    .description {
        font-size: 12px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .price {
            color: #fa5741;
            font-size: 24px;
        }
    }
}
</style>
