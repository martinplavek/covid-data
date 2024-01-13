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