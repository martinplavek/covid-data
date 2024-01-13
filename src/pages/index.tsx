import {Col, Layout, Row, theme} from 'antd';
import {ChartCard, StructureMetricsType} from "@/components/ChartCard/ChartCard";

const {Header, Content} = Layout

const maleDeathsAfter28Days: Partial<StructureMetricsType> = {
    date: 'date',
    hospitalCases: 'hospitalCases',
}

const testCounts: Partial<StructureMetricsType> = {
    date: 'date',
    newCasesByPublishDate: 'newCasesByPublishDate',
}

export default function Home() {
  return (
    <Layout style={{height: "99vh"}}>
      <Header style={{backgroundColor: 'white'}}>
          App title
      </Header>
        <Content style={{ margin: '0 16px',  }}>
            <div style={{
                padding: 24,
                minHeight: 360,
            }}>
                <Row justify='space-around' style={{paddingBottom: "16px"}}>
                    <Col span={10}>
                        Page title
                    </Col>
                    <Col span={10}/>
                </Row>
            <Row justify='space-around'>
                <Col span={10} >
                    <ChartCard structure={maleDeathsAfter28Days} containerId="hospitalCasesContainer" encodings={[{key: 'x', value: 'date'}, {key: 'y', value: 'hospitalCases'}]} title="Hospital cases"/>
                </Col>
                <Col span={10}>
                    <ChartCard structure={testCounts} containerId='testCountsContainer' encodings={[{key: 'x', value: 'date'}, {key: 'y', value: 'newCasesByPublishDate'}]} title="Test counts"/>
                </Col>
            </Row>
            </div>
        </Content>
    </Layout>
  )
}
