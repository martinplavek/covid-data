import {FC, useEffect, useRef} from "react";
import { createLineChart} from "@/factories/chartFactory";
import {Encoding, Transformation} from "@/types";
import {Chart} from "@antv/g2";


export const LineChart: FC<{
    data: any
    encodings: Encoding[],
    transformation?: Transformation
}> = ({data, encodings, transformation}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        let chart: Chart
        if(containerRef.current !== null && data) {
            chart = createLineChart({
                container: containerRef.current,
                data,
                encodings,
                transformation
            })
        }
        return () => {
            chart?.destroy()
        }
    }, [containerRef, data]);

    return (
        <div ref={containerRef} />
    )
}