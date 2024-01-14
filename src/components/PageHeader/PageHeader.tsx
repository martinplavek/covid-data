import {Badge, Button, Col, Flex, Row, Typography} from "antd";
import {CommentOutlined, DownloadOutlined, FilterOutlined} from "@ant-design/icons";
import {FC} from "react";

const { Title } = Typography

type Props = {
    pageTitle: string,
}

export const PageHeader: FC<Props> = ({pageTitle}) => {

    return (
        <Row justify='space-around' style={{paddingBottom: "16px"}} align='middle'>
            <Col span={10}>
                <Title level={5}>
                    {pageTitle}
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
    )
}