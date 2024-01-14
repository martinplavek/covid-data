import {Flex, Spin} from "antd";


export const Loader = () => {

    return (
        <Flex align='center' justify='center' style={{height: "400px"}}>
            <Spin />
        </Flex>
    )
}