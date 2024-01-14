import {FC, useEffect, useRef} from "react";
import {createDonutChart} from "@/factories/chartFactory";
import {Encoding, Transformation} from "@/types";
import {Chart} from "@antv/g2";
import {VariantsResponse} from "@/types";

type Props = {
    data: VariantsResponse
    encodings: Encoding[],
    transformation?: Transformation
}

export const DonutChart: FC<Props> = ({data, encodings, transformation}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        let chart: Chart
        console.log('data', data)
        if(containerRef.current !== null && data) {
            chart = createDonutChart({
                container: containerRef.current,
                data: data.data[0].variants,
                encodings,
                transformation
            })
        }

        return () => {
            chart?.destroy()
        }
    }, [containerRef, data, encodings, transformation]);

    return (
        <div ref={containerRef} />
    )
}