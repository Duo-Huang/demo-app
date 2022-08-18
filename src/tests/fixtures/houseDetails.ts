import { HouseDetails } from '@/types/houses'

export const houseDetails: AppResponse<HouseDetails> = {
    code: 0,
    message: '',
    data: {
        rentType: 0,
        payment: {
            payType: 0,
            price: 2300,
            deposit: 1,
        },
        houseInfo: {
            area: 98,
            floor: '7层/总高33层',
            address: '和平村地铁站E口',
            structure: '2室1厅1厨1卫',
            facility: ['电视机', '冰箱', '洗衣机', '热水器', '空调'],
        },
        communityInfo: {
            name: '世纪花园',
            facility: ['地下停车位', '地面电动车充电桩', '游乐场', '花园', '人造湖'],
            fee: {
                propertyCosts: 2.2,
                waterFee: 3.4,
                electricityFee: 0.5,
            },
        },
    },
}
