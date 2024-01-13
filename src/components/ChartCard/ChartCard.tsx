import {FC, useEffect, useRef, useState} from "react";
import {Avatar, Card} from "antd";
import * as G2 from '@antv/g2';
import axios from "axios";
import {CommentOutlined, HeartOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";

const structureMetrics = {
    date: 'date',
    femaleDeaths28Days: 'femaleDeaths28Days',
    maleDeaths28Days: 'maleDeaths28Days',
    newCasesByPublishDate: 'newCasesByPublishDate',
    newDeathsByDeathDate: 'newDeathsByDeathDate',
    maleCases: 'maleCases',
    hospitalCases: 'hospitalCases'
}

export type StructureMetricsType = typeof structureMetrics;

const fetchData = async (structure: string) => {
    const url = 'https://api.coronavirus.data.gov.uk/v1/data'

    const data = await axios.get(url, {
        params: {
            filters: 'areaType=nation;areaName=england',
            structure: structure,
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
    by: string,
    order: 'ASC' | 'DESC'
}

interface ChartCardProps {
    structure: Partial<StructureMetricsType>
    containerId: string
    encodings: Encoding[]
    title: string
    transformation?: Transformation
}

export const ChartCard: FC<ChartCardProps> = ({structure, containerId, encodings, transformation, title}) => {
    const containerRef = useRef(null)
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

    useEffect(() => {
        if(containerRef.current && data) {
            const chart = new G2.Chart({
                container: containerRef.current,
                height: 400,
                width: 450,
            })

            chart.interval()
            chart.data(data)
            encodings.forEach((encoding) => {
                chart.encode(encoding.key, encoding.value)
            })
            if(transformation){
                chart.transform(transformation)
            }
            chart.render()
        }
    }, [containerRef, data]);

    if(!data) {
        return 'No Data'
    }

    return (
        <Card title={title} actions={[
            <Avatar icon={<UserOutlined />} size='small' key={'setting'}/>,
            <HeartOutlined key={'favourite'}/>,
            <CommentOutlined key={'comment'}/>,
        ]}>
            <div ref={containerRef} id={containerId}/>
        </Card>
    )
}