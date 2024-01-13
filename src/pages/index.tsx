import {Badge, Button, Col, Flex, Layout, Row, Typography} from 'antd';
import {ChartCard, StructureMetricsType} from "@/components/ChartCard/ChartCard";
import {DonutChart} from "@/components/DonnutChart/DonutChart";
import {Encoding, Transformation} from "@/types";
import {LineChart} from "@/components/LineChart/LineChart";
import {CommentOutlined, DownloadOutlined, FilterOutlined} from "@ant-design/icons";

const {Header, Content} = Layout
const { Title } = Typography

const maleDeathsAfter28Days: Partial<StructureMetricsType> = {
    date: 'date',
    hospitalCases: 'hospitalCases',
}

const variants: Partial<StructureMetricsType> = {
    variants: 'variants'
}

export default function Home() {
  return (
    <Layout style={{height: "99vh"}}>
      <Header style={{backgroundColor: 'white'}}>
          <Title level={3}>
            App title
          </Title>
      </Header>
        <Content style={{ margin: '0 16px',  }}>
            <div style={{
                padding: 24,
                minHeight: 360,
            }}>
                <Row justify='space-around' style={{paddingBottom: "16px"}} align='middle'>
                    <Col span={10}>
                        <Title level={5}>
                            Page title
                        </Title>
                    </Col>
                    <Col span={10}>
                        <Flex justify='right' gap='small'>
                        <Button>
                            Export to PDF
                            <DownloadOutlined color='green'/>
                        </Button>
                        <Button>
                            Notes (3)
                            <CommentOutlined color='green' />
                        </Button>
                        <Button>
                            Filters&nbsp;<Badge size='small' count={9}/>
                            <FilterOutlined color='green'/>
                        </Button>
                        </Flex>
                    </Col>
                </Row>
            <Row justify='space-around'>
                <Col span={10} >
                    <ChartCard structure={maleDeathsAfter28Days} containerId={'hospitalCasesContainer'} title='Hospital cases' encodings={[{key: 'x', value: 'date'}, {key: 'y', value: 'hospitalCases'}]} transformation={{type: 'sortX'}}>
                        {(data: any, encodings: Encoding[], transformation?: Transformation) => (
                            <LineChart data={data} encodings={encodings} transformation={transformation}/>
                        )}
                    </ChartCard>
                </Col>
                <Col span={10}>
                    <ChartCard structure={variants}
                               containerId={'variants'}
                               title='Variants share'
                               encodings={[{key: 'color', value: 'variant'}, {key: 'y', value: 'newWeeklyPercentage'}, {key: 'x', value: 'variant'}]}
                               transformation={{ type: 'stackY' }}>
                        {(data: any, encodings: Encoding[], transformation?: Transformation) => (
                            <DonutChart data={data} encodings={encodings} transformation={transformation}/>
                        )}
                    </ChartCard>
                </Col>
            </Row>
            </div>
        </Content>
    </Layout>
  )
}
