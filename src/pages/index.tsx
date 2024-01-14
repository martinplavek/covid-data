import {Layout, Typography} from 'antd';
import {useApplicationInit} from "@/hooks/useApplicationInit";
import {getChartTypeMapping} from "@/hooks/useCharts";
import {PageHeader} from "@/components/PageHeader/PageHeader";
import {ChartsPageContent} from "@/components/ChartsPageContent/ChartsPageContent";
import {Loader} from "@/components/Loader/Loader";
import {CommentOutlined, DownloadOutlined, FilterOutlined} from "@ant-design/icons";

const {Header, Content} = Layout
const { Title } = Typography

export default function Home() {

    const {data, isLoading, appTitle, currentPage} = useApplicationInit()
    const components = getChartTypeMapping(data)

  return (
    <Layout style={{height: "99vh"}}>
      <Header style={{backgroundColor: 'white'}}>
          <Title level={3}>
              {appTitle}
          </Title>
      </Header>
        <Content style={{ margin: '0 16px',  }}>
            <div style={{
                padding: 24,
                minHeight: 360,
            }}>
                <PageHeader pageTitle={currentPage} actions={[
                    {title: 'Export to PDF', icon: <DownloadOutlined style={{color: 'green'}}/>, callback: () => {}},
                    {title: 'Notes (3)', icon: <CommentOutlined style={{color: 'green'}}/>, callback: () => {}},
                    {title: 'Filters', icon: <FilterOutlined style={{color: 'green'}}/>, callback: () => {}, badgeValue: 9 },
                ]}/>
                {isLoading ? <Loader /> : <ChartsPageContent components={components} /> }
            </div>
        </Content>
    </Layout>
  )
}
