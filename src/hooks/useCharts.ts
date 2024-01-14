import {
    HospitalCasesResponse,
    isHospitalCasesResponse,
    isVariantResponse,
    VariantsResponse
} from "@/fetcher/dataFetcher";
import {LineChart} from "@/components/LineChart/LineChart";
import {DonutChart} from "@/components/DonnutChart/DonutChart";
import {Encoding, Transformation} from "@/types";
import {ComponentType} from "react";

interface ChartTypeMapping {
    Component: ComponentType<any>;
    encodings: Encoding[];
    transformation?: Transformation;
    title: string;
}

export const chartByType = (type: HospitalCasesResponse | VariantsResponse): ChartTypeMapping => {
    if(isHospitalCasesResponse(type)) {
        return {
            Component: LineChart,
            encodings: [{key: 'x', value: 'date'}, {key: 'y', value: 'hospitalCases'}],
            transformation: {type: 'sortX'},
            title: "Hospital cases"
        }
    }
    if(isVariantResponse(type)) {
        return {
            Component: DonutChart,
            encodings: [{key: 'color', value: 'variant'}, {key: 'y', value: 'newWeeklyPercentage'}, {key: 'x', value: 'variant'}],
            transformation: {type: 'stackY'},
            title: "Variants breakdown"
        }
    }

    throw new Error(`Unsupported chart ${type}`)

}


export const getChartTypeMapping = (data: Array<HospitalCasesResponse | VariantsResponse>) => {
    return data.map((response: HospitalCasesResponse | VariantsResponse) => {
        const chartProps = chartByType(response)
        return {
            data: response,
            ...chartProps
        }
    })
}