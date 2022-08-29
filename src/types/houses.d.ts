type RentType = 0 | 1
type Payment = 0 | 1 | 2 | 3

export interface HouseDetails {
    rentType: RentType
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
        img: string[]
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

export interface PostedHouseInfo {
    city: string
    community: string
    address: string
    expectPrice: number
    rentType: RentType
    phone: string
}
