import {Col, Row} from "antd";
import {ChartCard} from "@/components/ChartCard/ChartCard";
import camelCase from "lodash/camelCase";
import {ChartTypeMappingWithData} from "@/hooks/useCharts";
import {FC} from "react";

type Props = {
    components: ChartTypeMappingWithData[]
}

export const ChartsPageContent: FC<Props> = ({components}) => {


    return (
        <Row justify='space-around'>
            {components.map((item, index) => (
                <Col span={10} key={`${item.title}-${index}`}>
                    <ChartCard title={item.title} containerId={camelCase(item.title)}>
                        <item.Component data={item.data} encodings={item.encodings} transformation={item.transformation} />
                    </ChartCard>
                </Col>

            )   )}
        </Row>
    )
}