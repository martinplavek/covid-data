import {FC, ReactNode, useState} from "react";
import {Avatar, Card} from "antd";
import {CommentOutlined, HeartFilled, UserOutlined} from "@ant-design/icons";

interface ChartCardProps {
    containerId: string
    title: string
    children: ReactNode;
}

export const ChartCard: FC<ChartCardProps> = ({ title, children}) => {
    const [favourite, setFavourite] = useState(false)

    return (
        <Card title={title} actions={[
            <Avatar icon={<UserOutlined />} size='small' key={'setting'}/>,
            <HeartFilled key={'favourite'} onClick={() => setFavourite(!favourite)} style={{
                color: favourite ? '#FF0000' : undefined
            }}/>,
            <CommentOutlined key={'comment'}/>,
        ]} >
            {children}
        </Card>
    )
}