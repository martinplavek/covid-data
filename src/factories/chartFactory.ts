import {MutableRefObject, Ref} from "react";
import {Encoding, Transformation} from "@/types";
import * as G2 from '@antv/g2';
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {Chart} from "@antv/g2";

interface ChartFactoryInput {
    // type: 'line' | 'donut',
    container: HTMLElement,
    encodings: Encoding[],
    transformation?: Transformation,
    data: any,
}

const createEmptyChart = (container: HTMLElement) => {
    return new G2.Chart({
        container: container,
        autoFit: true,
    })
}

export const createDonutChart = (input: ChartFactoryInput) => {
    const {container, data, encodings, transformation} = input
    const chart: Chart = createEmptyChart(container)

    chart.data(data)
    chart.scale('newWeeklyPercentage')
    chart.coordinate({ type: 'theta', outerRadius: 1.5, innerRadius: 0.1 })
    chart.interval()

    encodings.forEach(encoding => chart.encode(encoding.key, encoding.value))
    transformation && chart.transform(transformation)

    chart.render()

    return chart
}

export const createLineChart = (input: ChartFactoryInput) => {
    const {container, data, encodings, transformation} = input
    const chart = createEmptyChart(container)

    chart.line().data(data)
    encodings.forEach((encoding) => {
        chart.encode(encoding.key, encoding.value)
    })
    if(transformation){
        chart.transform(transformation)
    }
    chart.render()

    return chart
}