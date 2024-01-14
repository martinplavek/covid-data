import {Badge, Button, Col, Flex, Row, Typography} from "antd";
import {FC, ReactNode} from "react";

const { Title } = Typography

type PageHeaderAction = {
    title: string;
    icon: ReactNode;
    callback: () => void;
    badgeValue?: number;
}

type Props = {
    pageTitle: string,
    actions?:PageHeaderAction []
}

export const PageHeader: FC<Props> = ({pageTitle, actions = []}) => {

    return (
        <Row justify='space-around' style={{paddingBottom: "16px"}} align='middle'>
            <Col span={10}>
                <Title level={5}>
                    {pageTitle}
                </Title>
            </Col>
            <Col span={10}>
                <Flex justify='right' gap='small'>
                    {actions.map(action => (
                        <Button onClick={action.callback} key={action.title}>
                            {action.title}
                            {action.badgeValue ? <Badge size='small' count={action.badgeValue}/> : null}
                            {action.icon}
                        </Button>
                    ))}
                </Flex>
            </Col>
        </Row>
    )
}