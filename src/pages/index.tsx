import {Badge, Button, Col, Flex, Layout, Row, Typography} from 'antd';
import {ChartCard} from "@/components/ChartCard/ChartCard";
import {CommentOutlined, DownloadOutlined, FilterOutlined} from "@ant-design/icons";
import {useApplicationInit} from "@/hooks/useApplicationInit";
import {getChartTypeMapping} from "@/hooks/useCharts";
import camelCase from 'lodash/camelCase'

const {Header, Content} = Layout
const { Title } = Typography

export default function Home() {

    const {data, isLoading} = useApplicationInit()
    const components = getChartTypeMapping(data)

    console.log(components)
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
                            <DownloadOutlined style={{color: 'green'}}/>
                        </Button>
                        <Button>
                            Notes (3)
                            <CommentOutlined style={{color: 'green'}} />
                        </Button>
                        <Button>
                            Filters&nbsp;<Badge size='small' count={9}/>
                            <FilterOutlined style={{color: 'green'}}/>
                        </Button>
                        </Flex>
                    </Col>
                </Row>
            <Row justify='space-around'>
                {components.map((item, index) => (
                        <Col span={10} key={`${item.title}-${index}`}>
                            <ChartCard title={item.title} containerId={camelCase(item.title)}>
                                <item.Component data={item.data} encodings={item.encodings} transformation={item.transformation} />
                            </ChartCard>
                        </Col>

                )   )}
            </Row>
            </div>
        </Content>
    </Layout>
  )
}
