import {FC, useEffect, useRef} from "react";
import {createDonutChart} from "@/factories/chartFactory";
import {Encoding, Transformation} from "@/types";
import {Chart} from "@antv/g2";

export const DonutChart: FC<{
    data: any
    encodings: Encoding[],
    transformation?: Transformation
}> = ({data, encodings, transformation}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        let chart: Chart
        if(containerRef.current !== null && data) {
            console.log(data[0].variants)
            chart = createDonutChart({
                container: containerRef.current,
                data: data[0].variants,
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