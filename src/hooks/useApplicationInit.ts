import {fetchData} from "@/fetcher/dataFetcher";
import {hospitalCases, variants} from "@/fetcher/definitions";
import {AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import {HospitalCasesResponse, VariantsResponse} from "@/types";

const APP_TITLE = "Homework Martin Plavek"

export const useApplicationInit = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<(HospitalCasesResponse | VariantsResponse)[]>([])
    const [currentPage] = useState("Covid data visualization")

    useEffect(() => {
        async function fetch() {
            setIsLoading(true)
            const chartData = await Promise.all([
                fetchData<any, AxiosResponse<HospitalCasesResponse>>(hospitalCases),
                fetchData<any, AxiosResponse<VariantsResponse>>(variants)
            ])

            const newData = chartData.map(response => response.data)
            setData(newData)
            setIsLoading(false)
        }
        fetch()
    }, []);

    return {
        data,
        isLoading,
        appTitle: APP_TITLE,
        currentPage,
    }
}