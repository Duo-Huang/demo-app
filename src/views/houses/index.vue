<template>
    houses list:
    <ul>
        <li v-for="{ id, label, description, price, img } in houses" :key="id">
            <img :src="img" alt="">
            <div>
                <div>
                    <span>{{ label }}</span>
                    <span>{{ description }}</span>
                    <span>{{ label }}</span>
                </div>
                <div>
                    {{ price }}
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
const houses = [
    {
        id: '1',
        label: '整租·国际港 1室1厅 南',
        description: '朝阳-燕莎-国际港 / 70.53㎡ /南 / 1室1厅1卫',
        price: '3000',
        img: 'https://ke-image.ljcdn.com/110000-inspection/pc1_588q6THVh.jpg!m_fill,w_250,h_182,l_fbk,o_auto'
    },
    {
        id: '2',
        label: '整租·霞光里30号院 2室1厅 南',
        description: '朝阳-燕莎-霞光里30号院 / 70.25㎡ /南 / 2室1厅1卫',
        price: '5000',
        img: 'https://ke-image.ljcdn.com/rent-house-1/img/2b659455896a8fbc9fd92302ea46835f-1654201363019/46a99652a632acd038f45cefb052bedb.jpg.250x182.jpg'
    }
]
</script>
