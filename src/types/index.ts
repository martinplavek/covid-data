export type EncodingKey = 'x' | 'y' | 'color'
export type Encoding = {
    key: EncodingKey,
    value: string
}

export type Transformation = {
    type: string,
    reverse?: boolean,
    by?: string,
    orderBy?: string,
    order?: 'ASC' | 'DESC',
    ordinal?: boolean,
}

export type Variant = {
    variant: string;
    cumWeeklySequenced: number;
    newWeeklyPercentage: number;
}

export type VariantsWrapper = {
    variants: Variant[]
}

export const isVariantWrapper = (obj: any): obj is Variant => obj.variant

export type VariantsResponse = {
    data: VariantsWrapper[]
}

export const isVariantResponse = (obj: any): obj is VariantsResponse => {
    return isVariantWrapper(obj.data[0].variants[0])
};


export type HospitalCase = {
    date: string;
    hospitalCases: number;
}

export type HospitalCasesResponse = {
    data: HospitalCase[]
}

export const isHospitalCase = (obj: any): obj is HospitalCase => obj.hospitalCases

export const isHospitalCasesResponse = (obj: any): obj is HospitalCasesResponse => {
    return isHospitalCase(obj.data[0])
};