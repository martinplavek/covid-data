import {FC, ReactNode, useEffect, useState} from "react";
import {Avatar, Card} from "antd";
import axios from "axios";
import {CommentOutlined, HeartOutlined, UserOutlined} from "@ant-design/icons";

const structureMetrics = {
    date: 'date',
    femaleDeaths28Days: 'femaleDeaths28Days',
    maleDeaths28Days: 'maleDeaths28Days',
    newCasesByPublishDate: 'newCasesByPublishDate',
    newDeathsByDeathDate: 'newDeathsByDeathDate',
    maleCases: 'maleCases',
    hospitalCases: 'hospitalCases',
    newCasesBySpecimenDateRollingSum: 'newCasesBySpecimenDateRollingSum',
    variants: 'variants'
}

export type StructureMetricsType = typeof structureMetrics;

const fetchData = async (structure: string, latestBy?: string) => {
    const url = 'https://api.coronavirus.data.gov.uk/v1/data'

    const data = await axios.get(url, {
        params: {
            filters: 'areaType=nation;areaName=england',
            structure: structure,
            latestBy: latestBy
        },
        method: 'get'
    })

    return data
}

type EncodingKey = 'x' | 'y' | 'color'
type Encoding = {
    key: EncodingKey,
    value: string
}

type Transformation = {
    type: string,
    reverse?: boolean,
    by?: string,
    orderBy?: string,
    order?: 'ASC' | 'DESC',
    ordinal?: boolean,
}

interface ChartCardProps {
    structure: Partial<StructureMetricsType>
    encodings: Encoding[]
    transformation?: Transformation,
    containerId: string
    title: string
    children: (data: any, encodings: Encoding[], transformation?: Transformation | undefined) => ReactNode;
}

export const ChartCard: FC<ChartCardProps> = ({structure, title, children, transformation, encodings}) => {
    const [data, setData] = useState<any>()

    useEffect(() => {
        async function fetch() {
            const response = await fetchData(JSON.stringify(structure))

            if(response.data) {
                setData(response.data.data)
            }
        }

        fetch()
    }, []);

    if(!data) {
        return 'No Data'
    }

    return (
        <Card title={title} actions={[
            <Avatar icon={<UserOutlined />} size='small' key={'setting'}/>,
            <HeartOutlined key={'favourite'}/>,
            <CommentOutlined key={'comment'}/>,
        ]} >
            {children(data, encodings, transformation)}
        </Card>
    )
}