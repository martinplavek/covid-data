import {FC, ReactNode, useEffect, useState} from "react";
import {Avatar, Card, Flex, Typography} from "antd";
import {CommentOutlined, HeartFilled, UserOutlined} from "@ant-design/icons";
import {fetchData} from "@/fetcher/dataFetcher";
import {AxiosResponse} from "axios";

const { Paragraph } = Typography
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
    const [favourite, setFavourite] = useState(false)
    useEffect(() => {
        async function fetch() {
            const response = await fetchData<any, AxiosResponse>(structure)

            if(response.data) {
                setData(response.data.data)
            }
        }

        fetch()
    }, []);

    if(!data) {
        return (
            <Card title={title}>
                <Flex align='center' justify='center'>
                    <Paragraph>No data</Paragraph>
                </Flex>
            </Card>
        )
    }

    return (
        <Card title={title} actions={[
            <Avatar icon={<UserOutlined />} size='small' key={'setting'}/>,
            <HeartFilled key={'favourite'} onClick={() => setFavourite(!favourite)} style={{
                color: favourite ? '#FF0000' : undefined
            }}/>,
            <CommentOutlined key={'comment'}/>,
        ]} >
            {children(data, encodings, transformation)}
        </Card>
    )
}