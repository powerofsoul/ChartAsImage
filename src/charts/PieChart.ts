import { Chart } from "./Chart";
import { pie } from "./customd3node/d3node-piechart";

export class PieChart extends Chart{
    constructor(){
        var customStyle = `
        .arc text {
            font: 20px sans-serif;
            fill:white;
            font-weight:bold;
            text-anchor: middle;
        }
        .arc path {
            stroke: #fff;
        }`;
        super(pie, customStyle);
    }
}