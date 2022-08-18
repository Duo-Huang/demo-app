export interface HouseDetails {
    rentType: 0 | 1
    payment: {
        payType: 0 | 1 | 2 | 3
        price: number
        deposit: number
    },
    houseInfo: {
        area:number
        floor: string
        address: string
        structure: string
        facility: string[]
    },
    communityInfo: {
        name: string
        facility: string[]
        fee: {
            propertyCosts: number
            waterFee: number
            electricityFee: 0.5
        }
    }
}
