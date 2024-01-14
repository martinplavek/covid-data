import axios from "axios";
import {StructureMetricsType} from "@/fetcher/definitions";

const BASE_URL = 'https://api.coronavirus.data.gov.uk/v1/data'
type FILTER_TYPE = "AREA_TYPE" | "AREA_NAME" | "areaCode" | "date"

interface Filter {
    type: FILTER_TYPE;
    value: string;
}

const DEFAULT_AREA_TYPE = 'nation'
const DEFAULT_AREA_NAME = 'england'

type Variant = {
    variant: string;
    cumWeeklySequenced: number;
    newWeeklyPercentage: number;
}

export type VariantsWrapper = {
    variants: Variant[]
}

const isVariantWrapper = (obj: any): obj is Variant => obj.variant

export type VariantsResponse = {
    data: VariantsWrapper[]
}

export const isVariantResponse = (obj: any): obj is VariantsResponse => {
    return isVariantWrapper(obj.data[0].variants[0])
};


type HospitalCase = {
    date: string;
    hospitalCases: number;
}

export type HospitalCasesResponse = {
    data: HospitalCase[]
}

const isHospitalCase = (obj: any): obj is HospitalCase => obj.hospitalCases

export const isHospitalCasesResponse = (obj: any): obj is HospitalCasesResponse => {
    return isHospitalCase(obj.data[0])
};

const filter = (userFilters?: Filter[]) => {
    const defaultFilter = `areaType=${DEFAULT_AREA_TYPE};areaName=${DEFAULT_AREA_NAME}`
    const userFilterMapping = userFilters?.map(filter => `${filter.type}=${filter.value}`) ?? []
    const filters = [
        defaultFilter,
        ...userFilterMapping
    ]

    return filters.join(';')
}

export const fetchData = async <T,R>(structure: Partial<StructureMetricsType>, customFilters?: Filter[]) => {
    const data = await axios.get<T, R>(BASE_URL, {
        params: {
            filters: filter(customFilters),
            structure: JSON.stringify(structure),
        }
    })

    return data
}