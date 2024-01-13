import {StructureMetricsType} from "@/components/ChartCard/ChartCard";
import axios from "axios";

const BASE_URL = 'https://api.coronavirus.data.gov.uk/v1/data'
type FILTER_TYPE = "AREA_TYPE" | "AREA_NAME" | "areaCode" | "date"

interface Filter {
    type: FILTER_TYPE;
    value: string;
}

const DEFAULT_AREA_TYPE = 'nation'
const DEFAULT_AREA_NAME = 'england'


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