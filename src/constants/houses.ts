export enum RENT_TYPE {
    WHOLE,
    PATIAL
}

export const RENT_TYPE_OPTIONS = {
    [RENT_TYPE.WHOLE]: '整租',
    [RENT_TYPE.PATIAL]: '合租'
}

export enum PAYMENT_TYPE {
    MONTHLY,
    QUARTER,
    HALF_YEAR,
    YEAR
}

export const PAYMENT_TYPE_OPTION = {
    [PAYMENT_TYPE.MONTHLY]: '月付',
    [PAYMENT_TYPE.QUARTER]: '季付',
    [PAYMENT_TYPE.HALF_YEAR]: '半年付',
    [PAYMENT_TYPE.YEAR]: '年付'
}
